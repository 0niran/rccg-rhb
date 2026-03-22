import {createClient} from 'next-sanity'

// Client-safe configuration (no tokens)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-15',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'raw'
})