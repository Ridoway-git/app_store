import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Mobarok Dev - Modern App Landing Pages',
  description: 'Create Awesome Apps For Your Business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-[#fafafa] to-white" suppressHydrationWarning>
        <header className="sticky top-0 z-50 w-full glass border-b border-gray-100">
          <div className="container-custom">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-blue-900">
                    Mobarok Dev
                  </span>
                </Link>
              </div>
              <nav className="flex items-center space-x-8">
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300"
                >
                  About Dev
                </Link>
                <Link 
                  href="/blog" 
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300"
                >
                  Blog
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="container-custom py-16">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  )
} 