import { NextResponse } from 'next/server'
import { prisma } from '../../../../src/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  try {
    // First try to find the post by ID
    let post = await prisma.blogPost.findUnique({
      where: { id: params.identifier },
      include: {
        category: true,
        app: true,
      },
    })

    // If not found by ID, try by slug
    if (!post) {
      post = await prisma.blogPost.findUnique({
        where: { slug: params.identifier },
        include: {
          category: true,
          app: true,
        },
      })
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { identifier: string } }
) {
  try {
    // First try to find the post by ID
    let post = await prisma.blogPost.findUnique({
      where: { id: params.identifier }
    })

    // If not found by ID, try by slug
    if (!post) {
      post = await prisma.blogPost.findUnique({
        where: { slug: params.identifier }
      })
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Delete the post
    await prisma.blogPost.delete({
      where: { id: post.id }
    })

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
} 