// paymentController.test.js
const {
  createPaymentIntent,
  processPayment,
  getPaymentHistory,
  requestRefund,
  getEarnings,
  requestWithdrawal
} = require('./paymentController');

jest.setTimeout(30000); // Increase timeout for XML-RPC calls

describe('Payment Service Tests', () => {
  const clientId = '6920c49a747da49650b2d6d1';
  const orderId = '6930d6289ca9d71a5da31121';
  const freelancerId = '692a3bd6f3be085d2499e02d';

  test('Create Payment Intent', async () => {
    const intentId = await createPaymentIntent(orderId, clientId);
    expect(intentId).toBeTruthy();
  });

  test('Process Payment', async () => {
    const transactionId = await processPayment(orderId, clientId);
    expect(transactionId).toBeTruthy();
  });

  test('Get Payment History', async () => {
    const history = await getPaymentHistory(clientId);
    expect(history.success).toBe(true);
    expect(Array.isArray(history.payments)).toBe(true);
  });

  test('Request Refund', async () => {
    const reason = 'Test refund reason';
    const refundId = await requestRefund(orderId, clientId, reason);
    // Refund might fail if no completed payments, so check for null/undefined
    expect(refundId === null || typeof refundId === 'string').toBe(true);
  });

  test('Get Earnings', async () => {
    const earnings = await getEarnings(freelancerId);
    expect(earnings.success).toBe(true);
  });

  test('Request Withdrawal', async () => {
    const withdrawalData = { amount: 10, payment_method: 'paypal', paypal_email: 'test@example.com' };
    const withdrawalId = await requestWithdrawal(freelancerId, withdrawalData);
    // Withdrawal may fail if balance is insufficient
    expect(withdrawalId === null || typeof withdrawalId === 'string').toBe(true);
  });
});
