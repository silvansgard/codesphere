const axios = require('axios');

const initiateStkRequest = async ({ phoneNumber, paymentAmount, apiSecret }) => {
  const endpointUrl = 'https://smartcodedesigners.co.ke/api/v1/';

  const payload = {
    phone: phoneNumber,
    amount: paymentAmount,
  };

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Api-secret': apiSecret,
    },
  };

  const apiResponse = await axios.post(endpointUrl, payload, requestConfig);
  return apiResponse.data;
};

module.exports = { initiateStkRequest };
