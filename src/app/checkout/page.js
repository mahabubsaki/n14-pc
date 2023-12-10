
import dbConnect from '@/db';
import Premium from '@/modules/premiums/premiums.model';
import User from '@/modules/users/users.model';
import CheckoutWrapper from '@/wrappers/Checkout/CheckoutWrapper';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const allPackages = [
    { key: "silver", img: "/silver-package.png", price: 5, benefits: ["Read Premium Article", "Maximum 5 posts a day", "Can perticipate on polling"] },
    { key: "gold", img: "/gold-package.png", price: 24, benefits: ["Read Premium Article", "Maximum 50 posts a day", "Can perticipate on polling and make request for polling", "Can add publisher"] },
    { key: "daimond", img: "/daimond-package.png", price: 72, benefits: ["Read Premium Article", "Unlimited posts a day", "Can perticipate on polling and create polling", "Can add publisher", "Posted article automitically converted to premium"] },
];




export const metadata = {
    title: 'Checkout | News24',
    description: 'Secure checkout page powered by Stripe for online payments.',
};

const Checkout = async ({ searchParams }) => {
    const data = await getServerSession();
    await dbConnect();
    const alreadyTaken = await Premium.findOne({ userEmail: data.user.email });
    if (alreadyTaken) {
        redirect('/');
    }
    if (!searchParams.package || !['gold', 'silver', 'daimond'].includes(searchParams.package)) {
        notFound();
    }
    const currentPackage = allPackages.find(i => i.key === searchParams.package);

    const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: currentPackage.price * 100,
        currency: 'usd',
        payment_method_types: ['card']

    });

    const addPaymentData = async (values) => {
        'use server';
        try {
            await dbConnect();
            const premium = await Premium.create(values);
            await User.findByIdAndUpdate(values.userId, {
                $set: {
                    premium: true,

                    premiumTimestamp: premium.createdAt

                }
            });
            revalidatePath("/profile");
            return { message: "Successfully took the subscription" };
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <div className='grid grid-cols-2 mb-20 gap-5'>
            <div>
                <h1 className='text-center text-4xl font-bold'>News24 {searchParams.package} subscription</h1>
                <p className='text-xl font-semibold text-center text-primary mt-4'>Price : ${currentPackage.price}</p>
                <div className='w-300px aspect-square relative'>
                    <Image src={currentPackage.img} alt='package-image' fill />
                </div>
                <div>
                    <h2 className='text-2xl font-bold'>Benefits</h2>
                    <ul className='flex flex-col gap-3 mt-4'>
                        {currentPackage?.benefits?.map(i => <li key={i} className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            <span>{i}</span>
                        </li>)}
                    </ul>
                </div>
            </div>
            <div className='flex flex-col items-center w-full'>
                <Suspense fallback={<p>Loading</p>}>
                    <CheckoutWrapper callback={addPaymentData} currentPackage={currentPackage} clientSecret={paymentIntent.client_secret} />
                </Suspense>
            </div>
        </div>
    );
};

export default Checkout;