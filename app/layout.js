import "./globals.css";
import Navbar from "./Navbar";
import { CartProvider } from "./context/cartcontext";

export const metadata = {
  title: "RangeBrothers",
  description: "Premium Smartphones Delivered Across Malawi",

  verification: {
    google: "njTTlQcxkG4k0CwdnkMzsz20jZk-bWA0sX6VPVG4jEk",
  },
};
// update

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

