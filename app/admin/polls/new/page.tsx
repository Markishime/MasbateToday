"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createPoll } from "@/lib/firebase/polls";
import { Plus, Trash2 } from "lucide-react";

interface PollFormData {
  articleId: string;
  question: string;
  questionTagalog?: string;
  options: { text: string; textTagalog?: string }[];
  expiresAt?: string;
}

export default function NewPollPage() {
  const { admin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<PollFormData>({
    defaultValues: {
      options: [{ text: "" }, { text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
    }
  }, [admin, router]);

  const onSubmit = async (data: PollFormData) => {
    if (!admin) return;

    setLoading(true);
    try {
      const pollData = {
        articleId: data.articleId,
        question: data.question,
        questionTagalog: data.questionTagalog,
        options: data.options.map((opt, index) => ({
          id: `option_${index}`,
          text: opt.text,
          textTagalog: opt.textTagalog,
          votes: 0,
        })),
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      };

      await createPoll(pollData);
      router.push("/admin/polls");
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Create New Poll</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Article ID *</label>
          <input
            {...register("articleId", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter article ID"
          />
          {errors.articleId && (
            <p className="text-red-500 text-sm mt-1">Article ID is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Question (English) *</label>
          <input
            {...register("question", { required: true })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="What is your question?"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">Question is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Question (Tagalog)</label>
          <input
            {...register("questionTagalog")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ano ang iyong tanong?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Options *</label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex space-x-2">
                <div className="flex-1 space-y-2">
                  <input
                    {...register(`options.${index}.text`, { required: true })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Option ${index + 1} (English)`}
                  />
                  <input
                    {...register(`options.${index}.textTagalog`)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Option ${index + 1} (Tagalog)`}
                  />
                </div>
                {fields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ text: "", textTagalog: "" })}
              className="flex items-center space-x-2 px-4 py-2 border border-dashed rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Option</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Expires At (Optional)</label>
          <input
            type="datetime-local"
            {...register("expiresAt")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Poll"}
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

