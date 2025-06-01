'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  authorBio: string
  authorImage: string
  category: {
    name: string
    slug: string
  }
  createdAt: string
  app?: {
    id: string
    name: string
    slug: string
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog-posts/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${response.statusText}`)
      }
      
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error('Error fetching blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Image */}
      <div className="relative aspect-[2/1] w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {post.category.name}
          </Link>
          <span className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={post.authorImage}
              alt={post.author}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900">{post.author}</div>
            <div className="text-sm text-gray-500">{post.authorBio}</div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Related App */}
      {post.app && (
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related App</h2>
          <Link
            href={`/apps/${post.app.slug}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            View {post.app.name}
          </Link>
        </div>
      )}

      {/* Back to Blog */}
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-block bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
} 