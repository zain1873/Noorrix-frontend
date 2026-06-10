import Blogs from "@/views/Blogs";

export const metadata = {
  title: "Blog | Noorrix Motors",
  description:
    "Read expert car buying guides, maintenance tips, automotive news, and more from the Noorrix Motors team.",
};

const BASE = process.env.NEXT_PUBLIC_API_URL?.trim();

async function fetchBlogs() {
  try {
    const [postsRes, featuredRes, catsRes] = await Promise.all([
      fetch(`${BASE}/api/blogs/`,               { next: { revalidate: 60 } }),
      fetch(`${BASE}/api/blogs/?featured=true`,  { next: { revalidate: 60 } }),
      fetch(`${BASE}/api/blog-categories/`,      { next: { revalidate: 300 } }),
    ]);
    const posts      = postsRes.ok   ? await postsRes.json()   : [];
    const featuredArr = featuredRes.ok ? await featuredRes.json() : [];
    const categories = catsRes.ok    ? await catsRes.json()    : [];
    return { posts, featured: featuredArr[0] || null, categories };
  } catch {
    return { posts: [], featured: null, categories: [] };
  }
}

export default async function Page() {
  const { posts, featured, categories } = await fetchBlogs();
  return <Blogs posts={posts} featuredPost={featured} categories={categories} />;
}
