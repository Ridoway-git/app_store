import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  try {
    const resolvedParams = await params
    const identifier = resolvedParams.identifier

    // Try to find by ID first
    let app = await prisma.app.findUnique({
      where: { id: identifier },
      include: {
        category: true,
      },
    })

    // If not found by ID, try to find by slug
    if (!app) {
      app = await prisma.app.findUnique({
        where: { slug: identifier },
        include: {
          category: true,
        },
      })
    }

    if (!app) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(app)
  } catch (error) {
    console.error('Error fetching app:', error)
    return NextResponse.json(
      { error: 'Failed to fetch app' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  const identifier = await params.identifier
  try {
    const data = await request.json()
    
    // Try to find by ID first
    let app = await prisma.app.findUnique({
      where: { id: identifier },
    })

    // If not found by ID, try to find by slug
    if (!app) {
      app = await prisma.app.findUnique({
        where: { slug: identifier },
      })
    }

    if (!app) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      )
    }

    // Update using the found app's ID
    const updatedApp = await prisma.app.update({
      where: { id: app.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        content: data.content,
        categoryId: data.categoryId,
        version: data.version,
        size: data.size,
        downloads: data.downloads,
        rating: data.rating,
        developer: data.developer,
        features: JSON.stringify(data.features),
        screenshots: JSON.stringify(data.screenshots),
        icon: data.icon,
        headerImage: data.headerImage,
        downloadUrl: data.downloadUrl,
      },
    })
    return NextResponse.json(updatedApp)
  } catch (error) {
    console.error('Error updating app:', error)
    return NextResponse.json(
      { error: 'Failed to update app' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  const identifier = await params.identifier
  try {
    // Try to find by ID first
    let app = await prisma.app.findUnique({
      where: { id: identifier },
    })

    // If not found by ID, try to find by slug
    if (!app) {
      app = await prisma.app.findUnique({
        where: { slug: identifier },
      })
    }

    if (!app) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      )
    }

    // Delete using the found app's ID
    await prisma.app.delete({
      where: { id: app.id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting app:', error)
    return NextResponse.json(
      { error: 'Failed to delete app' },
      { status: 500 }
    )
  }
} 