import dbConnect from '@/db';
import Premium from '@/modules/premiums/premiums.model';
import Plans from '@/pagesx/home/Plans';
import SubscriptionDropdown from '@/pagesx/subscription/SubscriptionDropdown';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';




export async function generateMetadata({ params }) {



    return {
        title: 'Subscription | News24',
        description: 'Unlock a world of premium benefits by subscribing to our service today. Enjoy an elevated experience tailored just for you, as our valued subscriber. From exclusive content and early access to exciting updates, to personalized offers and priority customer support, our subscription brings you a host of privileges designed to enhance your overall satisfaction. Join now and take advantage of a premium membership that goes beyond the ordinary, providing you with the best of what we have to offer. Elevate your experience – subscribe today!'
    };
}


const Subscription = async () => {
    const data = await getServerSession();
    await dbConnect();
    const alreadyTaken = !!(await Premium.findOne({ userEmail: data.user.email })) ? true : false;
    return (


        <div className='scroll-smooth'>
            <section className="overflow-hidden sm:grid sm:grid-cols-2">
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="text-2xl font-bold  md:text-3xl">
                            Take our subscription to enjoy premium benefits
                        </h2>

                        <p className=" opacity-50 my-4 ">
                            Unlock a world of premium benefits by subscribing to our service today. Enjoy an elevated experience tailored just for you, as our valued subscriber. From exclusive content and early access to exciting updates, to personalized offers and priority customer support, our subscription brings you a host of privileges designed to enhance your overall satisfaction. Join now and take advantage of a premium membership that goes beyond the ordinary, providing you with the best of what we have to offer. Elevate your experience – subscribe today!
                        </p>

                        <div className="mt-4 md:mt-8">
                            <Link
                                href="#payment-selection"

                                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Select Plan
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='relative'>
                    <Image fill src={'/payment-banner.png'} className='rounded-3xl' alt='payment-banner' />
                </div>
            </section>
            <section className='my-8'>
                <div className="mb-10">
                    <h1 className='text-3xl text-center font-bold '>Why Subscribe us?</h1>
                    <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[200px]"></span>
                </div>

                <div>
                    <strong className='text-2xl mb-4 block'>Stay Informed:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Receive regular updates and news about our products, services, or industry trends.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Stay informed about the latest developments and advancements.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Exclusive Content:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Gain access to exclusive content, special offers, or promotions available only to subscribers.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Enjoy early access to new features, products, or events.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Community Engagement:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Join a community of like-minded individuals who share common interests.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Participate in discussions, forums, or events tailored for subscribers.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Personalized Experience:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Receive personalized recommendations based on your preferences and usage patterns.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Tailor your experience to better suit your needs and interests.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Priority Support:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Benefit from priority customer support to address any issues or inquiries promptly.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Enjoy a higher level of assistance and responsiveness compared to non-subscribers.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Discounts and Savings:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Access exclusive discounts, special pricing, or bundled packages available only to subscribers.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Save money on purchases, subscriptions, or associated products and services.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Early Access to Features:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Be among the first to try out and experience new features or updates before they are made available to the general public.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Uninterrupted Service:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Ensure uninterrupted access to our services or products, even during high demand periods.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Guarantee a consistent and reliable user experience.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Customization Options:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Customize your account settings, preferences, or user interface to align with your preferences.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Help support the ongoing development and improvement of the services or products you enjoy.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <strong className='text-2xl mb-4 block'>Supporting the Platform:</strong>
                    <ul className="flex-1 mb-6 ">
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Contribute to the sustainability and growth of the platform by becoming a valued subscriber.</span>
                        </li>
                        <li className="flex mb-2 space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Enjoy a higher level of assistance and responsiveness compared to non-subscribers.</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section id='payment-selection' className='mt-10'>
                <Plans subscription alreadyTaken={alreadyTaken} />
            </section>
            {alreadyTaken ? null : <div>
                <SubscriptionDropdown />
            </div>}
        </div>
    );
};

export default Subscription;