'use client';

import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatRelative } from 'date-fns';
import ToolTip from '@/shared/ToolTip';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';



const SliderArticle = ({ articles }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const ref = useRef();
    const modalRef = useRef();

    const settings = {

        appendDots: dots => (
            <div>
                <ul> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div className={`h-1.5 w-1.5  rounded-full mt-2 ${i === activeSlide ? 'bg-base-50 ' : 'bg-base-700'}`}>
            </div>
        )
    };
    useEffect(() => {
        const timeId = setTimeout(() => {
            modalRef.current.click();
        }, 1000);
        return () => {
            clearTimeout(timeId);
        };
    }, []);
    if (articles?.length === 0) {
        return null;
    }
    return (
        <>
            <div className=' relative px-4 mb-5'>
                <Slider {...settings} ref={ref} afterChange={(i) => setActiveSlide(i)} dots autoplay lazyLoad infinite arrows={false} >
                    {articles?.map(i => <div key={i._id}>
                        <Link href={`/all-articles/${i._id}`}>
                            <div className='h-[600px] w-full mx-auto relative rounded-t-lg'>
                                <Image blurDataURL="/blurred.jpg"
                                    placeholder="blur" fill src={i.image} alt='news-banner' className='rounded-t-lg' />

                            </div>
                            <div className='bg-gray-700 bg-opacity-40 h-32 flex  items-center justify-between bottom-0 py-3 px-10'>
                                <div>
                                    <h2 className='text-2xl font-semibold'>{i.title}</h2>
                                    <p className='dark:text-gray-400 text-stone-700'>Posted on {formatRelative(new Date(i.createdAt), new Date())}</p>

                                </div>
                                <div className='h-full flex flex-col justify-between items-end '>

                                    <p className='flex items-center text-xl gap-2'>
                                        <Eye size={20} className='cursor-pointer' /> {i.views}
                                    </p>

                                    <div className='cursor-pointer flex items-center gap-2'>
                                        <ToolTip title={i.authorId.username}>
                                            <Image alt='author-image' className='rounded-full' height={40} width={40} src={i.authorId.avatar} />
                                        </ToolTip>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>)}

                </Slider>
                <Button onClick={() => ref.current.slickPrev()} className='absolute p-2 rounded-full top-1/2 bottom-1/2 -translate-y-1/2 left-8'>
                    <ChevronLeft />
                </Button>
                <Button onClick={() => ref.current.slickNext()} className='absolute p-2 rounded-full top-1/2 bottom-1/2 -translate-y-1/2 right-8'>
                    <ChevronRight />
                </Button>
            </div>
            <Dialog>
                <DialogTrigger ref={modalRef} className='w-0 h-0 mb-10 invisible'>s</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Wanna try some premioum experience</DialogTitle>
                        <DialogDescription>
                            <div className='relative w-full h-[300px]'>
                                <Image alt='subscription-banner' fill src={'/subscribe.png'} />
                            </div>
                            <p>
                                Indulge in an extraordinary journey with our Premium Experience, a carefully crafted and exclusive adventure designed to elevate your senses and leave you with unforgettable memories. Immerse yourself in a world where luxury meets innovation, where every detail is meticulously curated to cater to your desires.</p>
                            <div className='flex justify-center mt-4'>
                                <Link href={'/subscription'}>
                                    <Button>
                                        Subscribe Now
                                    </Button>
                                </Link>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};








export default SliderArticle;