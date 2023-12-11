
import envConfig from '@/configs/env.configs';
import User from '@/modules/users/users.model';
import AllUsersWrapper from '@/wrappers/AllUsers/AllUsersWrapper';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const AllUsers = async () => {
    const session = await getServerSession();





    const headerList = headers();
    const currentPath = headerList.get('referer')?.split(envConfig.baseUrl)[1];

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
                <h1 className='text-3xl text-center font-bold '>All Users</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[100px]"></span>
            </div>
            <Suspense fallback={<p>Loading</p>}>
                <AllUsersWrapper />
            </Suspense>

        </div>
    );
};

export default AllUsers;