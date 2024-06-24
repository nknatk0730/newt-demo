import 'server-only'
import { createClient } from 'newt-client-js'
import { Article } from '@/types/article'
import { cache } from 'react'
import { Staff } from '@/types/staff'
import { Category } from '@/types/category'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: 'cdn',
})

export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: 'updates',
    modelUid: 'article',
    query: {
      select: ['_id', 'title', 'slug', 'body', '_sys.createdAt', '_sys.updatedAt'],
    },
  })
  return items
})

export const searchArticles = cache(async (keyword?: string) => {
  const { items } = await client.getContents<Article>({
    appUid: 'updates',
    modelUid: 'article',
    query: {
      title: {
        match: keyword
      },
      select: ['_id', 'title', 'slug', 'body', '_sys.createdAt', '_sys.updatedAt'],
    },
  })
  return items
})

export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: 'updates',
    modelUid: 'article',
    query: {
      slug,
      select: ['_id', 'title', 'slug', 'body'],
    },
  })
  return article
})

export const getStaffs = cache(async () => {
  const { items } = await client.getContents<Staff>({
    appUid: 'updates',
    modelUid: 'author',
    query: {
      select: ['_id', 'fullName', 'profileImage', '_sys.createdAt', '_sys.updatedAt'],
    },
  })
  return items
})

export const getCategories = cache(async () => {
  const { items } = await client.getContents<Category>({
    appUid: 'updates',
    modelUid: 'category',
    query: {
      select: ['_id', 'name', 'slug'],
    },
  })
  return items
})

export const getArticlesByCategory = cache(async (category: string) => {
  const { items } = await client.getContents<Article>({
    appUid: 'updates',
    modelUid: 'article',
    query: {
      categories: {
        in: [category],
      }
    },
  })
  return items
})