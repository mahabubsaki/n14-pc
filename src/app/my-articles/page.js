import MyArticlesWrapper from '@/wrappers/MyArticles/MyArticlesWrapper';
import React, { Suspense } from 'react';


export const metadata = {
    title: 'My Articles | News24',
    description: 'Explore and manage your authored articles on News24',
};
const MyArticles = async () => {

    return (
        <div>
            <div className="mb-10">
                <h1 className='text-3xl text-center font-bold '>My Articles</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[100px]"></span>
            </div>
            <Suspense fallback={<p>Loading</p>}>
                <MyArticlesWrapper />
            </Suspense>

        </div>
    );
};

export default MyArticles;