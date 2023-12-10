
import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import ArticleCard from '@/pagesx/AllArticles/ArticleCard';
import React from 'react';

const PremiumArticles = async () => {
    await dbConnect();
    const articles = await Article.find({ isPremium: true, status: 'approved' }).populate("publisher", { name: 1, image: 1, _id: 0 }).select({ 'title': 1, 'image': 1, 'tags': 1, 'description': 1, 'views': 1, 'isPremium': 1 });

    return (
        <div>
            <div className="mb-10">
                <h1 className='text-3xl text-center font-bold '>Premium Articles</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[100px]"></span>
            </div>
            <div className='grid grid-cols-2 gap-4 pt-4'>
                {articles?.map(i => <ArticleCard article={i} key={i._id} />)}
            </div>

        </div>
    );
};

export default PremiumArticles;