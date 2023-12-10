'use client';
import useDetectTheme from '@/hooks/useDetectTheme';
import React from 'react';
import Chart from 'react-google-charts';

const PublisherPercentage = ({ statistics }) => {
    const dark = useDetectTheme();
    return (
        <div className='fill-red-600 x text-red-600'>
            <Chart
                chartType="PieChart"

                data={statistics}
                options={{ backgroundColor: dark ? '#14110B' : '#F4F1EB', tooltip: { isHtml: true } }}
                style={{ fill: 'red' }}
                className='w-full h-[600px]'
            />
        </div>
    );
};

export default PublisherPercentage;