'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

const AdminTableActions = ({ callback, id, deleted, callback2, premium, status }) => {
    const [ispending, startTransition] = useTransition();
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [feedback, setFeedback] = useState("");
    const [dropdownClicked, setDropdownClicker] = useState("");
    const modalCloseRef = useRef();
    useEffect(() => {
        return () => {
            setValue('');
            setValue2('');
            setFeedback('');
            setDropdownClicker('');
        };
    }, []);
    return (
        <TableCell>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button>
                            Options
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        {deleted ?
                            <DropdownMenuItem onClick={() => {
                                startTransition(async () => {
                                    toast.promise(callback(id, { deleted: false }, 'Successfully restored the article'), {
                                        success: (data) => {
                                            return data.message;
                                        },
                                        loading: 'Resotring article...',
                                        error: (err) => {
                                            return err.message;
                                        },
                                    });
                                });
                            }} className="cursor-pointer">Restore</DropdownMenuItem>
                            : <DialogTrigger onClick={() => setDropdownClicker("delete")} className='w-full'>
                                <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
                            </DialogTrigger>}
                        <DialogTrigger onClick={() => setDropdownClicker("permenant")} className='w-full'>
                            <DropdownMenuItem className="cursor-pointer">Permenant Delete</DropdownMenuItem>
                        </DialogTrigger>
                        {premium ? <DropdownMenuItem onClick={() => {
                            startTransition(async () => {
                                toast.promise(callback(id, { isPremium: false }, 'Successfully removed the premium tag from article'), {
                                    success: (data) => {
                                        return data.message;
                                    },
                                    loading: 'Removing premium...',
                                    error: (err) => {
                                        return err.message;
                                    },
                                });
                            });
                        }} className="cursor-pointer">Remove Premium</DropdownMenuItem> : <DropdownMenuItem onClick={() => {
                            startTransition(async () => {
                                toast.promise(callback(id, { isPremium: true }, 'Successfully added the premium tag from article'), {
                                    success: (data) => {
                                        return data.message;
                                    },
                                    loading: 'Adding premium...',
                                    error: (err) => {
                                        return err.message;
                                    },
                                });
                            });
                        }} className="cursor-pointer">Make Premium</DropdownMenuItem>}
                        {status === 'pending' ? <>
                            <DropdownMenuItem onClick={() => {
                                startTransition(async () => {
                                    toast.promise(callback(id, { status: 'approved' }, 'Successfully approved the article'), {
                                        success: (data) => {
                                            return data.message;
                                        },
                                        loading: 'Approving article...',
                                        error: (err) => {
                                            return err.message;
                                        },
                                    });
                                });
                            }} className="cursor-pointer">Accept</DropdownMenuItem>


                            <DialogTrigger onClick={() => setDropdownClicker("reject")} className='w-full'>
                                <DropdownMenuItem className="cursor-pointer">Reject</DropdownMenuItem>
                            </DialogTrigger>

                        </> : null}
                        <Link href={`/update-article/${id}`}>
                            <DropdownMenuItem className="cursor-pointer">Update</DropdownMenuItem></Link>
                        <Link href={`/all-articles/${id}`}>
                            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>



                {dropdownClicked === 'delete' ? <DialogContent  >
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will delete your article
                            and remove article data from our servers. You can restore this later
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-4'>
                        <Input onChange={(e) => setValue(e.target.value)} placeholder="Type YES to continue the deletion" />

                        <Button onClick={() => {
                            startTransition(async () => {
                                toast.promise(callback(id, { deleted: true }, 'Successfully deleted the article'), {
                                    success: (data) => {
                                        return data.message;
                                    },
                                    loading: 'Deleting article...',
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
                </DialogContent> : dropdownClicked === 'reject' ? <DialogContent  >
                    <DialogHeader>
                        <DialogTitle>Rejection Reasion?</DialogTitle>
                        <DialogDescription>
                            Tell the rejection reason here. This feedback will reach its author, so that they can imporove their content and make a resubmit. (must be at least 10 chracters long)
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-4'>
                        <Textarea className="resize-none h-[200px]" onChange={(e) => setFeedback(e.target.value)} placeholder="Tell the rejection reason" />

                        <Button onClick={() => {
                            startTransition(async () => {
                                toast.promise(callback(id, { status: 'rejected', reason: feedback }, 'Successfully rejected the article'), {
                                    success: (data) => {
                                        return data.message;
                                    },
                                    loading: 'Rejecting article...',
                                    error: (err) => {
                                        return err.message;
                                    }, finally: () => {
                                        modalCloseRef?.current?.click();
                                    }
                                });
                            });
                        }} variant="destructive" disabled={ispending || (feedback.length < 10)}>
                            Yes
                        </Button>
                        <DialogClose className='w-0 h-0' ref={modalCloseRef}></DialogClose>

                    </div>
                </DialogContent> : <DialogContent  >
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your article
                            and remove article data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-4'>
                        <Input onChange={(e) => setValue2(e.target.value)} placeholder="Type YES,PERMENANT to continue the deletion" />

                        <Button onClick={() => {
                            startTransition(async () => {
                                toast.promise(callback2(id), {
                                    success: (data) => {
                                        return data.message;
                                    },
                                    loading: 'Permenantly deleting...',
                                    error: (err) => {
                                        return err.message;
                                    }, finally: () => {
                                        modalCloseRef?.current?.click();
                                    }
                                });
                            });
                        }} variant="destructive" disabled={ispending || (value2 !== 'YES')}>
                            Yes
                        </Button>
                        <DialogClose className='w-0 h-0' ref={modalCloseRef}></DialogClose>

                    </div>
                </DialogContent>}
            </Dialog>
        </TableCell>
    );
};

export default AdminTableActions;