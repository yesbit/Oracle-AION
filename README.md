# basic-oracle

Oracle contract that contains assets hourly prices + Nodejs service 

### Install & Run

- `git clone git@github.com:yesbit/Oracle-Feed.git`
- `cd Oracle-Feed`
- `npm install`
- `touch .env`
- A private key is required to sign contract function calls. So add one to `.env` file as follows:
```
SIGNER_PRIVATE_KEY=0x1235432.....
```
- NodeJS service is scheduled, internally, using crontab-like configuration. In order to run the NodeJS service on the first minute of each hour, you need to add the following line to `.env` file:
```
SCHEDULE="* * * * *"
```
- `npm start`.
- If everything is OK, server will show some logs as follows:
```

> oracle-nodejs@0.0.1 start projects/Oracle-Feed
> nodemon index.js

[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
{ ID: 'USDCAD',
  oracleID: 0,
  URL:
   'http://api.fxhistoricaldata.com/indicators?timeframe=5min&expression=close&item_count=1&instruments=USDCAD',
  contentType: 'application/json',
  bodyParser: 'json',
  priceSelector: [Function: priceSelector] }
getTransactionCount: 659
Result:  {"nonce":659,"gasPrice":{"_bn":"b2d05e00"},"gasLimit":{"_bn":"16e360"},"to":"0x323919c6dF517765070f4b75Bb886B5Edb927bF4","value":{"_bn":"0"},"data":"0xaa585d56000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000003293","v":41,"r":"0xb8852ac8435ecb5cb4eedc63b93916723dc99ddc6f631aec1ac207084b0fde1b","s":"0x4ccfe81f2d6516545a7379e4454cbab619d0643b11b4f2ed4ede79ceddd53efc","chainId":3,"from":"0xCe2D136840407e9A7405df31C6ceD4c4f8C2C962","hash":"0x5a4c75e7d2bcf0269ce43b43c6b2fe9d04fd62138081b574c2254e1b8c333251"}
```
