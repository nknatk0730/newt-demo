import { getArticleBySlug, getArticles } from '@/lib/newt'
import React from 'react'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export const dynamicParams = false

export default async function page({
  params: {
    slug
  }
}: {
  params: {
    slug: string
  }
}) {
  const article = await getArticleBySlug(slug);

  if (!article) {
    return null
  };

  return (
    <div className='prose container'>
      <h1>{article?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  )
}
