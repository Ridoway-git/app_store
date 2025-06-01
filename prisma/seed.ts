import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Productivity',
        slug: 'productivity',
        description: 'Apps that help you get things done',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Development',
        slug: 'development',
        description: 'Tools and resources for developers',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Design',
        slug: 'design',
        description: 'Apps for designers and creatives',
      },
    }),
  ])

  // Create apps
  const apps = await Promise.all([
    prisma.app.create({
      data: {
        name: 'TaskMaster Pro',
        slug: 'taskmaster-pro',
        description: 'A powerful task management app',
        content: 'Detailed description of TaskMaster Pro...',
        icon: 'https://placehold.co/512x512',
        headerImage: 'https://placehold.co/1200x600',
        screenshots: [
          'https://placehold.co/1080x1920',
          'https://placehold.co/1080x1920',
        ],
        features: ['Task Management', 'Cloud Sync', 'Offline Mode'],
        size: '15MB',
        version: '1.0.0',
        downloads: '1M+',
        rating: 4.5,
        developer: 'AppLand Developer',
        categoryId: categories[0].id,
      },
    }),
    prisma.app.create({
      data: {
        name: 'CodeEditor',
        slug: 'codeeditor',
        description: 'Advanced code editor for developers',
        content: 'Detailed description of CodeEditor...',
        icon: 'https://placehold.co/512x512',
        headerImage: 'https://placehold.co/1200x600',
        screenshots: [
          'https://placehold.co/1080x1920',
          'https://placehold.co/1080x1920',
        ],
        features: ['Syntax Highlighting', 'Git Integration', 'Live Preview'],
        size: '25MB',
        version: '2.1.0',
        downloads: '500K+',
        rating: 4.8,
        developer: 'AppLand Developer',
        categoryId: categories[1].id,
      },
    }),
  ])

  // Create initial about page content
  await prisma.about.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'About Our Development Team',
      content: '<p>Welcome to our development team page. We are a dedicated group of professionals committed to creating innovative solutions.</p>',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 