import dbConnect from '@/db';
import Publisher from '@/modules/publishers/publishers.model';
import Publishers from '@/pages/home/Publishers';
import hydrateData from '@/utils/hydrateData';
import React from 'react';

const PublisherWrapper = async () => {
    await dbConnect();
    const publishers = await Publisher.find().select({ name: 1, image: 1 });
    const data = hydrateData(publishers);
    return (
        <div className='mb-16'>
            <Publishers publishers={data} />
        </div>
    );
};

export default PublisherWrapper;