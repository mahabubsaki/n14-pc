'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ToolTip from '@/shared/ToolTip';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React from 'react';

const Profile = () => {
    const { data } = useSession();
    const router = useRouter();
    return (
        data ? <ToolTip title={data?.user?.name || data?.user?.username}>
            <Avatar onClick={() => router.push('/profile')} className="cursor-pointer">
                <AvatarImage src={data?.user?.image || data?.user?.avatar || "./download.png"} alt="user-profile" />
                <AvatarFallback>{data?.user?.name?.[0] || data?.user?.username?.[0] || "A"}</AvatarFallback>
            </Avatar>
        </ToolTip> : null
    );
};

export default Profile;