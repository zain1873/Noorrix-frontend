import { notFound } from "next/navigation";
import BlogCategory from "@/views/BlogCategory";

const BASE = process.env.NEXT_PUBLIC_API_URL?.trim();

export async function generateMetadata({ params }) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  return {
    title: `${name} | Blog | Noorrix Motors`,
    description: `Browse ${name} articles from the Noorrix Motors blog.`,
  };
}

async function fetchCategoryPage(categoryName) {
  try {
    const [postsRes, catsRes] = await Promise.all([
      fetch(
        `${BASE}/api/blogs/?category=${encodeURIComponent(categoryName)}`,
        { next: { revalidate: 60 } }
      ),
      fetch(`${BASE}/api/blog-categories/`, { next: { revalidate: 300 } }),
    ]);
    const posts      = postsRes.ok ? await postsRes.json() : [];
    const categories = catsRes.ok  ? await catsRes.json()  : [];
    return { posts, categories };
  } catch {
    return { posts: [], categories: [] };
  }
}

export default async function Page({ params }) {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);
  const { posts, categories } = await fetchCategoryPage(categoryName);

  const exists = categories.some(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  );
  if (!exists && categories.length > 0) notFound();

  return (
    <BlogCategory
      posts={posts}
      categories={categories}
      activeCategory={categoryName}
    />
  );
}
