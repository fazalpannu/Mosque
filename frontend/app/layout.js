import "./globals.css";

export const metadata = {
  title: "Mosque Finder",
  description: "Search and manage mosques",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
