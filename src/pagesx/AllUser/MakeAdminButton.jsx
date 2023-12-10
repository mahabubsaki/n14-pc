'use client';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

const MakeAdminButton = ({ id, callback }) => {
    const [ispending, startTransition] = useTransition();
    return (
        <Button onClick={() => {

            startTransition(async () => {
                toast.promise(callback(id), {
                    success: (data) => {
                        return data.message;
                    },
                    loading: 'Making admin...',
                    error: (err) => {
                        return err.message;
                    },
                });

            });
        }} disabled={ispending}>Make Admin</Button>
    );
};

export default MakeAdminButton;