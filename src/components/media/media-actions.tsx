'use client';

import { Button } from '@/components/ui/button';
import {
    Bookmark,
    Clapperboard,
    Eye,
    EyeOff,
    Heart,
    List,
    Play,
    SquarePen,
} from 'lucide-react';
import { MediaActions as MediaActionsInterface } from '@/types/global-interfaces';
import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
    showVideo: boolean;
}

export default function MediaActions({ showVideo }: Props) {
    const [mediaActions, setMediaActions] = useState<MediaActionsInterface>({
        showVideo: showVideo,
        isFavorite: true,
        isWatchlist: false,
        isWatched: true,
        isTheatreWatched: false,
        list: null,
        comment: null,
    });

    return (
        <div className="flex gap-1 items-center mt-5">
            {mediaActions.showVideo && (
                <Button variant={'ghost'} className="cursor-pointer">
                    <Play />
                    <span className="text-foreground">Run Trailer</span>
                </Button>
            )}
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className="cursor-pointer"
                            onClick={() =>
                                setMediaActions((prev) => ({
                                    ...prev,
                                    isFavorite: !prev.isFavorite,
                                }))
                            }
                        >
                            {mediaActions.isFavorite ? (
                                <Heart fill="currentColor" />
                            ) : (
                                <Heart />
                            )}
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>
                        {mediaActions.isFavorite ? 'Remove' : 'Add'} it from
                        your favorites
                    </p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className="cursor-pointer"
                            onClick={() =>
                                setMediaActions((prev) => ({
                                    ...prev,
                                    isWatchlist: !prev.isWatchlist,
                                }))
                            }
                        >
                            {mediaActions.isWatchlist ? (
                                <Bookmark fill="currentColor" />
                            ) : (
                                <Bookmark />
                            )}
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>
                        {mediaActions.isWatchlist ? 'Remove' : 'Add'} it from
                        your watchlist
                    </p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className="cursor-pointer"
                            onClick={() =>
                                setMediaActions((prev) => ({
                                    ...prev,
                                    isWatched: !prev.isWatched,
                                }))
                            }
                        >
                            {mediaActions.isWatched ? <Eye /> : <EyeOff />}
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>
                        {mediaActions.isWatched ? 'Remove' : 'Add'} it from your
                        watched list
                    </p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className="cursor-pointer"
                            onClick={() =>
                                setMediaActions((prev) => ({
                                    ...prev,
                                    isTheatreWatched: !prev.isTheatreWatched,
                                }))
                            }
                        >
                            {mediaActions.isTheatreWatched ? (
                                <Clapperboard fill="currentColor" />
                            ) : (
                                <Clapperboard />
                            )}
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>
                        {mediaActions.isTheatreWatched ? 'Remove' : 'Add'} it
                        from your theatre watched list
                    </p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className="cursor-pointer"
                        >
                            <List />
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>Add it to one of your list</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            size={'icon'}
                            variant={'outline'}
                            className="cursor-pointer"
                        >
                            <SquarePen />
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>Write a comment about it</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
