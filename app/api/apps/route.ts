import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Initialize database if it doesn't exist
async function initializeDatabase() {
  try {
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
    if (!fs.existsSync(dbPath)) {
      console.log('Database file does not exist, initializing...')
      await prisma.$executeRaw`PRAGMA foreign_keys = ON;`
      console.log('Database initialized successfully')
    }
    return true
  } catch (error) {
    console.error('Failed to initialize database:', error)
    return false
  }
}

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect()
    // Test query
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection test failed:', error)
    return false
  }
}

export async function GET() {
  try {
    const isConnected = await testConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    const apps = await prisma.app.findMany({
      include: {
        category: true,
      },
    })
    return NextResponse.json(apps)
  } catch (error) {
    console.error('Error fetching apps:', error)
    return NextResponse.json(
      { error: 'Failed to fetch apps' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Test database connection first
    const isConnected = await testConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Log the incoming request
    console.log('Received POST request to /api/apps')

    // Validate request body
    if (!request.body) {
      console.error('No request body provided')
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      )
    }

    let data
    try {
      data = await request.json()
      console.log('Parsed request data:', data)
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    if (!data || typeof data !== 'object') {
      console.error('Invalid data format:', data)
      return NextResponse.json(
        { error: 'Request body must be a valid JSON object' },
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['name', 'slug', 'description', 'content', 'categoryId', 'version', 'size', 'downloads', 'rating', 'developer', 'icon', 'headerImage', 'downloadUrl']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    })

    if (!category) {
      console.error('Category not found:', data.categoryId)
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingApp = await prisma.app.findUnique({
      where: { slug: data.slug },
    })

    if (existingApp) {
      console.error('Slug already exists:', data.slug)
      return NextResponse.json(
        { error: 'An app with this slug already exists' },
        { status: 400 }
      )
    }

    // Create the app
    console.log('Creating app with data:', {
      ...data,
      features: data.features || [],
      screenshots: data.screenshots || []
    })

    const app = await prisma.app.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        content: data.content,
        categoryId: data.categoryId,
        version: data.version,
        size: data.size,
        downloads: data.downloads.toString(),
        rating: parseFloat(data.rating),
        developer: data.developer,
        features: JSON.stringify(data.features || []),
        screenshots: JSON.stringify(data.screenshots || []),
        icon: data.icon,
        headerImage: data.headerImage,
        downloadUrl: data.downloadUrl,
      },
      include: {
        category: true,
      },
    })

    console.log('Successfully created app:', app)
    return NextResponse.json(app)

  } catch (error) {
    console.error('Error creating app:', error)
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A unique constraint would be violated. Please check your input.' },
        { status: 400 }
      )
    }

    // Handle other Prisma errors
    if (error.code) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create app. Please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 