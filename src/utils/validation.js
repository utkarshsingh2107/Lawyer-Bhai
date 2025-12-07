/**
 * Form Validation Utilities
 * Provides comprehensive validation for all forms
 */

export const validateEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  // Indian phone number: 10 digits
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

export const validateRequired = (value) => {
  return value && String(value).trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && String(value).length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && String(value).length <= maxLength;
};

export const validatePassword = (password) => {
  if (!password) return { valid: false, message: 'Password is required' };
  
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  
  return { valid: true, message: '' };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { valid: false, message: 'Passwords do not match' };
  }
  return { valid: true, message: '' };
};

export const validateBookingForm = (formData) => {
  const errors = {};

  // Name validation
  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
  } else if (!validateMinLength(formData.name, 2)) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLoginForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(formData.password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignupForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.message;
  }

  if (formData.confirmPassword) {
    const matchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (!matchValidation.valid) {
      errors.confirmPassword = matchValidation.message;
    }
  } else {
    errors.confirmPassword = 'Please confirm your password';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAIQuery = (query) => {
  if (!query || !validateRequired(query)) {
    return { valid: false, message: 'Please describe your legal issue' };
  }

  if (!validateMinLength(query, 10)) {
    return { valid: false, message: 'Please provide more details (at least 10 characters)' };
  }

  if (!validateMaxLength(query, 1000)) {
    return { valid: false, message: 'Query is too long (maximum 1000 characters)' };
  }

  return { valid: true, message: '' };
};

export default {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePassword,
  validatePasswordMatch,
  validateBookingForm,
  validateLoginForm,
  validateSignupForm,
  validateAIQuery
};
