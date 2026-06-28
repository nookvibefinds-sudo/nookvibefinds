import { getAllBlogs } from "../lib/blogs";

const SITE_URL = "https://nookvibefinds.vercel.app";

export default function sitemap() {
  const staticRoutes = ["", "/blogs", "/affiliate-disclosure", "/privacy-policy"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/blogs" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const blogRoutes = getAllBlogs().map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
