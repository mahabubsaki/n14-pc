'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const UserStatistic = ({ users }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    return (
        <div ref={ref} className='px-4 py-10 rounded-xl border-[3px] grid grid-cols-4 border-secondarys-700'>
            <div className='flex flex-col gap-3 items-center'>
                <div className='text-4xl font-bold'>
                    {inView ? <CountUp end={users.admins} start={0} duration={users.admins * 0.7} /> : <p>0</p>}
                </div>
                <p className='text-lg'>Admins</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <div className='text-4xl font-bold'>
                    {inView ? <CountUp end={users.premiumUsers} start={0} duration={users.premiumUsers * 0.7} /> : <p>0</p>}
                </div>
                <p className='text-lg'>Premium Users</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <div className='text-4xl font-bold'>
                    {inView ? <CountUp end={users.totalUsers} start={0} duration={users.totalUsers * 0.7} /> : <p>0</p>}
                </div>
                <p className='text-lg'>Total Users</p>
            </div>

            <div className='flex flex-col gap-3 items-center'>
                <div className='text-4xl font-bold'>
                    {inView ? <CountUp end={users.publishers} start={0} duration={users.publishers * 0.7} /> : <p>0</p>}
                </div>
                <p className='text-lg'>Total Publishers</p>
            </div>
        </div>
    );
};

export default UserStatistic;