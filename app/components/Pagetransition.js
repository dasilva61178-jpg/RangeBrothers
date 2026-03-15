// ─────────────────────────────────────────────────────
// PAGE TRANSITION COMPONENT
// Create this file at: app/components/PageTransition.js
// Then wrap your layout children with it (see below)
// ─────────────────────────────────────────────────────

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────
// HOW TO USE IN app/layout.js:
//
// import PageTransition from "./components/PageTransition";
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <CartProvider>
//           <Navbar />
//           <PageTransition>
//             {children}
//           </PageTransition>
//         </CartProvider>
//       </body>
//     </html>
//   );
// }
// ─────────────────────────────────────────────────────