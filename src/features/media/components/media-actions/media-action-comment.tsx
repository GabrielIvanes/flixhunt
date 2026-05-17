'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { SquarePen } from 'lucide-react';
import MediaActionButton from './media-action-button';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { useState } from 'react';

type Props = {
    comment: string | null;
    onSaveComment: (comment: string | null) => void;
};

export default function MediaActionComment({ comment, onSaveComment }: Props) {
    const [draftComment, setDraftComment] = useState(comment ?? '');
    const maxLength = 5000;

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <MediaActionButton
                        label="Write a comment about it"
                        icon={<SquarePen />}
                    />
                }
            />
            <DialogContent className="flex h-[50vh] max-h-[75vh] w-[90vw] max-w-3xl! flex-col">
                <DialogHeader>
                    <DialogTitle>Write a comment</DialogTitle>
                </DialogHeader>
                <div className="relative h-full w-full overflow-hidden rounded-(--radius)">
                    <Textarea
                        maxLength={maxLength}
                        placeholder="Type your comment here."
                        className="h-full min-h-0 resize-none overflow-y-auto"
                        value={draftComment}
                        onChange={(event) =>
                            setDraftComment(event.target.value)
                        }
                    />
                </div>
                <div className="text-right text-xs text-muted-foreground">
                    {draftComment.length} / {maxLength}
                </div>
                <DialogFooter>
                    <DialogClose
                        render={
                            <Button
                                className="cursor-pointer"
                                type="submit"
                                onClick={() =>
                                    onSaveComment(draftComment.trim() || null)
                                }
                            >
                                Save
                            </Button>
                        }
                    ></DialogClose>
                    <DialogClose
                        render={
                            <Button
                                className="cursor-pointer"
                                type="reset"
                                variant="destructive"
                                onClick={() => setDraftComment(comment ?? '')}
                            >
                                Cancel
                            </Button>
                        }
                    ></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
