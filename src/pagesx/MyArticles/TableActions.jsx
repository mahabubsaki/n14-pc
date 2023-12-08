'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import Link from 'next/link';
import React, { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

const TableActions = ({ callback, id, reason, status }) => {
    const [ispending, startTransition] = useTransition();
    const [value, setValue] = useState("");
    const [dropdownClicked, setDropdownClicker] = useState("");
    const modalCloseRef = useRef();
    return (



        <>

            <TableCell>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button>
                                Options
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>

                            <DialogTrigger onClick={() => setDropdownClicker("delete")} className='w-full'>
                                <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                            </DialogTrigger>

                            <Link href={`/update-article/${id}`}>
                                <DropdownMenuItem className="cursor-pointer">Update</DropdownMenuItem></Link>
                            {status === 'rejected' ? <DialogTrigger onClick={() => setDropdownClicker("reason")} className='w-full'>
                                <DropdownMenuItem className="cursor-pointer">
                                    See Reason
                                </DropdownMenuItem>
                            </DialogTrigger> : null}
                            <Link href={`/all-articles/${id}`}>
                                <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>



                    {dropdownClicked === 'delete' ? <DialogContent  >
                        <DialogHeader>
                            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your article
                                and remove article data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-4'>
                            <Input onChange={(e) => setValue(e.target.value)} placeholder="Type YES to continue the deletion" />

                            <Button onClick={() => {
                                startTransition(async () => {
                                    toast.promise(callback(id), {
                                        success: (data) => {
                                            return data.message;
                                        },
                                        error: (err) => {
                                            return err.message;
                                        }, finally: () => {
                                            modalCloseRef.current.click();
                                        }
                                    });
                                });
                            }} variant="destructive" disabled={ispending || (value !== 'YES')}>
                                Yes
                            </Button>
                            <DialogClose className='w-0 h-0' ref={modalCloseRef}></DialogClose>

                        </div>
                    </DialogContent> : <DialogContent  >
                        <DialogHeader>
                            <DialogTitle>Article Rejection Reason</DialogTitle>
                            <DialogDescription>
                                {reason}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>}
                </Dialog>
            </TableCell>
        </>

    );
};

export default TableActions;