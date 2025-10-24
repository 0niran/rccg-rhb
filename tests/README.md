# Test Scripts

This directory contains test scripts for the RCCG-RHB website.

## Available Tests

### Security Tests
- **test-security.js**: Comprehensive security testing including form validation, rate limiting, and attack simulation
  ```bash
  node tests/test-security.js
  ```

### reCAPTCHA Tests
- **test-recaptcha-v3.js**: Tests the invisible reCAPTCHA v3 integration
  ```bash
  node tests/test-recaptcha-v3.js
  ```

## Prerequisites

- Development server must be running: `npm run dev`
- Server should be accessible at `http://localhost:4000`

## Notes

- All tests use mock data and test tokens
- Tests are designed to run against the development environment
- Production keys should be configured for production testing