module.exports = {
  ID: "BTCUSD",
  oracleID: 1,
  URL:
    "https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD",
  contentType: "application/json",
  bodyParser: "json",
  priceSelector: body => Math.trunc(body["BTC"]["USD"] * 100)
}