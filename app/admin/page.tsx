import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/apps" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Manage Apps</h2>
          <p className="text-gray-600">Create, edit, and delete apps.</p>
        </Link>
        <Link href="/admin/categories" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Manage Categories</h2>
          <p className="text-gray-600">Organize your app categories.</p>
        </Link>
        <Link href="/admin/blog-posts" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Manage Blog Posts</h2>
          <p className="text-gray-600">Publish and edit blog articles.</p>
        </Link>
      </div>
    </div>
  );
} 