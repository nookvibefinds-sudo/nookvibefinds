import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function parseValue(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontmatter(source) {
  if (!source.startsWith("---")) {
    return { metadata: {}, content: source.trim() };
  }

  const end = source.indexOf("\n---", 3);

  if (end === -1) {
    return { metadata: {}, content: source.trim() };
  }

  const rawMetadata = source.slice(3, end).trim();
  const content = source.slice(end + 4).trim();
  const metadata = {};

  rawMetadata.split("\n").forEach((line) => {
    const index = line.indexOf(":");

    if (index === -1) return;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1);

    metadata[key] = parseValue(value);
  });

  return { metadata, content };
}

function calculateReadingTime(content) {
  const words = content.replace(/[^\w\s]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function getBlogSlugs() {
  ensureBlogDir();

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogBySlug(slug) {
  ensureBlogDir();

  const cleanSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(BLOG_DIR, `${cleanSlug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { metadata, content } = parseFrontmatter(raw);

  return {
    slug: metadata.slug || cleanSlug,
    title: metadata.title || cleanSlug.replace(/-/g, " "),
    description: metadata.description || "Cozy home decor ideas and product finds.",
    image: metadata.image || "/blogs/cozy-reading-nook/hero.png",
    date: metadata.date || new Date().toISOString().slice(0, 10),
    category: metadata.category || "Home Decor",
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function getAllBlogs() {
  return getBlogSlugs()
    .map((slug) => getBlogBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parseProductBlock(lines, startIndex) {
  const product = {
    title: "",
    image: "",
    href: "",
    button: "Check on AliExpress",
    text: "",
    points: [],
  };

  let index = startIndex + 1;

  while (index < lines.length && lines[index].trim() !== "::end") {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      product.points.push(trimmed.slice(2).trim());
    } else {
      const separator = trimmed.indexOf(":");

      if (separator !== -1) {
        const key = trimmed.slice(0, separator).trim();
        const value = trimmed.slice(separator + 1).trim();

        if (key in product) {
          product[key] = value;
        }
      }
    }

    index += 1;
  }

  return { product, nextIndex: index };
}

function renderInline(text) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      parts.push(
        <a key={`${match.index}-link`} href={match[2]} target="_blank" rel="nofollow sponsored noopener noreferrer">
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(<strong key={`${match.index}-strong`}>{match[3]}</strong>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function renderBlogContent(content) {
  const lines = content.split("\n");
  const nodes = [];
  let paragraph = [];
  let list = [];

  function flushParagraph() {
    if (paragraph.length === 0) return;

    const text = paragraph.join(" ").trim();
    nodes.push(<p key={`p-${nodes.length}`}>{renderInline(text)}</p>);
    paragraph = [];
  }

  function flushList() {
    if (list.length === 0) return;

    nodes.push(
      <ul key={`ul-${nodes.length}`}>
        {list.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed === "::product") {
      flushParagraph();
      flushList();
      const { product, nextIndex } = parseProductBlock(lines, index);
      nodes.push(<ProductCard key={`product-${nodes.length}`} product={product} />);
      index = nextIndex;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      nodes.push(<h2 key={`h2-${nodes.length}`}>{trimmed.slice(3)}</h2>);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      nodes.push(<h1 key={`h1-${nodes.length}`}>{trimmed.slice(2)}</h1>);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2).trim());
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return nodes;
}

function ProductCard({ product }) {
  return (
    <article className={`productFeatureCard${product.image ? "" : " noImage"}`}>
      {product.image ? (
        <div className="productFeatureImage">
          <img src={product.image} alt={product.title} loading="lazy" />
        </div>
      ) : null}

      <div className="productFeatureContent">
        <h3>{product.title}</h3>
        {product.text ? <p>{product.text}</p> : null}

        {product.points.length > 0 ? (
          <ul>
            {product.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}

        {product.href ? (
          <a className="productButton" href={product.href} target="_blank" rel="nofollow sponsored noopener noreferrer">
            {product.button || "Check on AliExpress"}
          </a>
        ) : null}
      </div>
    </article>
  );
}
