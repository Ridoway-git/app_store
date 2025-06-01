'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface AboutContent {
  id: string
  title: string
  content: string
  image: string
  updatedAt: string
}

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/about', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`)
      }
      
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching about content:', error)
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

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
        <p className="text-gray-600">The about page content is not available.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Image */}
      <div className="relative aspect-[2/1] w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={content.image}
          alt={content.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date(content.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
} 