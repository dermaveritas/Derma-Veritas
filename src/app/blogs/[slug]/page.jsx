"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useBlogsData } from "@/hooks/useBlog";
import { slugify } from "@/utils/slugify";

export default function BlogPost() {
  const params = useParams();
  const { data, isLoading, error } = useBlogsData();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (data?.blogs) {
      const foundBlog = data.blogs.find(
        (blog) => slugify(blog.title) === params.slug
      );
      if (foundBlog) {
        setBlog(foundBlog);
      }
    }
  }, [data, params.slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">Error loading blog: {error.message}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Blog post not found</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "No date available";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {blog.title}
            </h1>

            <div className="flex gap-2 mb-8">
              {blog.tags && blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {blog.coverImage && (
            <div className="aspect-[16/9] mb-8 overflow-hidden rounded-lg">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </article>
      </div>
    </div>
  );
}
