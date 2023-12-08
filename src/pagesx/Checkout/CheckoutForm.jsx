'use client';
import { Button } from '@/components/ui/button';
import useDetectTheme from '@/hooks/useDetectTheme';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { add } from 'date-fns';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';


const CheckoutForm = ({ clientSecret, currentPackage, callback }) => {

    const dark = useDetectTheme();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [ispending, startTransition] = useTransition();
    const { data } = useSession();
    const username = data?.user?.username;
    const email = data?.user?.email;
    const userId = data?.user?._id;
    const router = useRouter();
    if (!stripe) return <p>Loading</p>;
    return (

        <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const toastId = toast.loading("Confirming Payment...");

            if (!stripe || !elements) {
                setLoading(false);
                return;
            }

            const card = elements.getElement(CardElement);

            if (card === null) {
                setLoading(false);
                return;
            }

            const { error } = await stripe.createPaymentMethod({
                type: "card",
                card,
            });

            if (error) {
                setLoading(false);
                return toast.error(error.message, { id: toastId });
            }
            const { error: confirmError, paymentIntent } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card,
                        billing_details: {
                            name: username || "Anonymous",
                            email: email || "Anonymous",
                        }
                    },
                });

            if (confirmError) {
                setLoading(false);
                return toast.error(confirmError.message, { id: toastId });
            }

            if (paymentIntent.status !== "succeeded") {
                setLoading(false);
                return toast.error("Payment failed, please try again", { id: toastId });
            }



            startTransition(async () => {
                const data = {
                    package: currentPackage.key, price: 24, userId: userId, expiresAt: add(new Date(), {
                        days: 30
                    }),
                    userEmail: email
                };
                try {
                    const response = await callback(data);

                    toast.success(response.message, { id: toastId });
                    await new Promise((res, _) => setTimeout(() => res(), 1000));
                    router.replace("/");
                } catch (err) {
                    toast.error(err.message, { id: toastId });
                } finally {
                    setLoading(false);

                }
            });

        }} className=' my-auto w-full'>

            <p className="divider font-semibold mb-10">Pay with Your Credit Card</p>
            <div style={{ backgroundColor: dark ? "#020817" : "#ffffff80" }} className='p-4'>
                <CardElement
                    options={{
                        style: {

                            base: {
                                fontSize: "16px",
                                color: dark ? "#fff" : "#424770",
                                "::placeholder": {
                                    color: dark ? "#aab7c4" : "#000000b3",
                                },

                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
            </div>
            <Button disabled={!stripe || !clientSecret || loading || ispending} variant="success" type="submt" className="w-full my-4">
                Pay
            </Button>
        </form>

    );
};

export default CheckoutForm;