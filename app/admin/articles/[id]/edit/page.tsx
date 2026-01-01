"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import { getArticle, updateArticle } from "@/lib/firebase/articles";
import { uploadImage } from "@/lib/firebase/storage";
import { Article } from "@/types";
import { calculateReadingTime } from "@/lib/utils";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function EditArticlePage() {
  const { user, admin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Partial<Article>>();

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    loadArticle();
  }, [admin, router, articleId]);

  const loadArticle = async () => {
    try {
      const article = await getArticle(articleId);
      if (!article) {
        router.push("/admin/articles");
        return;
      }

      // Populate form
      setValue("title", article.title);
      setValue("content", article.content);
      setValue("excerpt", article.excerpt);
      setValue("category", article.category);
      setValue("tags", article.tags);
      setValue("published", article.published);
      setValue("featured", article.featured);
      setValue("sponsored", article.sponsored);
      setValue("premium", article.premium);
      setValue("featuredImage", article.featuredImage);
      setImagePreview(article.featuredImage || "");
    } catch (error) {
      console.error("Error loading article:", error);
    } finally {
      setLoading(false);
    }
  };

  const content = watch("content") || "";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Partial<Article>) => {
    if (!user || !admin) return;

    setSaving(true);
    try {
      let featuredImageUrl = data.featuredImage || "";

      // Upload new image if provided
      if (imageFile) {
        featuredImageUrl = await uploadImage(imageFile, "articles");
      }

      await updateArticle(articleId, {
        ...data,
        featuredImage: featuredImageUrl,
        readingTime: calculateReadingTime(data.content || ""),
      });

      router.push("/admin/articles");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select category</option>
            <option value="masbate">Masbate News</option>
            <option value="national">National News</option>
            <option value="blog">Blog</option>
            <option value="video">Video</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">Category is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            {...register("excerpt")}
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Brief summary of the article"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => setValue("content", value)}
            className="bg-white dark:bg-gray-800"
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">Content is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-w-md rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input
            defaultValue={watch("tags")?.join(", ")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="news, masbate, events"
            onChange={(e) => {
              const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
              setValue("tags", tags);
            }}
          />
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("published")}
              className="rounded"
            />
            <span>Published</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("featured")}
              className="rounded"
            />
            <span>Feature on homepage</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("sponsored")}
              className="rounded"
            />
            <span>Sponsored content</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("premium")}
              className="rounded"
            />
            <span>Premium content</span>
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

