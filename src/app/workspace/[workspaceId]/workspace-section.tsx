import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Children } from "react";
import { FaCaretDown } from "react-icons/fa";
import  { useToggle } from "react-use";

interface WorkspaceSectionProps {
    children: React.ReactNode;
    label: string;
    hint: string;
    onNew?: () => void;
}

export const WorkspaceSection = ({
    children,
    label,
    hint,
    onNew
}: WorkspaceSectionProps ) => {
    const [on, toggle] = useToggle(true);

    return(
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button  
                    variant="transparent"
                    className="p-0.5 text-sm text-[#f9edffcc] shrink size-6"
                    onClick={toggle}
                >
                    <FaCaretDown className={cn("size-4 transition-transform", on && "-rotate-90")} />
                </Button>
                <Button
                    variant="transparent"
                    className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
                >
                    <span className="truncate">
                        {label}
                    </span>
                </Button>
                {onNew && (
                    <Button
                        onClick={onNew}
                        variant="transparent"
                        size="sm"
                        className="opacity group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc]  size-6 shrink-0"
                    >
                        <PlusIcon className="size-5" />
                    </Button>   
                )}
            </div>
            {on && children}
        </div>
    )
}