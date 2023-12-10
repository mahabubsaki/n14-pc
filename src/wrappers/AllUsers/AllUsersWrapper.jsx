import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dbConnect from '@/db';
import User from '@/modules/users/users.model';
import MakeAdminButton from '@/pagesx/AllUser/MakeAdminButton';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import React from 'react';

const AllUsersWrapper = async () => {
    await dbConnect();
    const allUsers = await User.find({}).select({ email: 1, avatar: 1, role: 1, username: 1, createdAt: 1 });
    const updateRole = async (id) => {
        'use server';
        await dbConnect();
        try {
            await User.findByIdAndUpdate(id, { $set: { role: 'admin' } });
            revalidatePath('/all-users');
            return { message: "Successfully made the user to admin" };
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <Table>
            <TableCaption>A list of all {allUsers.length} users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Member Since</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Button</TableHead>

                </TableRow>
            </TableHeader>

            <TableBody>

                {allUsers.map((i, index) => <TableRow key={i._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{i.email}</TableCell>


                    <TableCell>
                        <Image alt='article-banner' src={i.avatar} width={50} height={20} />
                    </TableCell>
                    <TableCell className="font-medium">{i.username}</TableCell>
                    <TableCell className="font-medium">{format(new Date(i.createdAt), 'P')}</TableCell>
                    <TableCell className="font-medium">{i.role}</TableCell>
                    {i.role === 'user' ? <TableCell className="font-medium">
                        <MakeAdminButton id={JSON.parse(JSON.stringify(i._id))} callback={updateRole} />
                    </TableCell> : null}
                </TableRow>)}


            </TableBody>
        </Table>
    );
};

export default AllUsersWrapper;