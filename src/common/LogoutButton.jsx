'use client';
import { Button } from '@/components/ui/button';
import ToolTip from '@/shared/ToolTip';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

const LogoutButton = () => {
    const { data } = useSession();
    return (
        data ? <ToolTip title={'Logout'}>
            <Button onClick={() => {
                toast.promise(signOut({ redirect: true }), {
                    loading: "Signing out...",
                    success: (_) => "Successfully logged out",
                    error: (_) => "Something went wrong",
                })
                    ;
            }} variant="destructive">  <LogOut className='text-foreground' size={20} /></Button>
        </ToolTip> : null

    );
};

export default LogoutButton;