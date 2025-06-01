'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// This would be replaced with actual data fetching from the database
const mockApps = []

export default function Home() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/api/apps');
        if (response.ok) {
          const data = await response.json();
          setApps(data);
        }
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="space-y-12">
          {/* Featured Apps Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 animate-gradient">
                Featured Apps
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
                Browse our collection of applications
              </p>
            </div>

            {apps.length === 0 ? (
              <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm animate-fade-in">
                <div className="max-w-sm mx-auto">
                  <svg className="mx-auto h-12 w-12 text-gray-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No apps found</h3>
                  <p className="mt-1 text-sm text-gray-500">Please add apps from the admin panel.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {apps.map((app, index) => (
                  <Link 
                    key={app.id} 
                    href={`/apps/${app.slug}`} 
                    className="block group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={app.headerImage}
                          alt={app.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="relative h-10 w-10 flex-shrink-0">
                            <Image
                              src={app.icon}
                              alt={`${app.name} icon`}
                              fill
                              className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {app.name}
                            </h2>
                            <p className="text-sm text-gray-500">{app.version}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{app.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium transition-colors duration-300 group-hover:bg-blue-50 group-hover:text-blue-700">
                            {app.category.name}
                          </span>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400 animate-pulse">⭐</span>
                            <span className="text-gray-700 font-medium">{app.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
} 