import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArticleCard = ({ article }) => {
    const { _id, title, image, isPremium, publisher: { name: publisherName, image: publisherImage }, tags, description, views } = article || { publisher: {} };
    return (
        <div className={`border rounded-xl h-full flex flex-col justify-between ${isPremium ? 'bg-orange-500 dark:bg-orange-300' : ''} `}>
            <div>
                <div>
                    <AspectRatio ratio={16 / 7} className="bg-muted">
                        <Image
                            src={image}
                            alt={'article-banner'}
                            fill
                            className="rounded-md object-cover"
                        />
                    </AspectRatio>
                </div>
                {isPremium ? <p className='italic'>Premium</p> : null}
                <div className='p-4 flex flex-col justify-between gap-4 '>
                    <div className=' flex flex-col gap-4'>
                        <h2 className='text-2xl font-bold text-secondarys-400 italic'>{title}</h2>
                        <div className='flex items-center gap-4'>
                            <div className='relative aspect-video w-[128px]'>
                                <Image src={publisherImage} fill alt='publisher-image' />
                            </div>
                            <div>
                                Publisher : {publisherName}
                            </div>
                        </div>
                        <div className='text-sm opacity-50'>
                            Description : {description?.length > 300 ? description.slice(0, 300) + '.....' : description}
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div className='p-4 flex justify-between items-center'>
                    <div className='flex justify-between border'>
                        <div className='flex gap-2'>
                            {tags.map(i => <p key={i} className='py-1.5 px-3 rounded bg-accents-400 text-sm'>#{i}</p>)}
                        </div>
                    </div>
                    <div className='flex gap-1.5'>
                        <Eye /> <p>{views}</p>
                    </div>
                </div>
                <div className='flex justify-center mb-4'>
                    <Link href={`/all-articles/${_id}`}>
                        <Button variant="customLink">Details</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;