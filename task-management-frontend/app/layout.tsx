import Navbar from "@/components/Navbar";
import "@/styles/globals.css"; // Ensure global styles are imported

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children} {/* This renders the current page */}
      </body>
    </html>
  );
}
