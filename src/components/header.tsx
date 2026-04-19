'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import Link from "next/link";
import React from "react";
import {ModeToggle} from "@/components/toggle-mode";
import {usePathname} from "next/navigation";

interface Link {
    href: string;
    name: string;
}

export default function Header() {

    const pathname = usePathname();

    const links: Link[] = [
        {
            href: "/movies",
            name: "Movies",
        },
        {
            href: "/tv-shows",
            name: "TV Shows",
        },
        {
            href: "/persons",
            name: "Persons",
        },
        {
            href: "/search",
            name: "Search",
        },
        {
            href: "/my-lists",
            name: "My Lists",
        }
    ];

    return (
        <div
            className="z-20 sticky top-5 mx-10 h-16 border border-border bg-card text-card-foreground rounded-(--radius) flex justify-between items-center px-3">
            <div className={`${pathname === "/" ? 'text-card-foreground' :  'text-muted-foreground'} hover:text-card-foreground text-2xl cursor-pointer transition-colors`}>
                <Link href="/">
                    Flixhunt
                </Link>
            </div>
            <div className="flex flex-1 justify-center gap-x-5 text-base">
                {links.map((link: Link, index: number) => (
                    <Link key={index} href={link.href} passHref className={`hover:text-card-foreground ${pathname.includes(link.href) ? 'text-card-foreground' : 'text-muted-foreground'} cursor-pointer transition-colors`}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="flex gap-x-2">
                <ModeToggle />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>Gi</AvatarFallback>
                </Avatar>
            </div>

        </div>
    );
}