import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/ui/tooltip';
import { Button } from '@/shared/ui/button';

type Props = {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
};

export default function MediaActionButton({ label, icon, onClick }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={onClick}
                        aria-label={label}
                    >
                        {icon}
                    </Button>
                }
            />

            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}
