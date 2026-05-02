import type { Metadata } from 'next';
import { Lexend, Montserrat, Rubik } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import { TooltipProvider } from '@/components/ui/tooltip';

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
                className={`min-h-full flex flex-col ${lexend.className} ${rubik.className} ${montserrat.className} font-sans`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <Header />
                        {children}
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
