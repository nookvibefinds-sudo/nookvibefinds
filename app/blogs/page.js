import Link from "next/link";
import { getAllBlogs } from "../../lib/blogs";

export const metadata = {
  title: "Blogs | NookVibeFinds",
  description:
    "Cozy home decor blogs, Pinterest-inspired room ideas, and product finds for aesthetic spaces.",
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <main>
      <header className="simpleNavbar">
        <Link href="/" className="brandLogo" aria-label="NookVibeFinds home">
          <span>Nook</span>
          <span>Vibe</span>
          <span>Finds</span>
          <small aria-hidden="true">✦</small>
        </Link>

        <nav className="navLinks simpleNavLinks" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/blogs" className="active">Blogs</Link>
        </nav>
      </header>

      <section className="blogsArchiveHero">
        <p className="eyebrow dark">Blogs</p>
        <h1>Cozy room ideas you can actually recreate.</h1>
        <p>
          Pinterest-friendly decor guides with handpicked product links. No fixed prices shown, so you can always check the latest details directly on the store page.
        </p>
      </section>

      <section className="blogsArchiveGrid" aria-label="All blog posts">
        {blogs.map((blog) => (
          <article className="archiveBlogCard" key={blog.slug}>
            <Link href={`/blogs/${blog.slug}`} className="archiveBlogImage" aria-label={blog.title}>
              <img src={blog.image} alt="" loading="lazy" />
            </Link>

            <div className="archiveBlogContent">
              <span>{blog.category}</span>
              <h2>
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p>{blog.description}</p>
              <Link href={`/blogs/${blog.slug}`} className="readMoreLink">
                Read blog →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
