const roomKits = [
  {
    title: "Cozy Reading Nook",
    price: "$167",
    items: "7 pieces",
    vibe: "Warm · Inviting",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Soft Girl Bedroom",
    price: "$189",
    items: "8 pieces",
    vibe: "Soft · Dreamy",
    image:
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Desk Setup Under $200",
    price: "$142",
    items: "6 pieces",
    vibe: "Functional · Aesthetic",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
  },
];

const products = [
  {
    title: "Textured Ceramic Vase",
    store: "Amazon",
    price: "$19.99",
    badge: "Editor's Pick",
    note: "Pinterest favorite",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mushroom Table Lamp",
    store: "Amazon",
    price: "$26.99",
    badge: "Best Value",
    note: "Soft cozy glow",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Wavy LED Mirror",
    store: "AliExpress",
    price: "$59.99",
    badge: "Hot",
    note: "So aesthetic",
    image:
      "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rattan Storage Basket",
    store: "Amazon",
    price: "$26.99",
    badge: "Popular",
    note: "Great quality",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80",
  },
];

const moreIdeas = [
  "Cottagecore Bedroom",
  "Minimal Desk Setup",
  "Cozy Living Room",
  "Boho Balcony",
  "Dark Academia Office",
];

export default function Home() {
  return (
    <main className="site">
      <header className="header">
        <a href="/" className="brand">
          <div className="brandIcon">⌂</div>
          <span>NookVibeFinds</span>
        </a>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="#room-kits">Room Kits</a>
          <a href="#shop-room">Shop by Room</a>
          <a href="#under-200">Under $200</a>
          <a href="#aesthetic">Aesthetic Vibes</a>
        </nav>

        <div className="headerActions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Wishlist">♡</button>
          <button aria-label="Bag">♧</button>
        </div>
      </header>

      <section className="hero">
        <div className="heroImage heroLeft" />
        <div className="heroContent">
          <p className="eyebrow">Curated decor. Cozy spaces. Effortless you.</p>
          <h1>Find Your Perfect Nook</h1>
          <p className="heroText">
            Handpicked decor finds, room kits, and budget-friendly pieces to turn
            any space into your favorite place.
          </p>

          <div className="searchBox">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search for decor, room kits, styles..."
              aria-label="Search decor"
            />
            <button>Search</button>
          </div>

          <div className="tags">
            <span>Trending searches:</span>
            <button>Cozy Bedroom</button>
            <button>Desk Setup</button>
            <button>Living Room</button>
            <button>Room Decor</button>
          </div>
        </div>
        <div className="heroImage heroRight" />
      </section>

      <section className="trending">
        <div className="sectionTitle small">
          <span>🔥</span>
          <h2>Trending Now</h2>
        </div>

        <div className="trendItems">
          <div>
            <strong>Mushroom Lamp</strong>
            <span>Amazon · $26.99</span>
          </div>
          <div>
            <strong>Bouclé Accent Chair</strong>
            <span>Amazon · $149.99</span>
          </div>
          <div>
            <strong>Rattan Shelf</strong>
            <span>AliExpress · $48.35</span>
          </div>
          <div>
            <strong>Wavy LED Mirror</strong>
            <span>Amazon · $59.99</span>
          </div>
        </div>

        <button className="outlineBtn">Shop All Trending →</button>
      </section>

      <section className="filters" id="shop-room">
        <div className="filterRow">
          <strong>⌂ Shop by Room</strong>
          <button>Living Room</button>
          <button>Bedroom</button>
          <button>Office / Desk</button>
          <button>Kitchen</button>
          <button>Bathroom</button>
          <button>Balcony</button>
        </div>

        <div className="filterRow" id="under-200">
          <strong>◇ Shop by Budget</strong>
          <button>Under $25</button>
          <button>Under $50</button>
          <button>Under $100</button>
          <button>Under $200</button>
        </div>

        <div className="filterRow" id="aesthetic">
          <strong>✧ Shop by Aesthetic</strong>
          <button>Cozy</button>
          <button>Cottagecore</button>
          <button>Dark Academia</button>
          <button>Botanical</button>
          <button>Minimal</button>
          <button>Coastal</button>
        </div>
      </section>

      <section id="room-kits" className="contentBlock">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Shop the whole look</p>
            <h2>Shop the Vibe</h2>
          </div>
          <a href="/under-200-room-makeover">View all Room Kits →</a>
        </div>

        <div className="kitGrid">
          {roomKits.map((kit) => (
            <article className="kitCard" key={kit.title}>
              <img src={kit.image} alt={kit.title} />
              <div className="kitBody">
                <div>
                  <h3>{kit.title}</h3>
                  <p>
                    {kit.items} · {kit.vibe}
                  </p>
                </div>
                <strong>{kit.price}</strong>
              </div>

              <div className="miniProducts">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <button className="primaryBtn">Shop This Kit →</button>
            </article>
          ))}
        </div>
      </section>

      <section className="contentBlock">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Curated affiliate finds</p>
            <h2>Curated Finds You’ll Love</h2>
          </div>
          <a href="/room-decoration-ideas">See more finds →</a>
        </div>

        <div className="productGrid" id="products">
          {products.map((product) => (
            <article className="productCard" key={product.title}>
              <div className="badge">{product.badge}</div>
              <img src={product.image} alt={product.title} />
              <div className="productBody">
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.store}</p>
                </div>
                <button aria-label="Save product">♡</button>
              </div>

              <div className="priceRow">
                <strong>{product.price}</strong>
                <span>★★★★★ {product.note}</span>
              </div>

              <button className="secondaryBtn">Get This</button>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletterImage" />
        <div>
          <p className="eyebrow">Weekly cozy finds</p>
          <h2>Get 10 Aesthetic Finds Every Friday</h2>
          <p>
            Join cozy decor lovers and get room inspo, trending finds, and
            budget-friendly picks straight to your inbox.
          </p>
        </div>

        <form className="newsletterForm">
          <input type="email" placeholder="Your email address" aria-label="Email address" />
          <button type="button">Yes, I’m In! ✨</button>
          <small>No spam, just cozy finds. Unsubscribe anytime.</small>
        </form>
      </section>

      <section className="moreLike">
        <div className="sectionHeader">
          <h2>More Like This ♡</h2>
          <a href="/room-decoration-ideas">More inspiration →</a>
        </div>

        <div className="ideaScroller" id="ideas">
          {moreIdeas.map((idea) => (
            <div className="ideaCard" key={idea}>
              <span>{idea}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>♡ Curated with love</span>
        <span>NookVibeFinds</span>
        <a href="/affiliate-disclosure">Affiliate Disclosure</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <span>Contact Us</span>
      </footer>
    </main>
  );
}
