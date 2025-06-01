'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  author: string
  authorImage: string
  category: {
    name: string
    slug: string
  }
  createdAt: string
}

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Development', slug: 'development' },
  { name: 'Design', slug: 'design' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Business', slug: 'business' },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const currentCategory = categories.find(
    (category) => category.slug === params.slug
  )

  useEffect(() => {
    fetchPosts()
  }, [params.slug])

  const fetchPosts = async () => {
    try {
      const url = params.slug === 'all' 
        ? '/api/blog-posts'
        : `/api/blog-posts?category=${params.slug}`
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        throw new Error('Failed to fetch blog posts')
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {currentCategory?.name || 'All'} Articles
        </h1>
        <p className="text-xl text-gray-600">
          {currentCategory?.name === 'All'
            ? 'Browse all our articles about app development'
            : `Explore our ${currentCategory?.name.toLowerCase()} articles`}
        </p>
      </div>

      {/* Categories */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className={`px-4 py-2 rounded-full transition-colors ${
              category.slug === params.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No articles found
            </h2>
            <p className="text-gray-600">
              We couldn't find any articles in this category.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-[2/1] w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {post.category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center space-x-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-500">By {post.author}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
} 