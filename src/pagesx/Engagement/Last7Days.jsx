'use client';
import useDetectTheme from '@/hooks/useDetectTheme';
import React from 'react';
import Chart from 'react-google-charts';

const Last7Days = ({ data }) => {

    const dark = useDetectTheme();
    return (
        <Chart
            chartType="AreaChart"
            className='w-full h-[600px]'
            data={data}

            options={{
                backgroundColor: dark ? '#14110B' : '#F4F1EB', is3D: true, vAxis: { minValue: 0 },
                hAxis: {

                    textStyle: { fontSize: 13, color: 'black' },
                    minValue: 0,

                },
                tooltip: { isHtml: true }
            }}
        // options={options}
        />
    );
};

export default Last7Days;