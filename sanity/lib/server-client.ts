import {createClient} from 'next-sanity'

// Server-only client with token for mutations and admin operations
// WARNING: This file should NEVER be imported in client-side code
export const clientWithToken = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-15',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})