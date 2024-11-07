import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Explicitly log the environment variables to debug
console.log('Environment check:', {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET
})

// Use a direct string for projectId from your .env file
export const config = {
  dataset: 'production',
  projectId: 'hyxkyhqk', // Your project ID from .env
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production'
}

export const sanityClient = createClient(config)

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: any) {
  return builder.image(source)
}
