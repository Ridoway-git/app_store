# App Landing Page Creation System

A modern web application for creating and managing app landing pages with integrated blog functionality.

## Features

- Home page displaying all apps
- App detail pages with header images and content
- Blog system where apps act as categories
- Developer information page
- Contact form
- Modern, responsive design using Tailwind CSS
- TypeScript for type safety
- Next.js for server-side rendering and routing
- Prisma for database management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your database and update the DATABASE_URL in your .env file
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app` - Next.js app directory containing all pages and components
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Database Schema

The application uses the following main models:
- App
- Category
- BlogPost
- DeveloperInfo

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 