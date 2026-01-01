"use client";

import { useEffect, useRef } from "react";

interface ArticleContentProps {
  content: string;
}

// Basic XSS sanitization - remove potentially dangerous attributes and scripts
function sanitizeHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  // Remove script tags and event handlers
  const scripts = body.querySelectorAll("script");
  scripts.forEach((script) => script.remove());

  // Remove dangerous attributes
  const allElements = body.querySelectorAll("*");
  allElements.forEach((el) => {
    // Remove event handlers and dangerous attributes
    Array.from(el.attributes).forEach((attr) => {
      if (
        attr.name.startsWith("on") ||
        attr.name === "javascript:" ||
        attr.value?.startsWith("javascript:")
      ) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return body.innerHTML;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Sanitize content first
    const sanitizedContent = sanitizeHTML(content);

    // Parse HTML content and add styling
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, "text/html");
    const body = doc.body;

    // Add classes to elements
    const paragraphs = body.querySelectorAll("p");
    paragraphs.forEach((p) => {
      p.className = "mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300";
    });

    const headings = body.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((h) => {
      const level = parseInt(h.tagName.charAt(1));
      h.className = `font-bold mb-4 mt-6 ${
        level === 1
          ? "text-3xl"
          : level === 2
          ? "text-2xl"
          : level === 3
          ? "text-xl"
          : "text-lg"
      }`;
    });

    const images = body.querySelectorAll("img");
    images.forEach((img) => {
      img.className = "w-full rounded-lg my-6";
    });

    const links = body.querySelectorAll("a");
    links.forEach((a) => {
      a.className = "text-primary hover:underline";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });

    if (contentRef.current) {
      contentRef.current.innerHTML = body.innerHTML;
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-lg max-w-none dark:prose-invert"
    />
  );
}

