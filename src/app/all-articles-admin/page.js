import AdminAllArticleWrapper from '@/wrappers/AdminAllArticle/AdminAllArticleWrapper';
import React, { Suspense } from 'react';

const AllArticlesAdmin = () => {
    return (
        <div>
            <div className="mb-10">
                <h1 className='text-3xl text-center font-bold '>All Articles</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[100px]"></span>
            </div>
            <Suspense fallback={<p>Loading</p>}>
                <AdminAllArticleWrapper />
            </Suspense>

        </div>
    );
};

export default AllArticlesAdmin;