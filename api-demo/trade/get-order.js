const request = require('request');
const util = require("../util/util.js");

function getOrder() {
    // set the parameters of the query order interface
    let data = {
        "orderId": "10001",
        // "newClientOrderId":"",
        "symbol": "LTCUSDT",
    };

    // get the requestString
    let queryString = util.makeQueryString(data);

    let timestamp = new Date().getTime();

    let method = "GET";

    // set the domain url for calling OpenApi
    let url = "https://openapi.xxx.com/sapi/v1/order" + "?" + queryString;

    let requestPath = "/sapi/v1/order";

    // set the user's apiKey/apiSecret
    let apiKey = "";
    let apiSecret = "";

    // calculate the signature
    let sign = util.getSign(timestamp, method, requestPath, queryString, "", apiSecret);

    let options = {
        method: method,
        url: url,
        headers: {
            'X-CH-TS': timestamp,
            'X-CH-APIKEY': apiKey,
            'X-CH-SIGN': sign,
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log("getOrder result: %o", response.body);
    });
}

getOrder();
