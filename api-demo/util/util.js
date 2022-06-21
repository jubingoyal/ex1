const crypto = require("crypto");

/**
 * Calculate OpenApi signature
 * @param timestamp millisecond timestamp
 * @param method request method type, POST/GET
 * @param requestPath request path
 * @param queryString request parameter string for GET
 * @param body request body for GET
 * @param secret user's secret for openApi
 * @returns {string}
 */
function getSign(timestamp, method, requestPath, queryString, body, secret) {
    let hash = preHash(timestamp, method, requestPath, queryString, body);
    console.log(hash)
    let signature = crypto.createHmac('sha256', secret).update(hash).digest('hex');
    console.log(signature)
    return signature;
}

/**
 * Get the string to be signed
 * @param timestamp millisecond timestamp
 * @param method request method type, POST/GET
 * @param requestPath request path
 * @param queryString request parameter string for GET
 * @param body request body for GET
 * @returns {string}
 */
function preHash(timestamp, method, requestPath, queryString, body) {
    let arr = []
    arr.push(timestamp)
    arr.push(method.toUpperCase())
    arr.push(requestPath)
    if(queryString !== "") {
        arr.push("?")
        arr.push(queryString)
    }
    if(body !== "") {
        arr.push(body)
    }
    return arr.join("")
}

/**
 * Get the get request parameter string
 * @param q request parameter，json object
 * @returns {string} symbol=ltcusdt&orderId=10001
 */
function makeQueryString(q) {
    return Object.keys(q)
        .reduce((a, k) => {
            if (Array.isArray(q[k])) {
                q[k].forEach(v => {
                    a.push(k + "=" + encodeURIComponent(v))
                })
            } else if (q[k] !== undefined) {
                a.push(k + "=" + encodeURIComponent(q[k]));
            }
            return a;
        }, [])
        .join("&");
}

module.exports = {
    getSign,
    makeQueryString
}
