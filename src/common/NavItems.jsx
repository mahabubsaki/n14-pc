'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';




const ROUTES = [
    { label: 'Home', href: '/', common: true },
    { label: 'All Articles', href: '/all-articles', common: true },
    { label: 'Add Articles', href: '/add-articles', common: true },
    { label: 'My Articles', href: '/my-articles', private: true },
    { label: 'Subscription', href: '/subscription', private: true },
    { label: 'Premium Articles', href: '/premium-articles', private: true },
    { label: 'Login', href: '/login', unathenticated: true },
    { label: 'Register', href: '/register', unathenticated: true },
];
const NavItems = () => {
    const { data } = useSession();
    console.log({ data });
    return (
        <div className='flex justify-center items-center gap-4 '>
            {ROUTES.map(i => {
                if (i.common) {
                    return <Link className='hover:text-secondary-500' href={i.href} key={i.label}>
                        {i.label}
                    </Link>;
                } else if (i.private && data) {
                    return <Link className='hover:text-secondary-500' href={i.href} key={i.label}>
                        {i.label}
                    </Link>;
                } else if (i.unathenticated && !data) {
                    return <Link className='hover:text-secondary-500' href={i.href} key={i.label}>
                        {i.label}
                    </Link>;
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default NavItems;