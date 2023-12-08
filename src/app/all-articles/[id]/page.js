import { AspectRatio } from '@/components/ui/aspect-ratio';
import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import { format } from 'date-fns';
import { Eye, Tags } from 'lucide-react';
import { Types } from 'mongoose';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';


export async function generateMetadata({ params }) {
    await dbConnect();
    const { title, description } = await Article.findById(Types.ObjectId.isValid(params.id) ? params.id : new Types.ObjectId()).select({ title: 1, _id: 0, description: 1 }) || {};
    if (!title) notFound();


    return {
        title: title + ' | News24',
        description: description
    };
}

const SingleArticle = async ({ params }) => {
    await dbConnect();
    await Article.findByIdAndUpdate(params.id, { $inc: { views: 1 } });
    const article = await Article.findById(params.id).populate("publisher", { _id: 0, name: 1, image: 1 }).populate("authorId", { username: 1, avatar: 1, _id: 0 });

    return (
        <div className='flex flex-col gap-4 mb-8'>
            <h1 className='text-3xl font-bold'>{article.title}</h1>
            <AspectRatio ratio={16 / 7} className="bg-muted rounded-md">
                <Image
                    src={article.image}
                    alt={'article-banner'}
                    fill
                    className="rounded-md object-cover"
                />
            </AspectRatio>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2 items-center'>
                        <p className='font-bold'>Author</p>
                        <div className='flex gap-2 items-center'>
                            <Image alt='author-image' src={article.authorId.avatar} width={50} height={50} />
                            <p className='text-sm opacity-70'>{article.authorId.username}</p>
                        </div>
                    </div>

                </div>
                <div className='flex flex-col gap-2 items-center'>
                    <p className='font-bold'>Publisher</p>
                    <div className='flex gap-2 items-center'>
                        <Image alt='author-image' src={article.publisher.image} width={70} height={30} />
                        <p className='text-sm opacity-70'>{article.publisher.name}</p>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <Eye />
                    <p>{article.views} Views</p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='flex items-center gap-1'>
                    <Tags /> <p>Tags :</p>
                </div>
                <div className='flex gap-2'>
                    {article?.tags?.map(i => <div className='bg-secondary py-1.5 px-2.5 rounded border-accents-800 text-sm' key={i}>{i}</div>)}
                </div>
            </div>
            <div className='text-sm text-primary'>
                Published on - {format(article.createdAt, 'PPpp')}
            </div>
            <div className='text-sm opacity-70 '>
                {article.description}
            </div>
        </div>
    );
};

export default SingleArticle;