// paymentController.js
const xmlrpc = require('xmlrpc');

// RPC Server configuration
const SERVER_URL = 'http://localhost:8000/RPC2';

// Create XML-RPC client
function createClient() {
  return xmlrpc.createClient({ url: SERVER_URL });
}

// Utility to print results
function printResult(testName, result) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TEST: ${testName}`);
  console.log(`${'='.repeat(60)}`);

  if (result.success) {
    console.log('✅ SUCCESS');
    if (result.payment_intent_id) {
      console.log(`Payment Intent ID: ${result.payment_intent_id}`);
      console.log(`Amount: $${result.amount}`);
      console.log(`Client Secret: ${result.client_secret}`);
    } else if (result.transaction_id) {
      console.log(`Transaction ID: ${result.transaction_id}`);
      console.log(`Message: ${result.message}`);
    } else if (result.refund_id) {
      console.log(`Refund ID: ${result.refund_id}`);
      console.log(`Message: ${result.message}`);
    } else if (result.withdrawal_id) {
      console.log(`Withdrawal ID: ${result.withdrawal_id}`);
      console.log(`Message: ${result.message}`);
    } else if (result.payments) {
      console.log(`Total Payments: ${result.pagination?.total || 0}`);
      console.log(`Page: ${result.pagination?.page || 0}/${result.pagination?.pages || 0}`);
      if (result.payments.length) {
        console.log(`First payment status: ${result.payments[0].status}`);
        console.log(`First payment amount: $${result.payments[0].amount}`);
      }
    }
    if (result.message && !result.transaction_id) console.log(`Message: ${result.message}`);
  } else {
    console.log('❌ FAILED');
    console.log(`Error: ${result.error || 'Unknown error'}`);
  }
  console.log(`${'='.repeat(60)}`);
}

// Helper to call XML-RPC method
function callMethod(client, method, params = []) {
  return new Promise((resolve, reject) => {
    client.methodCall(method, params, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
}

// --------------------- Payment Functions ---------------------

async function createPaymentIntent(orderId, clientId, paymentMethod = 'credit_card') {
  const client = createClient();
  const result = await callMethod(client, 'create_payment_intent', [orderId, clientId, paymentMethod]);
  printResult('Create Payment Intent', result);
  return result.success ? result.payment_intent_id : null;
}

async function processPayment(orderId, clientId) {
  const client = createClient();
  const paymentData = {
    payment_method: 'credit_card',
    card_last4: '4242',
    card_brand: 'visa',
    ip_address: '127.0.0.1',
    user_agent: 'test-client/1.0'
  };
  const result = await callMethod(client, 'process_payment', [orderId, clientId, paymentData]);
  printResult('Process Payment', result);
  return result.success ? result.transaction_id : null;
}

async function getPaymentHistory(clientId) {
  const client = createClient();
  const result = await callMethod(client, 'get_payment_history', [clientId]);
  printResult('Get Payment History', result);
  return result;
}

async function requestRefund(orderId, clientId, reason) {
  const client = createClient();
  const result = await callMethod(client, 'request_refund', [orderId, clientId, reason]);
  printResult('Request Refund', result);
  return result.success ? result.refund_id : null;
}

async function getEarnings(freelancerId) {
  const client = createClient();
  const result = await callMethod(client, 'get_earnings', [freelancerId]);
  printResult('Get Earnings', result);
  return result;
}

async function requestWithdrawal(freelancerId, withdrawalData) {
  const client = createClient();
  const result = await callMethod(client, 'request_withdrawal', [freelancerId, withdrawalData]);
  printResult('Request Withdrawal', result);
  return result.success ? result.withdrawal_id : null;
}

// Export functions for tests
module.exports = {
  createPaymentIntent,
  processPayment,
  getPaymentHistory,
  requestRefund,
  getEarnings,
  requestWithdrawal
};
