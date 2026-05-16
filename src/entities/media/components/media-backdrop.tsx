import Image from 'next/image';

type Props = {
    src: string | null;
    alt: string;
    priority?: boolean;
};

export default function MediaBackdrop({ src, alt, priority = false }: Props) {
    return (
        <div className="fixed inset-0 -z-10 bg-background">
            {src && (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={'100vw'}
                    className="object-cover opacity-20 blur-xs"
                />
            )}
        </div>
    );
}
