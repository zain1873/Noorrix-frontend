# Dynamic Blogs — Backend & Admin Specification

## Overview

Make the Noorrix Motors blog page fully dynamic. Admins manage posts through Django admin (or a dedicated API). The Next.js frontend fetches posts from the DRF backend at `NEXT_PUBLIC_API_URL`.

---

## Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Backend   | Django + Django REST Framework (DRF)    |
| Admin UI  | Django Admin (built-in)                 |
| Frontend  | Next.js 15 (App Router) — `src/app/blogs/page.js` |
| Auth      | Django session auth for admin panel     |
| Images    | Cloudinary **or** Django `MEDIA_ROOT`   |

---

## 1. Django — Data Model

```python
# blog/models.py

from django.db import models
from django.utils.text import slugify


class BlogCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title       = models.CharField(max_length=255)
    slug        = models.SlugField(max_length=255, unique=True, blank=True)
    category    = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name="posts")
    excerpt     = models.TextField(help_text="Short summary shown on the card (1–3 sentences)")
    body        = models.TextField(help_text="Full article content (Markdown or HTML)")
    image       = models.ImageField(upload_to="blogs/", help_text="Cover image — recommended 1200×630px")
    is_featured = models.BooleanField(default=False, help_text="Show as the featured/editor's pick post")
    is_published = models.BooleanField(default=False, help_text="Only published posts appear on the site")
    read_time   = models.PositiveSmallIntegerField(help_text="Estimated read time in minutes")
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
```

**Migration commands:**
```bash
python manage.py makemigrations blog
python manage.py migrate
```

---

## 2. Django Admin

```python
# blog/admin.py

from django.contrib import admin
from .models import BlogPost, BlogCategory


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display  = ("title", "category", "is_featured", "is_published", "published_at", "read_time")
    list_filter   = ("is_published", "is_featured", "category")
    search_fields = ("title", "excerpt", "body")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    list_editable = ("is_published", "is_featured")

    fieldsets = (
        ("Content", {
            "fields": ("title", "slug", "category", "excerpt", "body", "image", "read_time")
        }),
        ("Publishing", {
            "fields": ("is_published", "is_featured", "published_at")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
```

---

## 3. DRF Serializers

```python
# blog/serializers.py

from rest_framework import serializers
from .models import BlogPost, BlogCategory


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = BlogCategory
        fields = ("id", "name")


class BlogPostListSerializer(serializers.ModelSerializer):
    category   = BlogCategorySerializer(read_only=True)
    image_url  = serializers.SerializerMethodField()

    class Meta:
        model  = BlogPost
        fields = (
            "id", "title", "slug", "category",
            "excerpt", "image_url", "read_time",
            "is_featured", "published_at",
        )

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class BlogPostDetailSerializer(BlogPostListSerializer):
    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + ("body",)
```

---

## 4. DRF Views & URLs

```python
# blog/views.py

from rest_framework import generics
from .models import BlogPost
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer

    def get_queryset(self):
        qs = BlogPost.objects.filter(is_published=True)
        featured = self.request.query_params.get("featured")
        category = self.request.query_params.get("category")
        if featured == "true":
            qs = qs.filter(is_featured=True)
        if category:
            qs = qs.filter(category__name__iexact=category)
        return qs


class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class   = BlogPostDetailSerializer
    queryset           = BlogPost.objects.filter(is_published=True)
    lookup_field       = "slug"
```

```python
# blog/urls.py

from django.urls import path
from .views import BlogPostListView, BlogPostDetailView

urlpatterns = [
    path("api/blogs/",          BlogPostListView.as_view(),   name="blog-list"),
    path("api/blogs/<slug:slug>/", BlogPostDetailView.as_view(), name="blog-detail"),
]
```

```python
# project/urls.py  — add to existing urlpatterns
from django.urls import path, include

urlpatterns += [
    path("", include("blog.urls")),
]
```

---

## 5. API Reference

| Method | Endpoint                        | Auth     | Description                          |
|--------|---------------------------------|----------|--------------------------------------|
| GET    | `/api/blogs/`                   | None     | All published posts (newest first)   |
| GET    | `/api/blogs/?featured=true`     | None     | The featured/editor's pick post      |
| GET    | `/api/blogs/?category=Car Tips` | None     | Posts filtered by category name      |
| GET    | `/api/blogs/<slug>/`            | None     | Full post detail including body      |

**Example response — `/api/blogs/`**
```json
[
  {
    "id": 1,
    "title": "10 Things to Check Before Buying a Used Car",
    "slug": "10-things-to-check-before-buying-a-used-car",
    "category": { "id": 1, "name": "Buying Guides" },
    "excerpt": "Purchasing a used car can be a great way to save money...",
    "image_url": "https://api.noorrixmotors.co.uk/media/blogs/cover.jpg",
    "read_time": 6,
    "is_featured": false,
    "published_at": "2026-06-02T10:00:00Z"
  }
]
```

