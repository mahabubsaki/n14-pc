import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import Publisher from '@/modules/publishers/publishers.model';
import ArticleContainer from '@/pagesx/AllArticles/ArticleContainer';
import SearchFilterFields from '@/pagesx/AllArticles/SearchFilterFields';
import hydrateData from '@/utils/hydrateData';
import pickSearchParams from '@/utils/pickSearchParams';
import validateLimit from '@/utils/validateLimit';
import React from 'react';

const AllArticleWrapper = async ({ searchParams }) => {
    await dbConnect();
    const filterFields = pickSearchParams({ ...searchParams }, ['title', 'publisher', 'tags']);

    const limit = searchParams.limit ? validateLimit(+searchParams.limit, [5, 10, 15], 5) : 5;
    const newestFirst = searchParams.newest === "false" ? 1 : -1;

    const page = searchParams.page ? +searchParams.page - 1 : 0;
    const data = await Article.find({ ...filterFields, status: 'approved' }, null, {
        limit: limit,
        skip: page * limit,
        sort: {
            createdAt: newestFirst
        },
    }).populate("publisher", { name: 1, image: 1, _id: 0 }).select({ 'title': 1, 'image': 1, 'tags': 1, 'description': 1, 'views': 1, 'isPremium': 1 });
    const articles = hydrateData(data);
    const pages = new Array(Math.ceil(await Article.countDocuments({ ...filterFields, status: 'approved' }) / limit)).fill(1);

    const activePage = searchParams.page ? +searchParams.page : 1;

    const data2 = await Publisher.find({}, { name: 1 });
    const publishers = hydrateData(data2);

    return (
        <div>
            <div>
                <SearchFilterFields pages={pages} activePage={activePage} publishers={publishers} searchParams={searchParams} />
            </div>
            <div>
                <ArticleContainer articles={articles} />
            </div>
        </div>
    );
};

export default AllArticleWrapper;