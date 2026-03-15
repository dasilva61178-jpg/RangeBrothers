

import "./globals.css";
import Navbar from "./Navbar";
import { CartProvider } from "./context/cartcontext";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "RangeBrothers",
  description: "Premium Smartphones Delivered Across Malawi",
  verification: {
    google: "njTTlQcxkG4k0CwdnkMzsz20jZk-bWA0sX6VPVG4jEk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </CartProvider>
      </body>
    </html>
  );
}