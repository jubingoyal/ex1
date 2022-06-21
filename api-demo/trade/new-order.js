const request = require('request');
const util = require("../util/util.js");

function newOrder() {
    // set the parameters of the create order interface
    let data = {
        "symbol": "LTCUSDT",
        "volume": "10",
        "side": "BUY",
        "type": "LIMIT",
        "price": "60",
        // "newClientOrderId":"",
        // "recvWindow":""
    };

    let timestamp = new Date().getTime();

    let method = "POST";

    // set the domain url for calling OpenApi
    let url = "https://openapi.xxx.com/sapi/v1/order";

    let requestPath = "/sapi/v1/order";

    // set the user's apiKey/apiSecret
    let apiKey = "";
    let apiSecret = "";

    // calculate the signature
    let sign = util.getSign(timestamp, method, requestPath, "", data, apiSecret);

    let dataJsonStr = JSON.stringify(data);

    let options = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'X-CH-TS': timestamp,
            'X-CH-APIKEY': apiKey,
            'X-CH-SIGN': sign,
        },
        body: dataJsonStr
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log("newOrder result: %o", response.body);
    });
}

newOrder();