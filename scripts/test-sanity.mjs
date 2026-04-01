import { createClient } from 'next-sanity';
import { config } from 'dotenv';

config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_READ_TOKEN;

console.log('--- Sanity Connection Test ---');
console.log('Project ID:', projectId);
console.log('Dataset:', dataset);
console.log('Token present:', !!token);
console.log('Token prefix:', token?.slice(0, 6) + '...');
console.log('');

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-15',
  useCdn: false,
  token,
  perspective: 'published',
});

try {
  const events = await client.fetch('*[_type == "event"]');
  console.log('✅ Connection successful');
  console.log('Events found:', events.length);
  if (events.length > 0) {
    console.log('First event:', JSON.stringify(events[0], null, 2));
  }
} catch (error) {
  console.error('❌ Fetch failed:', error.message);
  console.error('Full error:', error);
}