---

## 6. Next.js — Frontend Integration

### 6a. Next.js API Route (proxy)

```js
// src/app/api/blogs/route.js

import { NextResponse } from "next/server";

const DRF_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const params = searchParams.toString();
  const url = `${DRF_URL}/api/blogs/${params ? `?${params}` : ""}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // ISR every 60s
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
```

### 6b. Blogs page — convert to server component

```js
// src/app/blogs/page.js

import Blogs from "@/views/Blogs";

export const metadata = {
  title: "Blog | Noorrix Motors",
  description: "Expert car buying guides, maintenance tips, and automotive news.",
};

async function fetchBlogs() {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const [postsRes, featuredRes] = await Promise.all([
    fetch(`${base}/api/blogs/`, { next: { revalidate: 60 } }),
    fetch(`${base}/api/blogs/?featured=true`, { next: { revalidate: 60 } }),
  ]);
  const posts    = await postsRes.json();
  const featured = await featuredRes.json();
  return { posts, featured: featured[0] || null };
}

export default async function Page() {
  const { posts, featured } = await fetchBlogs();
  return <Blogs posts={posts} featuredPost={featured} />;
}
```

### 6c. Blogs view — accept props instead of hardcoded data

```jsx
// src/views/Blogs.jsx  — replace top data constants with props

"use client";
import React from "react";
// ... existing imports ...

function Blogs({ posts = [], featuredPost = null }) {
  // remove: const blogPosts = [...] and const featuredPost = {...}
  // use `posts` and `featuredPost` from props
  // ...
}
```

---

## 7. Admin Workflow

1. Go to `https://api.noorrixmotors.co.uk/admin/` and log in as superuser.
2. Under **Blog → Blog Categories**, add categories (e.g. "Car Tips", "Buying Guides").
3. Under **Blog → Blog Posts**, click **Add Blog Post**:
   - Fill **Title** — slug auto-generates.
   - Choose **Category**.
   - Write **Excerpt** (shown on card) and **Body** (full article).
   - Upload **Cover Image** (1200×630 px recommended).
   - Set **Read time** in minutes.
   - Tick **Is featured** to make it the Editor's Pick (only one at a time).
   - Tick **Is published** and set **Published at** date to make it live.
4. Save. The post appears on `/blogs` within 60 seconds (ISR revalidation).

---

## 8. Image Handling Options

### Option A — Django MEDIA (simpler)
```python
# settings.py
MEDIA_URL  = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
```
Serve via whitenoise or nginx. Image URL returned as absolute URL by serializer.

### Option B — Cloudinary (recommended for production)
```bash
pip install cloudinary django-cloudinary-storage
```
```python
# settings.py
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"
CLOUDINARY_STORAGE = {
    "CLOUD_NAME": "...",
    "API_KEY": "...",
    "API_SECRET": "...",
}
```
Images are stored and served from Cloudinary CDN automatically.

---

## 9. Required Packages

```bash
# Backend
pip install djangorestframework pillow

# If using Cloudinary
pip install cloudinary django-cloudinary-storage
```

Add to `INSTALLED_APPS`:
```python
"rest_framework",
"blog",
# "cloudinary_storage",  # if using Cloudinary
# "cloudinary",          # if using Cloudinary
```

---

## 10. Environment Variables

| Variable                   | Where     | Value                                 |
|----------------------------|-----------|---------------------------------------|
| `NEXT_PUBLIC_API_URL`      | Next.js   | `https://api.noorrixmotors.co.uk`    |
| `CLOUDINARY_CLOUD_NAME`    | Django    | Your Cloudinary cloud name            |
| `CLOUDINARY_API_KEY`       | Django    | Your Cloudinary API key               |
| `CLOUDINARY_API_SECRET`    | Django    | Your Cloudinary API secret            |

---

## 11. Checklist

- [ ] Create `blog` Django app and register in `INSTALLED_APPS`
- [ ] Add `BlogCategory` and `BlogPost` models
- [ ] Run migrations
- [ ] Register models in Django admin
- [ ] Add DRF serializers, views, and URLs
- [ ] Configure image storage (Media or Cloudinary)
- [ ] Add Next.js API proxy route at `src/app/api/blogs/route.js`
- [ ] Update `src/app/blogs/page.js` to server-fetch and pass props
- [ ] Update `src/views/Blogs.jsx` to consume `posts` and `featuredPost` props
- [ ] Remove hardcoded `blogPosts` and `featuredPost` constants from `Blogs.jsx`
- [ ] Test: publish a post in admin → verify it appears on `/blogs`
- [ ] Set CORS to allow Next.js origin in Django settings
