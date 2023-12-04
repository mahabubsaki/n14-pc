'use client';
import Image from 'next/image';
import React from 'react';

const Publishers = ({ publishers }) => {

    return (
        <div className='flex flex-wrap justify-center gap-8'>
            {publishers.map(i => <div key={i._id} className='flex flex-col justify-center items-center gap-2'>
                <div className='relative w-[160px] h-[70px] rounded-md'>
                    <Image alt='publisher-image' src={i.image} fill className='rounded-md' />

                </div>
                <p className='text-sm'>{i.name}</p>
            </div>)}
        </div>
    );
};

export default Publishers;