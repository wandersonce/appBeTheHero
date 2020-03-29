const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX'); //creating 4bytes id in a hexdecimal
}