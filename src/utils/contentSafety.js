/**
 * Content Safety Utilities
 * Ensures AI queries and responses are safe and appropriate
 */

// Keywords that indicate potentially unsafe or out-of-scope queries
const UNSAFE_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'self-harm', 'hurt myself',
  'bomb', 'weapon', 'explosive', 'terrorism',
  'illegal drugs', 'how to make', 'how to steal',
  'hack', 'crack password', 'bypass security'
];

// Keywords that indicate non-legal queries
const NON_LEGAL_KEYWORDS = [
  'recipe', 'cooking', 'weather', 'sports', 'movie', 'game',
  'music', 'song', 'celebrity', 'fashion', 'travel'
];

// Legal-related keywords (positive indicators)
const LEGAL_KEYWORDS = [
  'law', 'legal', 'court', 'advocate', 'lawyer', 'case', 'suit',
  'divorce', 'property', 'criminal', 'civil', 'contract', 'agreement',
  'rights', 'dispute', 'complaint', 'fir', 'police', 'judge',
  'bail', 'custody', 'alimony', 'tenant', 'landlord', 'employment',
  'compensation', 'damages', 'notice', 'petition', 'appeal'
];

export const isSafeQuery = (query) => {
  if (!query) return false;
  
  const lowerQuery = query.toLowerCase();
  
  // Check for unsafe content
  const hasUnsafeContent = UNSAFE_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  
  if (hasUnsafeContent) {
    return false;
  }
  
  return true;
};

export const isLegalQuery = (query) => {
  if (!query) return false;
  
  const lowerQuery = query.toLowerCase();
  
  // Check if it's clearly non-legal
  const isNonLegal = NON_LEGAL_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  
  if (isNonLegal) {
    return false;
  }
  
  // Check if it contains legal keywords
  const hasLegalKeywords = LEGAL_KEYWORDS.some(keyword => 
    lowerQuery.includes(keyword)
  );
  
  // If query is short and has no legal keywords, it might not be legal
  if (query.length < 20 && !hasLegalKeywords) {
    return false;
  }
  
  return true;
};

export const getSafetyMessage = (query) => {
  if (!isSafeQuery(query)) {
    return {
      type: 'unsafe',
      message: 'I cannot provide assistance with this type of query. If you are in crisis, please contact emergency services or a mental health professional immediately.',
      helpline: '📞 National Helpline: 1800-599-0019 (India)'
    };
  }
  
  if (!isLegalQuery(query)) {
    return {
      type: 'non-legal',
      message: 'This appears to be a non-legal query. I am designed to help with legal matters only. Please describe your legal issue or concern.',
      suggestion: 'Try asking about: divorce, property disputes, criminal cases, contracts, employment issues, etc.'
    };
  }
  
  return {
    type: 'safe',
    message: null
  };
};

export const addSafetyDisclaimer = (response) => {
  return {
    ...response,
    disclaimer: '⚠️ This is AI-generated information for educational purposes only. It is NOT legal advice. Always consult a licensed advocate for your specific situation.',
    warning: 'Do not make legal decisions based solely on this information.'
  };
};

export const sanitizeAIResponse = (response) => {
  // Ensure response doesn't contain harmful content
  if (!response) return response;
  
  // Add safety disclaimer
  const safeResponse = addSafetyDisclaimer(response);
  
  // Ensure language is not overly confident
  if (safeResponse.legalAdvice) {
    // Add uncertainty language if not present
    const advice = safeResponse.legalAdvice;
    if (!advice.includes('may') && !advice.includes('might') && !advice.includes('typically')) {
      safeResponse.legalAdvice = 'Generally, ' + advice;
    }
  }
  
  return safeResponse;
};

export const validateQueryLength = (query) => {
  if (!query) return { valid: false, message: 'Query cannot be empty' };
  
  if (query.length < 10) {
    return { valid: false, message: 'Please provide more details (at least 10 characters)' };
  }
  
  if (query.length > 1000) {
    return { valid: false, message: 'Query is too long (maximum 1000 characters)' };
  }
  
  return { valid: true, message: '' };
};

// Main content safety check function
export const checkContentSafety = (query) => {
  // Check query length
  const lengthCheck = validateQueryLength(query);
  if (!lengthCheck.valid) {
    return {
      safe: false,
      reason: lengthCheck.message
    };
  }
  
  // Check if query is safe
  if (!isSafeQuery(query)) {
    return {
      safe: false,
      reason: 'This query contains inappropriate content. Please rephrase your question.'
    };
  }
  
  // Check if query is legal-related
  if (!isLegalQuery(query)) {
    return {
      safe: false,
      reason: 'Please ask a legal-related question. I can help with divorce, property, criminal cases, contracts, etc.'
    };
  }
  
  return {
    safe: true,
    reason: null
  };
};

export default {
  isSafeQuery,
  isLegalQuery,
  getSafetyMessage,
  addSafetyDisclaimer,
  sanitizeAIResponse,
  validateQueryLength,
  checkContentSafety
};
