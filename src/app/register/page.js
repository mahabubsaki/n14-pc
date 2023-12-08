


import dbConnect from '@/db';
import User from '@/modules/users/users.model';
import LoginRegisterForm from '@/pagesx/Login&Register/Form';

import passwordHasher from '@/utils/passwordHasher';
import { revalidatePath } from 'next/cache';
import React from 'react';

const Register = () => {
    async function register(values) {
        "use server";
        try {
            await dbConnect();

            values.hashedPassword = await passwordHasher(values.password);
            await User.create(values);
            revalidatePath("/");
            return { message: "Successfully Signed Up" };
        } catch (err) {

            throw new Error(err);
        }

    }
    return (
        <div className="min-h-[calc(100vh-200px)] flex justify-center flex-col items-center">
            <h2 className='text-3xl font-bold'>Register</h2>
            <LoginRegisterForm callback={register} type="register" fields={[
                { name: 'username', type: "text" },
                { name: 'email', type: "email" },
                { name: 'password', type: "password" },
                { name: 'avatar', type: "file" },
            ]} />
        </div>
    );
};

export default Register;