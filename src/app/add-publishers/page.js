import dbConnect from '@/db';
import Publisher from '@/modules/publishers/publishers.model';
import PublisherForm from '@/pages/AddPublisher/PublisherForm';
import { revalidatePath } from 'next/cache';
import React from 'react';

const AddPublisher = () => {
    async function addPublisher(values) {
        "use server";
        try {
            await dbConnect();
            await Publisher.create(values);
            revalidatePath('/');
            return { message: "Successfully added the publisher" };
        } catch (err) {

            throw new Error(err);
        }

    }
    return (
        <div>
            <h1 className='text-3xl text-center font-bold'>Add Publishers</h1>
            <PublisherForm callback={addPublisher} />
        </div>
    );
};

export default AddPublisher;