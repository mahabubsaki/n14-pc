"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";



export default function ThemeProviders({ children, ...props }) {
    const { theme, systemTheme } = useTheme();
    const dark = theme === 'dark' || (systemTheme === 'dark' && theme === 'system');
    return <>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
        <Toaster position='top-right' richColors expand duration={3000} invert={dark} />
    </>;
}