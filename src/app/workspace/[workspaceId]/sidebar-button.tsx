import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface SideBarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive?: boolean;
}

export const SidebarButton = ({
    icon: Icon,
    label,
    isActive = false
}: SideBarButtonProps) => {
    return (
        <div className="flex flex-col mt-2.5 items-center justify-center gap-y-0.5 cursor-pointer group">
            <Button
                variant="ghost"
                className={cn(
                    "h-9 w-9 p-2 group-hover:bg-accent/20",
                    isActive && "bg-accent/20"
                )}
            >
                <Icon className="h-5 w-5 text-white group-hover:scale-110 transition-all" />
            </Button>
            <span className="text-xs text-white">
                {label}
            </span>
            
        </div>
    );
};