const log = (msg = null) => console.log(msg || "--------------------");
const warn = (msg = null) => msg && console.warn(msg);
const err = (msg = null) => msg && console.error(msg);

module.exports = { log, warn, err };
