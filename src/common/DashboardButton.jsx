'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';
const ROUTES = [
    { label: 'Engagement', href: '/engagement' },
    { label: 'Add Publishers', href: '/add-publishers' },
    { label: 'All Users', href: '/all-users' },
    { label: 'All Articles', href: '/all-articles-admin' },
];
const DashboardButton = () => {
    const path = usePathname();
    const closeRef = useRef();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Dashboard</Button>
            </SheetTrigger>
            <SheetContent>
                <div className='flex flex-col items-center'>

                    {ROUTES.map(i => <Link onClick={() => closeRef.current.click()} className={`py-1 px-2 ${path === i.href ? 'bg-accents-400 rounded text-foreground' : 'text-foreground hover:text-primarys-300'}`} href={i.href} key={i.label}>
                        {i.label}
                    </Link>)}
                </div>
                <SheetClose ref={closeRef} className='h-0 w-0'></SheetClose>
            </SheetContent>
        </Sheet>
    );
};

export default DashboardButton;