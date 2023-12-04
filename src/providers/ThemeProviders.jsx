"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import useDetectTheme from "@/hooks/useDetectTheme";



export default function ThemeProviders({ children, ...props }) {
    const dark = useDetectTheme();
    return <>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
        <Toaster position='top-right' richColors expand duration={3000} invert={dark} />
    </>;
}