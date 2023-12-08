import { Button } from '@/components/ui/button';
import ToolTip from '@/shared/ToolTip';
import Link from 'next/link';
import React from 'react';

const Plans = ({ subscription = false, alreadyTaken }) => {
    return (
        <section className="py-5 ">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap items-stretch -mx-4">
                    <div className="flex w-full mb-8 sm:px-4 md:w-1/2  lg:w-1/3 lg:mb-0">
                        <div className="flex flex-grow flex-col p-6 space-y-6 bg-opacity-10 rounded shadow-xl border sm:p-8 ">
                            <div className="space-y-2">

                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold dark:text-slate-300 text-slate-600">Silver</h4>
                                    <span className="text-6xl font-bold">$5
                                        <span className="text-sm tracki">/month</span>
                                    </span>
                                </div>
                            </div>
                            <p className="mt-3 leadi ">Basic starter pack for you. It is kind of a starter point</p>
                            <ul className="flex-1 mb-6 ">
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Read Premium Article</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Maximum 5 posts a day</span>
                                </li>
                                <li className="flex mb-2 space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Can perticipate on polling</span>
                                </li>
                            </ul>




                            {alreadyTaken ? <ToolTip title={'You have already taken subscription'}>
                                <Button className="w-full cursor-not-allowed">
                                    {subscription ? 'Checkout' : 'Get Started'}
                                </Button>
                            </ToolTip> : <Link href={'/checkout?package=silver'}>
                                <Button className="w-full">
                                    {subscription ? 'Checkout' : 'Get Started'}
                                </Button>
                            </Link>}
                        </div>
                    </div>
                    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                        <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-accents-500">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold text-accents-50">Gold</h4>
                                <span className="text-6xl font-bold">$24
                                    <span className="text-sm tracki">/month</span>
                                </span>
                            </div>
                            <p className="leadi">Most used by our users. Balanced previlage.Recommended for you</p>
                            <ul className="flex-1 space-y-2">
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Read Premium Article</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Maximum 50 posts a day</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Can perticipate on polling and make request for polling</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Can add publisher</span>
                                </li>


                            </ul>
                            {alreadyTaken ? <ToolTip title={'You have already taken subscription'}>
                                <Button variant='outline' className="w-full cursor-not-allowed">
                                    {subscription ? 'Checkout' : 'Get Started'}
                                </Button>
                            </ToolTip> : <Link href={'/checkout?package=gold'}>
                                <Button variant='outline' className="w-full">
                                    {subscription ? 'Checkout' : 'Get Started'}
                                </Button>
                            </Link>}
                        </div>
                    </div>
                    <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                        <div className="flex flex-grow flex-col p-6 space-y-6 bg-opacity-10 rounded shadow-xl border sm:p-8 ">
                            <div className="space-y-2">
                                <h4 className="text-2xl font-bold dark:text-indigo-400 text-indigo-800">Daimond</h4>
                                <span className="text-6xl font-bold">$72
                                    <span className="text-sm tracki">/month</span>
                                </span>
                            </div>
                            <p className="leadi">Embrace the knowledged with this subscription. Evrything is unlimited for you</p>
                            <ul className="space-y-2 ">
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Read Premium Article</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Unlimited posts per day</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Can perticipate on polling and make request for polling</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Can add publisher</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>Posted article automitically converted to premium</span>
                                </li>
                            </ul>


                            {alreadyTaken ? <ToolTip title={'You have already taken subscription'}>
                                <Button className="w-full cursor-not-allowed">
                                    {subscription ? 'Checkout' : 'Get Started'}
                                </Button>
                            </ToolTip> : <Link href={'/checkout?package=daimond'} >
                                <Button className="w-full">
                                    {subscription ? 'Checkout' : 'Get Started'}
                                </Button>
                            </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Plans;