
import AllUsersWrapper from '@/wrappers/AllUsers/AllUsersWrapper';
import React, { Suspense } from 'react';

const AllUsers = () => {
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