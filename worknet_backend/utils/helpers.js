// Utility functions
exports.generateOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const count = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${year}-${count}`;
};

exports.calculatePlatformFee = (amount) => {
  const feePercentage = process.env.PLATFORM_FEE_PERCENTAGE || 20;
  return (amount * feePercentage) / 100;
};

exports.formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

exports.slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};