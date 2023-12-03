import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

const ToolTip = ({ children, title }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ToolTip;