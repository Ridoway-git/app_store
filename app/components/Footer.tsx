'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="border-t border-[#eaeaea] bg-white">
      <div className="container-custom py-16">
        <div className="mt-16 pt-8 border-t border-[#eaeaea]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-500">
              © {year} Mobarok Vai. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/about" className="text-base text-gray-500 hover-link">
                About Dev
              </Link>
              <Link href="/blog" className="text-base text-gray-500 hover-link">
                Blog
              </Link>
              <Link href="/contact" className="text-base text-gray-500 hover-link">
                Contact Us
              </Link>
              <Link href="/privacy" className="text-base text-gray-500 hover-link">
                Privacy
              </Link>
              <Link href="/terms" className="text-base text-gray-500 hover-link">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 