
import { LoginRegisterForm } from '@/pages/Login&Register/Form';
import React from 'react';


const Login = () => {

    return (
        <div className="min-h-[calc(100vh-200px)] flex justify-center flex-col items-center">
            <h2 className='text-3xl font-bold'>Login</h2>
            <LoginRegisterForm fields={[
                { name: 'username', type: "text" },
                { name: 'password', type: "password" },
            ]} />
        </div>
    );
};

export default Login;