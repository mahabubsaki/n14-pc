import dbConnect from '@/db';
import Premium from '@/modules/premiums/premiums.model';
import User from '@/modules/users/users.model';
import { format } from 'date-fns';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react';

const Profile = async () => {
    const session = await getServerSession();

    await dbConnect();
    const premiumInfo = await Premium.findOne({ userEmail: session.user.email }).populate('userId', { _id: 0, avatar: 1, username: 1, role: 1, createdAt: 1 }).select({ _id: 0, createdAt: 1, expiresAt: 1, package: 1 }) || await User.findOne({ email: session.user.email }).select({ _id: 0, avatar: 1, username: 1, role: 1, createdAt: 1 });

    return (
        <div className="mb-10">
            <h1 className='text-3xl text-center font-bold '>My Profile</h1>
            <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[100px]"></span>
            <div className='grid grid-cols-2 mt-20'>
                <div>
                    <div className='w-1/2 aspect-video relative mx-auto'>
                        <Image alt='user-profile' fill src={premiumInfo?.userId?.avatar || premiumInfo?.avatar} />
                    </div>

                    <div className='text-center mt-4'>
                        <p>Email : <span className='font-bold'>{session.user.email}</span></p>
                        <p>Name : <span className='font-bold'>{premiumInfo?.userId?.username || premiumInfo?.username}</span></p>
                        <p>Role : <span className='font-bold'>{premiumInfo?.userId?.role || premiumInfo?.role}</span></p>
                        <p>Member Since : <span className='font-bold'>{premiumInfo?.userId?.createdAt ? format(premiumInfo?.userId?.createdAt, 'PPpp') : format(premiumInfo?.createdAt, 'PPpp')}</span></p>
                    </div>
                </div>
                <div >
                    <h2 className='text-center text-lg'>Premium membership info</h2>
                    {premiumInfo?.package ? <div className='h-full flex justify-center items-center'>
                        <ul className="flex-1 mb-6 ">
                            <li className="flex mb-2 space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span>You have <span className='italic font-semibold'>{premiumInfo.package}</span> membership access</span>
                            </li>
                            <li className="flex mb-2 space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span><span className='capitalize'>{premiumInfo.package}</span> Membership bought on {format(premiumInfo.createdAt, 'PPpp')}</span>

                            </li>
                            <li className="flex mb-2 space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                                <span><span className='capitalize'>{premiumInfo.package}</span> Membership expires on {format(premiumInfo.expiresAt, 'PPpp')}</span>

                            </li>
                        </ul>
                    </div> : <div className='h-full flex justify-center items-center'>
                        <p>You don&lsquo;t have any membership yet or membership expired</p>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;