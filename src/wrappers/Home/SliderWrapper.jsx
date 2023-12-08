import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import SliderArticle from '@/pagesx/home/SliderArticle';
import hydrateData from '@/utils/hydrateData';
import React from 'react';

const SliderWrapper = async () => {
    await dbConnect();
    const articles = await Article.find().sort({ views: -1 }).limit(6).select({ createdAt: 1, title: 1, image: 1, views: 1 }).populate('authorId', { username: 1, _id: 0, avatar: 1 });
    const data = hydrateData(articles);

    return (
        <div className='mb-16'>
            <SliderArticle articles={data} />
        </div>
    );
};

export default SliderWrapper;