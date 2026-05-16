import { Video } from '@/entities/video/video.types';
import { getYoutubeEmbedUrl } from '@/entities/video/video.utils';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { Play } from 'lucide-react';

type Props = {
    video: Video;
};

export default function MediaVideo({ video }: Props) {
    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button variant="ghost" className="cursor-pointer">
                        <Play />
                        <span>Run Trailer</span>
                    </Button>
                }
            />
            <DialogContent
                showCloseButton={false}
                className="w-[95vw]! max-w-7xl! p-0"
            >
                <div className="relative aspect-video w-full overflow-hidden rounded-(--radius) bg-black">
                    <iframe
                        src={getYoutubeEmbedUrl(video)}
                        title={video.name}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
