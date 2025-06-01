'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AppDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await fetch(`/api/apps/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setApp(data);
        }
      } catch (error) {
        console.error('Error fetching app:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!app) {
    return <div>App not found.</div>;
  }

  const screenshots = JSON.parse(app.screenshots);
  const features = JSON.parse(app.features);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24">
              <Image
                src={app.icon}
                alt={app.name}
                fill
                sizes="96px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.name}</h1>
              <p className="text-gray-600 mb-4">{app.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>⭐ {app.rating}</span>
                <span>📥 {app.downloads}</span>
                <span>📱 {app.size}</span>
                <span>🔄 {app.version}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => window.open(app.downloadUrl || '#', '_blank')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="bg-white mt-4 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="relative w-48 h-96 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={screenshot}
                  alt={`${app.name} screenshot ${index + 1}`}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white mt-4 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Size</span>
              <p>{app.size}</p>
            </div>
            <div>
              <span className="font-medium">Version</span>
              <p>{app.version}</p>
            </div>
            <div>
              <span className="font-medium">Last Updated</span>
              <p>{new Date(app.updatedAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium">Category</span>
              <p>{app.category.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white mt-4 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About this app</h2>
          <div className="prose max-w-none">
            <p>{app.content}</p>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="bg-white mt-4 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Developer</h2>
          <div className="flex items-center space-x-4">
            <div>
              <p className="font-medium text-gray-900">{app.developer}</p>
              <Link href="/about" className="text-blue-600 hover:text-blue-800">
                Visit Developer Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 