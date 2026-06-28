import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug, getBlogSlugs, renderBlogContent } from "../../../lib/blogs";

const SITE_URL = "https://nookvibefinds.vercel.app";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | NookVibeFinds",
    };
  }

  const url = `${SITE_URL}/blogs/${blog.slug}`;

  return {
    title: `${blog.title} | NookVibeFinds`,
    description: blog.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url,
      type: "article",
      images: [{ url: blog.image }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  const relatedBlogs = getAllBlogs().filter((item) => item.slug !== blog.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.image,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Organization",
      name: "NookVibeFinds",
    },
    publisher: {
      "@type": "Organization",
      name: "NookVibeFinds",
    },
    mainEntityOfPage: `${SITE_URL}/blogs/${blog.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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

      <article className="blogPostPage">
        <Link href="/blogs" className="backToBlogs">← Back to blogs</Link>

        <header className="blogPostHeader">
          <p className="eyebrow dark">{blog.category}</p>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
          <div className="blogPostMeta">
            <span>{new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>{blog.readingTime} min read</span>
          </div>
        </header>

        <div className="blogHeroImage">
          <img src={blog.image} alt={blog.title} />
        </div>

        <section className="affiliateNotice">
          <strong>Affiliate note:</strong> This post contains affiliate links. If you buy through these links, NookVibeFinds may earn a small commission at no extra cost to you. Prices and availability can change on the seller website.
        </section>

        <section className="blogArticleContent">
          {renderBlogContent(blog.content)}
        </section>
      </article>

      {relatedBlogs.length > 0 ? (
        <section className="relatedBlogsSection">
          <p className="eyebrow dark">Related reads</p>
          <h2>More cozy ideas</h2>
          <div className="blogGrid">
            {relatedBlogs.map((item) => (
              <article className="blogCard" key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={`/blogs/${item.slug}`}>Open blog →</Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
