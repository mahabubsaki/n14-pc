import envConfig from '@/configs/env.configs';
import MyArticlesWrapper from '@/wrappers/MyArticles/MyArticlesWrapper';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';


export const metadata = {
    title: 'My Articles | News24',
    description: 'Explore and manage your authored articles on News24',
};
const MyArticles = async () => {

    const session = await getServerSession();

    const headerList = headers();
    const currentPath = headerList.get('referer')?.split(envConfig.baseUrl)[1];

    if (!session?.user) {
        return redirect(`/login?redirect=${currentPath}`);
    }

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