import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let content = await prisma.about.findFirst()
    
    if (!content) {
      // Create initial content if it doesn't exist
      content = await prisma.about.create({
        data: {
          id: '1',
          title: 'About Our Development Team',
          content: '<p>Welcome to our development team page. We are a dedicated group of professionals committed to creating innovative solutions.</p>',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        },
      })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { title, content, image } = data

    const updatedContent = await prisma.about.upsert({
      where: { id: '1' }, // We'll use a single record for about page
      update: {
        title,
        content,
        image,
        updatedAt: new Date(),
      },
      create: {
        id: '1',
        title,
        content,
        image,
      },
    })

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error('Error updating about content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 