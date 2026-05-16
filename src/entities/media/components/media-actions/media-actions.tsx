'use client';

import { useState } from 'react';
import { Bookmark, Clapperboard, Eye, EyeOff, Heart, List } from 'lucide-react';

import type { MediaActionsState } from '../../media.types';
import MediaActionButton from './media-action-button';
import MediaVideo from '../media-video';
import MediaActionComment from './media-action-comment';

type Props = {
    initialActions: MediaActionsState;
    onSaveComment: (comment: string | null) => void;
};

export default function MediaActions({ initialActions, onSaveComment }: Props) {
    const [actions, setActions] = useState(initialActions);

    function toggleAction(key: keyof MediaActionsState) {
        setActions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    }

    return (
        <div className="mt-5 flex items-center gap-1">
            {actions.video && <MediaVideo video={actions.video} />}

            <MediaActionButton
                label={`${actions.isFavorite ? 'Remove' : 'Add'} it from your favorites`}
                onClick={() => toggleAction('isFavorite')}
                icon={
                    actions.isFavorite ? (
                        <Heart fill="currentColor" />
                    ) : (
                        <Heart />
                    )
                }
            />

            <MediaActionButton
                label={`${actions.isWatchlist ? 'Remove' : 'Add'} it from your watchlist`}
                onClick={() => toggleAction('isWatchlist')}
                icon={
                    actions.isWatchlist ? (
                        <Bookmark fill="currentColor" />
                    ) : (
                        <Bookmark />
                    )
                }
            />

            <MediaActionButton
                label={`${actions.isWatched ? 'Remove' : 'Add'} it from your watched list`}
                onClick={() => toggleAction('isWatched')}
                icon={actions.isWatched ? <Eye /> : <EyeOff />}
            />

            <MediaActionButton
                label={`${actions.isTheatreWatched ? 'Remove' : 'Add'} it from your theatre watched list`}
                onClick={() => toggleAction('isTheatreWatched')}
                icon={
                    actions.isTheatreWatched ? (
                        <Clapperboard fill="currentColor" />
                    ) : (
                        <Clapperboard />
                    )
                }
            />

            <MediaActionButton
                label="Add it to one of your lists"
                icon={<List />}
            />

            <MediaActionComment
                comment={actions.comment}
                onSaveComment={(comment) => {
                    setActions((prev) => ({
                        ...prev,
                        comment,
                    }));
                    onSaveComment(comment);
                }}
            />
        </div>
    );
}
