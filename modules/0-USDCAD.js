module.exports = {
  ID: 'USDCAD',
  oracleID: 0,
  URL: 'http://api.fxhistoricaldata.com/indicators?timeframe=5min&expression=close&item_count=1&instruments=USDCAD',
  contentType: 'application/json',
  bodyParser: 'json',
  priceSelector: body => Math.trunc(body.results['USDCAD'].data[0][1] * 10000)
}