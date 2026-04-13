import { CSSProperties } from 'react';

interface Props {
    text: string;
    classname?: string;
    style?: CSSProperties;
}

export function H1({ text, classname, style }: Props) {
    return (
        <h1
            className={`text-4xl font-extrabold text-foreground w-fit mb-2 ${classname}`}
            style={style}
        >
            {text}
        </h1>
    );
}

export function H2({ text, classname, style }: Props) {
    return (
        <h2
            className={`text-3xl font-semibold text-foreground w-fit mb-1 ${classname}`}
            style={style}
        >
            {text}
        </h2>
    );
}

export function H3({ text, classname, style }: Props) {
    return (
        <h3
            className={`text-2xl font-semibold text-foreground w-fit ${classname}`}
            style={style}
        >
            {text}
        </h3>
    );
}

export function H4({ text, classname, style }: Props) {
    return (
        <h4
            className={`text-xl font-semibold text-foreground w-fit ${classname}`}
            style={style}
        >
            {text}
        </h4>
    );
}

export function P({ text, classname, style }: Props) {
    return (
        <div className={`text-base text-foreground w-fit ${classname}`} style={style}>
            {text}
        </div>
    );
}

export function Lead({ text, classname, style }: Props) {
    return (
        <p
            className={`text-lg italic text-muted-foreground w-fit my-1 ${classname}`}
            style={style}
        >
            {text}
        </p>
    );
}

export function LinkP({ text, classname, style }: Props) {
    return (
        <p
            className={`text-base text-primary hover:text-accent-foreground active:text-muted-foreground w-fit cursor-pointer ${classname}`}
            style={style}
        >
            {text}
        </p>
    );
}

export function MutedP({ text, classname, style }: Props) {
    return (
        <p
            className={`text-sm text-muted-foreground w-fit h-fit ${classname}`}
            style={style}
        >
            {text}
        </p>
    );
}
