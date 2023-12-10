import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';


const AdminTableActions = dynamic(() => import('@/pagesx/AdminAllArticles/AdminTableActions'), { ssr: false });
import ToolTip from '@/shared/ToolTip';
import { Check, XCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

const AdminAllArticleWrapper = async () => {
    await dbConnect();
    const allArticles = await Article.find({}).sort({ createdAt: -1 }).populate("publisher", { _id: 0, name: 1, image: 1 }).select({ title: 1, image: 1, views: 1, status: 1, reason: 1, isPremium: 1, deleted: 1 });
    const deleteArticle = async (id, doc, message) => {
        'use server';

        try {
            await dbConnect();
            await Article.findByIdAndUpdate(id, { $set: doc });
            revalidatePath("/all-articles-admin");
            return { message: message };
        } catch (err) {
            throw new Error(err);
        }
    };
    const permenentlyDelete = async (id) => {
        'use server';

        try {
            await dbConnect();
            await Article.findByIdAndDelete(id);
            revalidatePath("/all-articles-admin");
            return { message: "Successfully deleted article" };
        } catch (err) {
            throw new Error(err);
        }
    };
    return (
        <Table>
            <TableCaption>A list of all {allArticles.length} articles.</TableCaption>
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
                    <TableHead>Deleted</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {allArticles.map((i, index) => <TableRow key={i._id}>
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
                        {i.isPremium ?
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

                    <TableCell >
                        {i.deleted ?
                            <ToolTip title={'This article was Deleted'}>
                                <Check className='text-green-500 cursor-pointer' />
                            </ToolTip>
                            :
                            <ToolTip title={'This article was not Deleted'}>
                                <XCircle className='text-destructive cursor-pointer' /></ToolTip>}
                    </TableCell>
                    <AdminTableActions premium={i.isPremium} status={i.status} deleted={i.deleted} callback2={permenentlyDelete} callback={deleteArticle} id={JSON.parse(JSON.stringify(i._id))} />
                </TableRow>)}


            </TableBody>
        </Table>
    );
};

export default AdminAllArticleWrapper;