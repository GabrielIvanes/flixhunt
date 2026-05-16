import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils';

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export function H1({ className, children, ...props }: HeadingProps) {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground',
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
}

export function H2({ className, children, ...props }: HeadingProps) {
    return (
        <h2
            className={cn(
                'scroll-m-20 text-3xl font-semibold tracking-tight text-foreground',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

export function H3({ className, children, ...props }: HeadingProps) {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-2xl font-semibold tracking-tight text-foreground',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

export function H4({ className, children, ...props }: HeadingProps) {
    return (
        <h4
            className={cn(
                'scroll-m-20 text-xl font-semibold tracking-tight text-foreground',
                className
            )}
            {...props}
        >
            {children}
        </h4>
    );
}

export function P({ className, children, ...props }: ParagraphProps) {
    return (
        <p
            className={cn('text-base leading-7 text-foreground', className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function Lead({ className, children, ...props }: ParagraphProps) {
    return (
        <p
            className={cn('text-lg leading-7 text-muted-foreground', className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function Muted({ className, children, ...props }: ParagraphProps) {
    return (
        <p
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function Small({ className, children, ...props }: ParagraphProps) {
    return (
        <p
            className={cn('text-sm font-medium leading-none', className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function Accent({ className, children, ...props }: ParagraphProps) {
    return (
        <p
            className={cn(
                'text-sm text-primary transition-colors duration-300 hover:text-accent-foreground',
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
}
