const sanitizePhoneNumber = (rawPhone) => {
  const cleanedPhone = rawPhone.replace(/\D/g, '');

  if (cleanedPhone.startsWith('0')) {
    return `254${cleanedPhone.slice(1)}`;
  }

  if (!cleanedPhone.startsWith('254')) {
    return `254${cleanedPhone}`;
  }

  return cleanedPhone;
};

module.exports = { sanitizePhoneNumber };
