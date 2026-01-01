"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { logout } from "@/lib/firebase/auth";
import Link from "next/link";
import { FileText, Video, Image, Settings, LogOut, Plus, TrendingUp, BarChart3, Mail } from "lucide-react";

export default function AdminDashboard() {
  const { user, loading, admin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !admin)) {
      router.push("/admin/login");
    }
  }, [user, admin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !admin) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/articles/new"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">New Article</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create a new news article
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/articles"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Manage Articles</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View and edit all articles
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/videos"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
              <Video className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Manage Videos</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload and manage videos
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/media"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Image className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Media Library</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage images and files
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Analytics</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View statistics and trends
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/polls"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Manage Polls</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create and manage polls
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/newsletter"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Newsletter</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage subscribers
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Contact Submissions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View contact messages
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Configure site settings
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

