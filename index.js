// Necessary 3rd party libraries
const fetch = require('node-fetch');
const ethers = require('ethers'),
  utils = ethers.utils;
const schedule = require('node-schedule');

// Configuration variables
require("dotenv").config();
const fetchSchedule = process.env.SCHEDULE || "5 * * * *";
const network = process.env.NETWORK || ethers.providers.networks.ropsten;
const privateKey = process.env.SIGNER_PRIVATE_KEY;
if (!privateKey) {
  console.error(
    "A private key is required to sign contract function calls. Ensure adding your private key to .env file."
  );
  process.exit(1);
}

const contractDetails = require("./contract/details");
const provider = new ethers.providers.InfuraProvider(network);

const normalizedPath = require("path").join(__dirname, "modules");
const modules = require("fs")
  .readdirSync(normalizedPath)
  .filter(file => file.match(/\.js$/) !== null)
  .map(file => require("./modules/" + file));

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(
  contractDetails.address,
  contractDetails.abi,
  wallet
);

function processFeed(feed) {
  // TODO Return promise
  return fetch(feed.URL).then(res => {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes(feed.contentType)) {
        return res[feed.bodyParser]();
      }
      throw new 
        TypeError(`${feed.ID}: Expected content-type ${feed.contentType} but received ${contentType.join(', ')}.`);
    })
    .then(body => {
      return new Promise((resolve, reject) => {
        const data = feed.priceSelector(body);
        if (data) {
          resolve(data)
        }
        else {
          reject(`${feed.ID}: Unable to select price.`)
        }
      })
    });
}

function run(modules, contract) {
  if(modules.length) {
    const module = modules.shift()
    console.log(module)
    processFeed(module).then((price, err) => {
      // TODO
      if (err)
        console.error(err)

      const feedID = module.oracleID;
      const timeslot = new Date().getUTCHours();
      const options = { gasPrice: utils.bigNumberify("3000000000")};
      provider
        .getTransactionCount(wallet.address)
        .then(count => {
          console.log(`getTransactionCount: ${count}`)
          return contract.setPrice(feedID, timeslot, price, options)
        }).then(
          result => {
            console.log("Result:  " + JSON.stringify(result))
            run(modules, contract)
          },
          err => console.error("Error msg: " + err)
        )
        // TODO
        .catch(error => console.error)
    })
  }
}

run(modules, contract);
const j = schedule.scheduleJob(fetchSchedule, function() {
  run(modules, contract);
});
