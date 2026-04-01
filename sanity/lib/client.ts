import {createClient} from 'next-sanity'

// Server-side read-only client — uses SANITY_READ_TOKEN (Viewer permissions).
// Required now that the dataset is set to private.
// Do NOT use NEXT_PUBLIC_ prefix — this token must never reach the browser.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-15',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_READ_TOKEN,
  perspective: 'published',
})