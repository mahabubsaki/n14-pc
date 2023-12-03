import Image from 'next/image';
import React from 'react';
import ModeToggler from './ModeToggler';
import NavItems from './NavItems';
import LogoutButton from './LogoutButton';
import Profile from './Profile';




const Navbar = () => {

    return (
        <nav className='bg-backgrounds-300 text-foreground-300 py-2 px-2 mb-8'>
            <section className='max-w-7xl mx-auto'>

                <div className='flex justify-between items-center '>
                    <div className='w-[128px] h-[64px]  relative'>
                        <Image className='w-full h-full' fill alt='Website-Logo' src={'/logo.png'} />
                    </div>

                    <NavItems />
                    <div className='flex items-center gap-4'>
                        <ModeToggler />
                        <LogoutButton />
                        <Profile />
                    </div>
                </div>
            </section>
        </nav>
    );
};

export default Navbar;