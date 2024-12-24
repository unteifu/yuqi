import "./global.css";
import "fumadocs-twoslash/twoslash.css";

import type { ReactNode } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Banner } from "fumadocs-ui/components/banner";
import { RootProvider } from "fumadocs-ui/provider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YuqiJS - REST API's made magical 🪄",
  description:
    "YuqiJS is the library to build Typesafe End-to-End REST API's with ease, reduce mistakes and increase productivity.",
  appleWebApp: {
    title: "YuqiJS",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{
            forcedTheme: "light",
          }}
        >
          <Banner className="bg-pink-50 text-pink-400">
            YuqiJS is in early development! Please use with caution. 🚧
          </Banner>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
