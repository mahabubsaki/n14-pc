"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";



export default function ThemeProviders({ children, ...props }) {

    return <>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
        <Toaster position='top-right' richColors expand duration={3000} />
    </>;
}