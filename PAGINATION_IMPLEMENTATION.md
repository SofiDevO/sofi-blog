# Pagination Implementation Documentation

## Overview
This document describes the pagination implementation for category pages using Astro's native `paginate()` API with `prerender = true`.

## Route Structure

### Files
1. **`/src/pages/categories/[slug].astro`** - Redirects to first page
2. **`/src/pages/categories/[slug]/[...page].astro`** - Main pagination handler

### URL Pattern
- `/categories/{slug}` → Redirects to `/categories/{slug}/1`
- `/categories/{slug}/1` → First page (4 posts)
- `/categories/{slug}/2` → Second page (4 posts)
- `/categories/{slug}/3` → Third page (4 posts)
- etc.

## Implementation Details

### Page Generation (`[slug]/[...page].astro`)

```typescript
export async function getStaticPaths({ paginate }) {
  const categoriesWithPostsGrouped = await getCategoriesWithPosts();

  return Object.values(categoriesWithPostsGrouped).flatMap((categories) => {
    const category = categories[0];
    if (!category) return [];

    return paginate(category.posts, {
      params: { slug: category.slug },
      pageSize: 4,
      props: {
        categoryName: category.name,
        categorySlug: category.slug,
      },
    });
  });
}
```

This generates all pages at build time with the following data:
- `page.data` - Array of posts for current page
- `page.currentPage` - Current page number (1, 2, 3, etc.)
- `page.lastPage` - Total number of pages
- `page.url.prev` - URL to previous page (undefined for page 1)
- `page.url.next` - URL to next page (undefined for last page)
- `page.total` - Total number of posts

### Pagination Component

The `Pagination` component uses Astro's native URLs:

```astro
<Pagination
  currentPage={page.currentPage}
  totalPages={page.lastPage}
  baseUrl={`/categories/${categorySlug}`}
  page={page}
/>
```

**Props:**
- `currentPage` - Current page number (for highlighting)
- `totalPages` - Total pages (for generating page links)
- `baseUrl` - Base URL for generating page links
- `page` - Astro's page object (for prev/next URLs)

**URL Generation:**
- Previous button: Uses `page.url.prev` (Astro-generated)
- Next button: Uses `page.url.next` (Astro-generated)
- Page numbers: Generated as `{baseUrl}/{pageNum}` (e.g., `/categories/javascript/2`)

## Benefits

1. **Static Generation** - All pages pre-rendered at build time
2. **SEO Friendly** - Clean URLs without query parameters
3. **Fast Navigation** - No server-side processing needed
4. **Astro Native** - Uses official `paginate()` API
5. **Type Safe** - Leverages Astro's built-in TypeScript support

## Testing

Without WordPress credentials, you can verify the implementation logic:

1. **Route Pattern**: `[slug]/[...page].astro` correctly handles pagination
2. **Redirect**: `[slug].astro` redirects to `/1` for clean initial access
3. **Pagination Component**: Properly uses `page.url.prev` and `page.url.next`
4. **Page Links**: Generated as `/categories/{slug}/{pageNum}`

With WordPress credentials:
1. Navigate to `/categories/{any-category}`
2. Should redirect to `/categories/{any-category}/1`
3. Click "Siguiente" (Next) to go to page 2
4. Click page numbers to jump directly
5. Verify "Anterior" (Previous) works
6. Verify first page has no "Anterior" link
7. Verify last page has no "Siguiente" link
