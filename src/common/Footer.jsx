import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <>
            <div className='bg-base-800'>
                <div className='max-w-7xl mx-auto py-5'>
                    <div className='grid grid-cols-5 text-sm'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='w-[128px] h-[75px]  relative'>
                                <Image className='w-full h-full' fill alt='Website-Logo' src={'/logo.png'} />
                            </div>
                            <h2 className='text-3xl font-bold'>News24</h2>

                        </div>
                        <div className='mt-3'>
                            <h3 className='text-lg font-semibold text-center mb-4'>News</h3>
                            <ul className='text-center'>
                                <li>
                                    Verification
                                </li>
                                <li>
                                    Authorize Policy
                                </li>
                            </ul>
                        </div>
                        <div className='mt-3'>
                            <h3 className='text-lg font-semibold text-center mb-4'>Company</h3>
                            <ul className='text-center'>
                                <li>
                                    Privacy
                                </li>
                                <li>
                                    Terms & Conditions
                                </li>
                            </ul>
                        </div>
                        <div className='mt-3'>
                            <h3 className='text-lg font-semibold text-center mb-4'>Pricing</h3>
                            <ul className='text-center'>
                                <li>
                                    Premium
                                </li>
                                <li>
                                    Payment
                                </li>
                            </ul>
                        </div>
                        <div>

                            <h2 className='text-lg mt-3 text-center mb-4'>SOCIAL MEDIA</h2>
                            <div className='flex gap-4 justify-center'>
                                <Facebook />
                                <Twitter />
                                <Instagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-backgrounds-300 text-foreground-300 py-5 text-center px-2 text-lg'>
                © 2024 Daily Pulse. All rights reserved.
            </div>
        </>

    );
};

export default Footer;