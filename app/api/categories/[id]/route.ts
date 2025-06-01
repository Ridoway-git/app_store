import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        icon: data.icon,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, check if there are any apps or blog posts using this category
    const [apps, blogPosts] = await Promise.all([
      prisma.app.findMany({
        where: { categoryId: params.id },
      }),
      prisma.blogPost.findMany({
        where: { categoryId: params.id },
      }),
    ])

    if (apps.length > 0 || blogPosts.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete category that has associated apps or blog posts',
          details: {
            appsCount: apps.length,
            blogPostsCount: blogPosts.length
          }
        },
        { status: 400 }
      )
    }

    // If no associated records, proceed with deletion
    await prisma.category.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
} 