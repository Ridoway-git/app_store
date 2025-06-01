'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DeveloperPage() {
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloperInfo = async () => {
      try {
        const response = await fetch('/api/public/developer-info');
        if (response.ok) {
          const data = await response.json();
          setDeveloperInfo(data);
        }
      } catch (error) {
        console.error('Error fetching developer info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloperInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!developerInfo) {
    return <div>No developer info found. Please add developer info from the admin panel.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-12">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src={developerInfo.logo}
              alt={developerInfo.name}
              fill
              sizes="128px"
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {developerInfo.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{developerInfo.description}</p>
          <div className="flex justify-center space-x-4">
            <Link
              href={`mailto:${developerInfo.email}`}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {Object.entries(JSON.parse(developerInfo.stats)).map(([key, value]) => (
          <div
            key={key}
            className="bg-white shadow-sm rounded-lg p-6 text-center"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {value}
            </div>
            <div className="text-gray-600">{key}</div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-12">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JSON.parse(developerInfo.teamMembers).map((member) => (
              <div
                key={member.name}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <div className="text-blue-600 mb-2">{member.role}</div>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">📍</span> {developerInfo.address}
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">📞</span> {developerInfo.phone}
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="mr-2">✉️</span> {developerInfo.email}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="space-y-4">
                {Object.entries(JSON.parse(developerInfo.socialLinks)).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <span className="mr-2">🔗</span> {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 