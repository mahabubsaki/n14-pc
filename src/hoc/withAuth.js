'use client';

import { useRouter } from 'next/router';
import React from 'react';

const WithAuth = ({ children }) => {
    const router = useRouter();
    const x = undefined;
    if (!x) {
        return router.push('/');
    }
    return children;
};

export default WithAuth;