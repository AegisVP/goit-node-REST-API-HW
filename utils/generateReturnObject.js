const generateSuccessData = data => ({ status: 'success', data });
const generateFailureData = data => ({ status: 'error', data });
const message = data => ({ message: data });

module.exports = { generateSuccessData, generateFailureData, message };
