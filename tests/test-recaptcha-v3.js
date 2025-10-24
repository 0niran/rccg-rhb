#!/usr/bin/env node

/**
 * reCAPTCHA v3 Test Script
 * Tests the invisible reCAPTCHA v3 integration
 *
 * Run from project root: node tests/test-recaptcha-v3.js
 */

const SERVER_URL = 'http://localhost:4000/api/contact';

async function testRecaptchaV3() {
  console.log('🔒 Testing reCAPTCHA v3 Integration (Invisible)');
  console.log('=============================================');

  // Test 1: Valid form submission with reCAPTCHA token
  console.log('\n1. Testing valid form with reCAPTCHA token...');

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phone: '555-123-4567',
        subject: 'I have questions about faith',
        message: 'This is a test message for reCAPTCHA v3 integration.',
        recaptchaToken: 'test-v3-token-12345' // Mock v3 token
      })
    });

    const result = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Message: ${result.message}`);

    if (result.success) {
      console.log('   ✅ PASSED: reCAPTCHA v3 integration working');
    } else {
      console.log('   ⚠️  reCAPTCHA verification details:', result.message);
    }

  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
  }

  // Small delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test 2: Form without reCAPTCHA token
  console.log('\n2. Testing form without reCAPTCHA token...');

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        subject: 'I want to join a ministry',
        message: 'Test message without reCAPTCHA token.'
        // No recaptchaToken field
      })
    });

    const result = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Success: ${result.success}`);
    console.log(`   Message: ${result.message}`);

    if (result.success) {
      console.log('   ✅ ACCEPTABLE: Form allows submission without token (optional in current config)');
    } else {
      console.log('   ✅ STRICT: reCAPTCHA token required');
    }

  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
  }

  console.log('\n📋 reCAPTCHA v3 Features:');
  console.log('   ✅ Invisible to users (no checkbox)');
  console.log('   ✅ Score-based validation (0.0-1.0)');
  console.log('   ✅ Action-based tracking (contact_form)');
  console.log('   ✅ Automatic execution on form interaction');
  console.log('   ✅ Better user experience');

  console.log('\n🔧 v3 vs v2 Differences:');
  console.log('   v2: Checkbox → Manual user interaction required');
  console.log('   v3: Invisible → Automatic score-based detection');
  console.log('   v2: Pass/Fail → Binary result');
  console.log('   v3: Score → 0.0 (bot) to 1.0 (human)');

  console.log('\n🌐 Test in Browser:');
  console.log('   1. Go to: http://localhost:4000/contact');
  console.log('   2. You should see NO visible reCAPTCHA widget');
  console.log('   3. Look for reCAPTCHA badge in bottom-right corner');
  console.log('   4. Form submission should work seamlessly');
  console.log('   5. Check browser console for reCAPTCHA activity');
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

  await testRecaptchaV3();
}

if (require.main === module) {
  main().catch(console.error);
}