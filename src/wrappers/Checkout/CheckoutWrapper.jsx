'use client';
import CheckoutForm from '@/pagesx/Checkout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutWrapper = ({ clientSecret, currentPackage, callback }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm callback={callback} clientSecret={clientSecret} currentPackage={currentPackage} />
        </Elements>
    );
};

export default CheckoutWrapper;