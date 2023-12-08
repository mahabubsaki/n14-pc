import ReTypeWriter from '@/shared/ReTypeWriter';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='flex flex-row-reverse items-center gap-4'>
            <div className='flex-1 relative h-[600px] rounded-3xl'>
                <Image src={"/banner.png"} fill alt='banner' className='rounded-3xl' />
            </div>
            <div className='flex-1'>
                <div className=' mb-6 '>
                    <h1 className='text-3xl font-bold '>Greetings, Comrade</h1>
                    <p className='text-primary text-2xl font-semibold'><ReTypeWriter words={[
                        "Unfolding Truths, Every Headline Counts.",
                        "News at the Speed of Life.",
                        "Informed Today, Empowered Tomorrow.",
                        "Your World, Your News.",
                        "Where Facts Speak Louder Than Words.",
                        "Breaking News, Building Understanding.",
                        "Empowering Minds with Real-time News.",
                        "Beyond the Headlines, Into the Heart of Stories.",
                        "Your Source for Truthful, Timely Updates.",
                        "Navigate the News with Us.",
                        "Connecting Dots, Reporting Truths.",
                        "Informing Minds, Inspiring Perspectives.",
                        "News that Matters, Moments that Count.",
                        "Your Daily Briefing for an Informed Tomorrow.",
                        "Shaping Perspectives, Reporting Realities.",
                        "Capturing Today’s Stories for Tomorrow.",
                        "News Unveiled, Perspectives Explored.",
                        "Stay Informed, Stay Inspired.",
                        "Where Information Meets Insight.",
                        "Your Window to the World, Every Day."
                    ]} /></p>
                </div>
                <p className='opacity-70'>

                    Welcome to mNews, where news takes center stage, and you are the author of your information journey. Dive into a world of limitless stories, where you can read the latest headlines, publish your own news, and unlock premium content as a valued member. Elevate your news consumption to a premium level with exclusive insights and in-depth analysis, available only to our premium users. Join us at mNews and empower yourself with the news that matters. Your source, your stories, your premium experience awaits.
                </p>
            </div>
        </div>
    );
};

export default Banner;