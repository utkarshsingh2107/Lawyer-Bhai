/**
 * Input Sanitization Utilities
 * Protects against XSS attacks by sanitizing user inputs
 */

// Simple sanitization without external library (for immediate use)
// For production, consider using DOMPurify: npm install dompurify

export const sanitizeInput = (input) => {
  if (!input) return '';
  
  // Remove HTML tags and dangerous characters
  return String(input)
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  // Basic HTML sanitization
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const sanitizeEmail = (email) => {
  if (!email) return '';
  
  // Basic email sanitization
  return String(email)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._-]/g, '');
};

export const sanitizePhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  return String(phone).replace(/\D/g, '');
};

export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

// Escape special characters for safe display
export const escapeHTML = (str) => {
  if (!str) return '';
  
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

export default {
  sanitizeInput,
  sanitizeHTML,
  sanitizeEmail,
  sanitizePhone,
  sanitizeFormData,
  escapeHTML
};
