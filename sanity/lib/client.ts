import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-15',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'raw'
})

// Create a client with token for mutations (seed script)
export const clientWithToken = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-15',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})