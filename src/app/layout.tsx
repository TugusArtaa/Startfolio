import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "StartFolio",
  description: "A modern portfolio starter built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="antialiased min-h-screen"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <div id="__next" className="flex flex-col min-h-screen">
          <ClientLayout>
            <main className="flex-1 container mx-auto">{children}</main>
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
