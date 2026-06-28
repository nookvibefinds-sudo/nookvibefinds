import Link from "next/link";
import { getAllBlogs } from "../lib/blogs";

const heroSlides = [
  { image: "/hero/hero-1.webp" },
  { image: "/hero/hero-2.webp" },
  { image: "/hero/hero-3.webp" },
  { image: "/hero/hero-4.webp" },
  { image: "/hero/hero-5.webp" },
  { image: "/hero/hero-6.webp" },
];

const trustItems = [
  {
    title: "Handpicked with love",
    icon: "heart",
  },
  {
    title: "Trusted stores",
    icon: "shield",
  },
  {
    title: "Budget-friendly ideas",
    icon: "tag",
  },
  {
    title: "For every cozy nook",
    icon: "home",
  },
];



function Icon({ type }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.5 2.9 8.7 7 10 4.1-1.3 7-5.5 7-10V6l-7-3Z" />
        <path d="m9.5 12 1.8 1.8 3.7-4" />
      </svg>
    );
  }

  if (type === "tag") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 13 13 20 4 11V4h7l9 9Z" />
        <path d="M8 8h.01" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export default function Home() {
  const blogCards = getAllBlogs().slice(0, 3);

  return (
    <main>
      <section className="hero" aria-label="NookVibeFinds hero">
        <div className="heroSlider" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              className="heroSlide"
              style={{
                backgroundImage: `url(${slide.image})`,
                animationDelay: `${index * 6}s`,
              }}
            />
          ))}
        </div>

        <header className="siteNavbar">
          <Link href="/" className="brandLogo" aria-label="NookVibeFinds home">
            <span>Nook</span>
            <span>Vibe</span>
            <span>Finds</span>
            <small aria-hidden="true">✦</small>
          </Link>

          <nav className="navLinks" aria-label="Main navigation">
            <a href="#home" className="active">Home</a>
            <Link href="/blogs">Blogs</Link>
          </nav>
        </header>

        <div id="home" className="heroContent">
          <p className="heroKicker"><span>✧</span> Your space, your vibe</p>

          <h1>
            <span>Best finds</span>
            <em>for every nook ♡</em>
          </h1>

          <p className="heroText">
            Handpicked decor, cozy lights and must-haves from Amazon and
            AliExpress to make <strong>your space</strong> feel like you.
          </p>

          <Link href="/blogs" className="heroButton">
            <span>Explore blogs</span>
            <span aria-hidden="true">→</span>
          </Link>

          <div className="trustGrid" aria-label="Store benefits">
            {trustItems.map((item) => (
              <div className="trustItem" key={item.title}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          <div className="storeStrip" aria-label="Trusted stores">
            <span>Amazon</span>
            <span>AliExpress</span>
          </div>

          <div className="heroNote">
            <strong>Small touches, big difference ✧</strong>
            <span>Make your space a vibe ♡</span>
          </div>
        </div>
      </section>

      <section id="blog" className="section blogSection">
        <div className="sectionTitleRow">
          <div>
            <p className="eyebrow dark">Blogs</p>
            <h2>Simple guides for Pinterest-friendly room ideas.</h2>
          </div>
        </div>

        <div className="blogGrid">
          {blogCards.map((blog) => (
            <article className="blogCard" key={blog.slug}>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <Link href={`/blogs/${blog.slug}`}>Open blog →</Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <Link href="/" className="brandLogo footerLogo" aria-label="NookVibeFinds home">
          <span>Nook</span>
          <span>Vibe</span>
          <span>Finds</span>
          <small aria-hidden="true">✦</small>
        </Link>
        <p>
          Cozy home decor ideas, budget room kits and product finds for
          Pinterest-inspired spaces.
        </p>
        <div>
          <a href="/affiliate-disclosure">Affiliate Disclosure</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </footer>
    </main>
  );
}
