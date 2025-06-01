const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  console.log({ admin })

  // Create some initial categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'games' },
      update: {},
      create: {
        name: 'Games',
        slug: 'games',
        description: 'Mobile and desktop games',
        icon: '🎮',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'productivity' },
      update: {},
      create: {
        name: 'Productivity',
        slug: 'productivity',
        description: 'Tools to help you work better',
        icon: '⚡',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'social' },
      update: {},
      create: {
        name: 'Social',
        slug: 'social',
        description: 'Connect with others',
        icon: '👥',
      },
    }),
  ])

  console.log({ categories })

  // Create apps
  const apps = await Promise.all([
    prisma.app.upsert({
      where: { slug: 'taskmaster-pro' },
      update: {},
      create: {
        name: 'TaskMaster Pro',
        slug: 'taskmaster-pro',
        description: 'A powerful task management app',
        content: 'Detailed description of TaskMaster Pro...',
        icon: '',
        headerImage: '',
        screenshots: JSON.stringify([]),
        features: JSON.stringify(['Task Management', 'Cloud Sync', 'Offline Mode']),
        size: '15MB',
        version: '1.0.0',
        downloads: '1M+',
        rating: 4.5,
        developer: 'AppLand Developer',
        categoryId: categories[0].id,
      },
    }),
    prisma.app.upsert({
      where: { slug: 'codeeditor' },
      update: {},
      create: {
        name: 'CodeEditor',
        slug: 'codeeditor',
        description: 'Advanced code editor for developers',
        content: 'Detailed description of CodeEditor...',
        icon: '',
        headerImage: '',
        screenshots: JSON.stringify([]),
        features: JSON.stringify(['Syntax Highlighting', 'Git Integration', 'Live Preview']),
        size: '25MB',
        version: '2.1.0',
        downloads: '500K+',
        rating: 4.8,
        developer: 'AppLand Developer',
        categoryId: categories[1].id,
      },
    }),
  ])

  // Create blog posts
  await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: 'getting-started' },
      update: {},
      create: {
        title: 'Getting Started with App Development',
        slug: 'getting-started',
        excerpt: 'Learn the basics of app development...',
        content: 'Detailed content about app development...',
        image: '',
        author: 'John Doe',
        authorBio: 'Senior App Developer',
        authorImage: '',
        categoryId: categories[1].id,
        appId: apps[1].id,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'design-best-practices' },
      update: {},
      create: {
        title: 'Best Practices for App Design',
        slug: 'design-best-practices',
        excerpt: 'Discover the key principles of creating beautiful apps...',
        content: 'Detailed content about app design...',
        image: '',
        author: 'Jane Smith',
        authorBio: 'UI/UX Designer',
        authorImage: '',
        categoryId: categories[2].id,
      },
    }),
  ])

  // Create developer info
  await prisma.developerInfo.create({
    data: {
      name: 'AppLand Development',
      logo: '',
      description: 'We are a team of passionate developers...',
      founded: '2020',
      location: 'San Francisco, CA',
      email: 'contact@appland.dev',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, San Francisco, CA 94105',
      socialLinks: JSON.stringify({
        twitter: '',
        linkedin: '',
        github: '',
      }),
      teamMembers: JSON.stringify([
        {
          name: 'John Doe',
          role: 'CEO & Lead Developer',
          avatar: '',
          bio: '10+ years of experience in app development',
        },
        {
          name: 'Jane Smith',
          role: 'UI/UX Designer',
          avatar: '',
          bio: 'Award-winning designer with a passion for user experience',
        },
      ]),
      stats: JSON.stringify({
        appsDeveloped: '50+',
        happyClients: '100+',
        teamMembers: '15+',
        yearsExperience: '5+',
      }),
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