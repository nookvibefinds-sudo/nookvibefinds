# Blog system notes

This project now has a free manual blog system:

- Blog list page: `/blogs`
- Single blog page: `/blogs/[slug]`
- Blog content files: `content/blogs/*.mdx`
- Blog images: `public/blogs/...` or Cloudinary URLs
- SEO files: `app/sitemap.js` and `app/robots.js`

## Add a new blog

1. Copy `content/blogs/cozy-reading-nook-ideas.mdx`.
2. Rename it, for example: `small-bedroom-decor-ideas.mdx`.
3. Change the frontmatter title, slug, description, image, date, and category.
4. Add product blocks using this format:

```mdx
::product
title: Product Name
image: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/product.webp
href: https://your-affiliate-link
button: Check on AliExpress
text: Short product description.
- Benefit one
- Benefit two
::end
```

If you do not have a product image yet, remove the `image:` line.

## Important

Prices are intentionally not shown in the blog because AliExpress and Amazon prices change often.
