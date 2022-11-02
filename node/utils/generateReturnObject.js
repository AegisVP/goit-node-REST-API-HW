const success = data => ({ status: 'success', data });
const failure = data => ({ status: 'error', data });
const message = msg => ({ message: msg });

module.exports = { success, failure, message };
