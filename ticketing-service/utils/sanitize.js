let string = require("string-sanitizer");

const sanitize = (text) => string.sanitize(text);

module.exports = { sanitize };
