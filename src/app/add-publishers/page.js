import envConfig from '@/configs/env.configs';
import dbConnect from '@/db';
import Publisher from '@/modules/publishers/publishers.model';
import User from '@/modules/users/users.model';
import PublisherForm from '@/pagesx/AddPublisher/PublisherForm';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const AddPublisher = async () => {


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