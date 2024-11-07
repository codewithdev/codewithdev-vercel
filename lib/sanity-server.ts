/**
 * Server-side Sanity utilities. By having these in a separate file from the
 * utilities we use on the client side, we are able to tree-shake (remove)
 * code that is not used on the client side.
 */
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { type SanityClient } from 'next-sanity'

export const config = {
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production'
}

export const sanityClient = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: '2024-03-01',
  useCdn: config.useCdn
})

export const urlFor = (source: any) => imageUrlBuilder(sanityClient).image(source)

export async function getClient(preview?: boolean): Promise<SanityClient> {
  if (preview) {
    return createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN
    })
  }
  return sanityClient
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return sanityClient.fetch(query) as Promise<T>
}
