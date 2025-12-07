/**
 * Rate Limiting Utility
 * Prevents abuse by limiting the number of requests per time window
 */

const RATE_LIMIT = 5; // Maximum requests
const WINDOW = 60000; // Time window in milliseconds (1 minute)

export class RateLimiter {
  constructor(limit = RATE_LIMIT, window = WINDOW) {
    this.limit = limit;
    this.window = window;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.window);
    
    // Check if limit is reached
    if (this.requests.length >= this.limit) {
      return false;
    }
    
    // Add current request
    this.requests.push(now);
    return true;
  }

  getTimeUntilNextRequest() {
    if (this.requests.length < this.limit) {
      return 0;
    }
    
    const oldestRequest = this.requests[0];
    const timeElapsed = Date.now() - oldestRequest;
    const timeRemaining = this.window - timeElapsed;
    
    return Math.max(0, timeRemaining);
  }

  getRemainingRequests() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.window);
    return Math.max(0, this.limit - this.requests.length);
  }

  reset() {
    this.requests = [];
  }

  getStatus() {
    const remaining = this.getRemainingRequests();
    const timeUntilReset = this.getTimeUntilNextRequest();
    
    return {
      remaining,
      limit: this.limit,
      timeUntilReset,
      canMakeRequest: remaining > 0
    };
  }
}

// Create a singleton instance for AI queries
export const aiRateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

// Simple rate limit check function
const rateLimiters = {};

export const checkRateLimit = (key, limit = 5, window = 60000) => {
  if (!rateLimiters[key]) {
    rateLimiters[key] = new RateLimiter(limit, window);
  }
  
  const limiter = rateLimiters[key];
  const canProceed = limiter.canMakeRequest();
  
  return {
    allowed: canProceed,
    remaining: limiter.getRemainingRequests(),
    retryAfter: limiter.getTimeUntilNextRequest()
  };
};

// Format time remaining for display
export const formatTimeRemaining = (milliseconds) => {
  const seconds = Math.ceil(milliseconds / 1000);
  
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

export default RateLimiter;
