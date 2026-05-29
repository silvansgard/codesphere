const express = require('express');
const { sanitizePhoneNumber } = require('../utils/phoneFormatter');
const { initiateStkRequest } = require('../services/paymentGatewayService');

const router = express.Router();

router.post('/payments/stk', async (request, response) => {
  const { numbers, amount } = request.body;

  if (!numbers || !amount) {
    return response.status(400).json({
      success: false,
      message: 'Phone numbers and amount are required.',
    });
  }

  const normalizedNumbers = numbers
    .split('\n')
    .map((entry) => sanitizePhoneNumber(entry.trim()))
    .filter(Boolean);

  const transactionResults = [];

  for (const phoneNumber of normalizedNumbers) {
    try {
      const transactionResponse = await initiateStkRequest({
        phoneNumber,
        paymentAmount: amount,
        apiSecret: process.env.API_KEY,
      });

      transactionResults.push({
        phoneNumber,
        status: 'Success',
        data: transactionResponse,
      });
    } catch (serviceError) {
      transactionResults.push({
        phoneNumber,
        status: 'Failed',
        error: serviceError.response?.data || serviceError.message,
      });
    }
  }

  return response.json({
    success: true,
    processed: transactionResults.length,
    transactionResults,
  });
});

module.exports = router;
