import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider"
import {ModeToggle} from "@/components/toggle-mode";

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Flixhunt",
    description: "Flixhunt | Gabriel Ivanes",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
            suppressHydrationWarning
        >
        <body className="min-h-full flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ModeToggle />
            {children}
        </ThemeProvider></body>

        </html>
    );
}
