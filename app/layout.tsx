"use client";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Provider store={store}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
