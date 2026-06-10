import { notFound } from "next/navigation";
import BlogDetail from "@/views/BlogDetail";

const BASE = process.env.NEXT_PUBLIC_API_URL?.trim();

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${BASE}/api/blogs/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const post = await res.json();
    return {
      title: `${post.title} | Noorrix Motors Blog`,
      description: post.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  let post = null;
  try {
    const res = await fetch(`${BASE}/api/blogs/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (res.ok) post = await res.json();
  } catch {
    // fall through to notFound
  }

  if (!post) notFound();

  return <BlogDetail post={post} />;
}
