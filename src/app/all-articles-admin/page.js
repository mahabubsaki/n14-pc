import User from '@/modules/users/users.model';
import AdminAllArticleWrapper from '@/wrappers/AdminAllArticle/AdminAllArticleWrapper';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import envConfig from '@/configs/env.configs';

const AllArticlesAdmin = async () => {
    const headerList = headers();
    const currentPath = headerList.get('referer')?.split(envConfig.baseUrl)[1];
    const session = await getServerSession();
    if (!session?.user) {
        return redirect(`/login?redirect=${currentPath}`);
    }
    const role = (await User?.findOne({ email: session?.user?.email }))?.role === 'admin';

    if (!role) {
        return redirect('/');
    }
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