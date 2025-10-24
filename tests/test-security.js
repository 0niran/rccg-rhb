#!/usr/bin/env node

/**
 * Security Testing Script for Contact Form
 * Tests the implemented security measures against malicious inputs
 */

const SERVER_URL = 'http://localhost:4000/api/contact';

const testCases = [
  {
    name: 'Random Garbage Names (should be blocked)',
    data: {
      firstName: 'wBKZgvCDPyfBQchJzwF',
      lastName: 'XMwaTuxrewZawTomhCleF',
      email: 'test@example.com',
      subject: 'I have questions about faith',
      message: 'ZdoHJNuEORAIkjOsF'
    },
    shouldFail: true
  },
  {
    name: 'HTML Injection Attempt (should be sanitized)',
    data: {
      firstName: 'John<script>alert("xss")</script>',
      lastName: 'Doe',
      email: 'test@example.com',
      subject: 'I have questions about faith',
      message: 'Hello <script>alert("test")</script> world'
    },
    shouldFail: true
  },
  {
    name: 'Honeypot Trigger (should be silently rejected)',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      subject: 'I have questions about faith',
      message: 'This is a normal message',
      website: 'http://spam.com'
    },
    shouldFail: false, // Returns success but doesn't send email
    isHoneypot: true
  },
  {
    name: 'Excessive Characters (should be blocked)',
    data: {
      firstName: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      lastName: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBB',
      email: 'test@example.com',
      subject: 'I have questions about faith',
      message: 'This is a test message'
    },
    shouldFail: true
  },
  {
    name: 'Invalid Phone Format (should be blocked)',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      phone: 'abcd1234efgh',
      subject: 'I have questions about faith',
      message: 'This is a test message'
    },
    shouldFail: true
  },
  {
    name: 'Valid Submission (should pass)',
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      phone: '555-123-4567',
      subject: 'I have questions about faith',
      message: 'This is a legitimate message from a real person.'
    },
    shouldFail: false
  }
];

async function testContactForm(testCase) {
  console.log(`\n🧪 Testing: ${testCase.name}`);

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCase.data)
    });

    const result = await response.json();

    console.log(`   Status: ${response.status}`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Message: ${result.message}`);

    if (testCase.shouldFail && result.success) {
      console.log(`   ❌ SECURITY ISSUE: Expected this to fail but it passed!`);
      return false;
    } else if (!testCase.shouldFail && !result.success) {
      console.log(`   ❌ UNEXPECTED: Expected this to pass but it failed!`);
      return false;
    } else if (testCase.isHoneypot && result.success) {
      console.log(`   ✅ HONEYPOT: Correctly returned success without sending email`);
      return true;
    } else if (testCase.shouldFail && !result.success) {
      console.log(`   ✅ SECURITY: Correctly blocked malicious input`);
      return true;
    } else {
      console.log(`   ✅ VALID: Legitimate submission processed correctly`);
      return true;
    }

  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    return false;
  }
}

async function runSecurityTests() {
  console.log('🔒 Contact Form Security Test Suite');
  console.log('=====================================');

  let passed = 0;
  let total = testCases.length;

  for (const testCase of testCases) {
    const result = await testContactForm(testCase);
    if (result) passed++;

    // Add delay to respect rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n📊 Test Results:');
  console.log(`   Passed: ${passed}/${total}`);
  console.log(`   Success Rate: ${((passed/total) * 100).toFixed(1)}%`);

  if (passed === total) {
    console.log('\n🎉 All security tests passed! Your form is well protected.');
  } else {
    console.log('\n⚠️  Some tests failed. Review the security implementation.');
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:4000');
    return response.ok;
  } catch {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();

  if (!serverRunning) {
    console.log('❌ Server not running at http://localhost:4000');
    console.log('Please run: npm run dev');
    process.exit(1);
  }

  await runSecurityTests();
}

if (require.main === module) {
  main().catch(console.error);
}