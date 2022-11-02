const generateSuccessData = data => ({ status: 'success', data });
const generateFailureData = data => ({ status: 'error', data });

module.exports = { generateSuccessData, generateFailureData };
