const request = require('request');
const util = require("../util/util.js");

function ticker() {
    // set the parameters of the query market interface
    let data = {
        "symbol": "LTCUSDT"
    };

    // get the requestString
    let queryString = util.makeQueryString(data);

    let method = "GET";

    // set the domain url for calling OpenApi
    let url = "https://openapi.exchange1.com/sapi/v1/ticker" + "?" + queryString;

    let options = {
        method: method,
        url: url
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log("ticker result: %o", response.body);
    });
}

ticker();
