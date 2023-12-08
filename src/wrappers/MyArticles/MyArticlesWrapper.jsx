import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import TableActions from '@/pagesx/MyArticles/TableActions';
import ToolTip from '@/shared/ToolTip';

import { Check, XCircle } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import React from 'react';

const MyArticlesWrapper = async () => {
    await dbConnect();
    const user = await getServerSession();


    const myArticles = await Article.find({ authorEmail: user?.user?.email, deleted: false }).sort({ createdAt: -1 }).populate("publisher", { _id: 0, name: 1, image: 1 }).select({ title: 1, image: 1, views: 1, status: 1, reason: 1, isPremium: 1 });
    const deleteArticle = async (id) => {
        'use server';

        try {
            await dbConnect();
            await Article.findByIdAndUpdate(id, { $set: { deleted: true } });
            revalidatePath("/my-articles");
            return { message: "Successfully deleted article" };
        } catch (err) {
            throw new Error(err);
        }
    };
    return (
        <Table>
            <TableCaption>A list of your articles.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Banner</TableHead>
                    <TableHead>Publisher Name</TableHead>
                    <TableHead>Publisher Logo</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {myArticles.map((i, index) => <TableRow key={i._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                        {i.title}
                    </TableCell>
                    <TableCell>
                        <Image alt='article-banner' src={i.image} width={50} height={20} />
                    </TableCell>
                    <TableCell >
                        {i.publisher.name}
                    </TableCell>
                    <TableCell >
                        <Image alt='publisher-image' src={i.publisher.image} width={50} height={20} />
                    </TableCell>
                    <TableCell >
                        {i.views}
                    </TableCell>
                    <TableCell >
                        {i.premium ?
                            <ToolTip title={'Premium Article'}>
                                <Check className='text-green-500 cursor-pointer' />
                            </ToolTip>
                            :
                            <ToolTip title={'Not a premium Article'}>
                                <XCircle className='text-destructive cursor-pointer' /></ToolTip>}
                    </TableCell>
                    <TableCell >
                        {i.status}
                    </TableCell>
                    <TableActions status={i.status} reason={i.reason} callback={deleteArticle} id={JSON.parse(JSON.stringify(i._id))} />
                </TableRow>)}


            </TableBody>
        </Table>

    );
};

export default MyArticlesWrapper;