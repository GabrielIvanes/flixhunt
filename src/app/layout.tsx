import type { Metadata } from 'next';
import { Lexend, Montserrat, Rubik } from 'next/font/google';
import './globals.css';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import { TooltipProvider } from '@/shared/ui/tooltip';

const montserrat = Montserrat({
    variable: '--font-montserrat',
    weight: 'variable',
    subsets: ['latin'],
});

const rubik = Rubik({
    variable: '--font-rubik',
    weight: 'variable',
    subsets: ['latin'],
});

const lexend = Lexend({
    variable: '--font-lexend',
    weight: 'variable',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Flixhunt',
    description: 'Flixhunt | Gabriel Ivanes',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn('h-full', 'antialiased')}
            suppressHydrationWarning
        >
            <body
                className={`${lexend.className} ${rubik.className} ${montserrat.className} font-sans`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <div className="relative min-h-screen w-full">
                            <Header />
                            <main className="pt-30 min-h-screen">
                                {children}
                            </main>
                        </div>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
