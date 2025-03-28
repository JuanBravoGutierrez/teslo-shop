import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";

// MAYBE: Lo siguiente deberá ser modificado según https://authjs.dev/reference/nextjs/react
// es decir, la nueva versión de next-auth
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Gersa | PDV",
    default: "Home - Gersa | PDV",
  },
  description: "PDV de y para Gersa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // MAYBE:  En lugar del componente del provider ver como se encapsula
  // para tener la seguridad de la sesión
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}