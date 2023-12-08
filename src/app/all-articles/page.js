import AllArticleWrapper from '@/wrappers/AllArticle/AllArticleWrapper';
import React, { Suspense } from 'react';

const AllArticles = async ({ searchParams }) => {
    return (
        <div className="mb-6">
            <div className="mb-10">
                <h1 className='text-3xl text-center font-bold '>All Articles</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[120px]"></span>
            </div>

            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <AllArticleWrapper searchParams={searchParams} />
                </Suspense>
            </div>

        </div>
    );
};

export default AllArticles;