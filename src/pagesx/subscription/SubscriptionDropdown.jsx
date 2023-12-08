'use client';
import { Button } from '@/components/ui/button';
import ActionSelect from '@/shared/ActionSelect';
import Link from 'next/link';
import React, { useState } from 'react';

const SubscriptionDropdown = () => {
    const [packages, setPackage] = useState("");
    return (
        <div className='flex items-center flex-col gap-4 mb-20'>
            <div className='w-[280px]'>
                <ActionSelect onChange={(e) => setPackage(e)} name={"publisher"} placeholder={'Select Package'} fields={[{ _id: "silver", name: "Silver - $5/month" }, { _id: "gold", name: "Gold - $24/month" }, { _id: "daimond", name: "Daimond - $72/month" }]} />
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                <p className='text-xl font-semibold'>Cost : ${packages === 'silver' ? '5' : packages === 'gold' ? '24' : packages === 'daimond' ? '72' : '0'}</p>
                {
                    packages ? <Link href={`/checkout?package=${packages}`}>
                        <Button variant="success" >
                            Checkout
                        </Button>
                    </Link> : <Button disabled variant="success" >
                        Checkout
                    </Button>
                }
            </div>
        </div>
    );
};

export default SubscriptionDropdown;