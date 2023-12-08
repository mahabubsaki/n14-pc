import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import Publisher from '@/modules/publishers/publishers.model';
import ArticleForm from '@/pagesx/AddArticle/ArticleForm';
import hydrateData from '@/utils/hydrateData';
import { Types } from 'mongoose';
import { notFound } from 'next/navigation';
import React from 'react';



const UpdateArticle = async ({ params }) => {
    await dbConnect();
    const article = await Article.findById(Types.ObjectId.isValid(params.id) ? params.id : new Types.ObjectId()).select({ description: 1, title: 1, tags: 1, publisher: 1, image: 1 });
    if (!article) notFound();
    const publishers = await Publisher.find({}, { name: 1 });
    const data = hydrateData(publishers);
    const data2 = hydrateData(article);
    const updateArticle = async (values) => {
        'use server';
        const { articleId, ...rest } = values;
        try {
            await Article.findByIdAndUpdate(values.articleId, { $set: { ...rest } });
            return { message: "Updated the article successfully" };
        } catch (err) {
            throw new Error(err);
        }
    };
    return (
        <div>
            <div className="mb-10">
                <h1 className='text-3xl text-center font-bold '>Update article</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[150px]"></span>
            </div>
            <ArticleForm article={data2} publishers={data} callback={updateArticle} />
        </div>
    );
};

export default UpdateArticle;