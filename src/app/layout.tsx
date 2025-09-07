import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const ebGaramond = EB_Garamond({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "Church Community - Renaissance Fellowship",
    description:
        "A sacred space for our church community to connect, share, and grow together in faith",
    generator: "v0.app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${ebGaramond.variable}`}
            >
                <Suspense fallback={null}>{children}</Suspense>
                <Analytics />
            </body>
        </html>
    );
}
