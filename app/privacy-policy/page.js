export const metadata = {
  title: "Privacy Policy | NookVibeFinds",
  description:
    "Privacy policy for NookVibeFinds, explaining how visitor information may be collected and used.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legalPage">
      <section className="legalCard">
        <p className="eyebrow">Policy</p>
        <h1>Privacy Policy</h1>

        <p>
          NookVibeFinds respects your privacy. This website is created to share
          home decor inspiration, room ideas, and curated product recommendations.
        </p>

        <p>
          We may collect basic non-personal information such as browser type,
          pages visited, referral source, and general usage data to understand
          how visitors use the website and improve the content.
        </p>

        <p>
          If you submit your email address through a newsletter form, your email
          may be used to send decor ideas, product finds, and website updates.
          You may unsubscribe at any time.
        </p>

        <p>
          This website may contain affiliate links to third-party websites such
          as Amazon, AliExpress, or other retailers. When you click those links,
          you are leaving NookVibeFinds and visiting the third-party website.
          Their own privacy policies and terms apply.
        </p>

        <p>
          We do not sell personal information. This policy may be updated as the
          website grows and more features are added.
        </p>
      </section>
    </main>
  );
}
