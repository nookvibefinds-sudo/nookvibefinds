import "./globals.css";

export const metadata = {
  title: "NookVibeFinds | Cozy Home Decor & Room Kits",
  description:
    "NookVibeFinds curates cozy home decor ideas, aesthetic room kits, budget room makeovers, and product finds for Pinterest-inspired spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
