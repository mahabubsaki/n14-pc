import dbConnect from '@/db';
import Article from '@/modules/articles/articles.model';
import Premium from '@/modules/premiums/premiums.model';
import Last7Days from '@/pagesx/Engagement/Last7Days';
import PublisherPercentage from '@/pagesx/Engagement/PublisherPercentage';
import RevenueTable from '@/pagesx/Engagement/RevenueTable';
import hydrateData from '@/utils/hydrateData';
import { subDays } from 'date-fns';
import React from 'react';

const Engagement = async () => {
    await dbConnect();
    const data = await Article.aggregate([{
        $lookup: {
            from: 'publishers',
            localField: 'publisher',
            foreignField: '_id',
            as: 'publisherInfo'
        }
    },
    {
        $unwind: '$publisherInfo'
    },
    {
        $group: {
            _id: '$publisher',
            publisherInfo: { $first: '$publisherInfo' },
            count: { $sum: 1 }
        }
    },
    {
        $sort: { count: -1 }
    },
    {
        $project: {
            'publisherInfo.name': 1,
            '_id': 0,
            'count': 1
        }
    }
    ]);
    const formatedData = data.map(i => {
        return [i.publisherInfo.name, i.count];
    });
    formatedData.unshift(['Publishers', 'Article Count']);
    const data2 = await Premium.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                userId: 0,
                'user.email': 0,
                'user.__v': 0,
                'user.username': 0,
                'user.updatedAt': 0,
                'user.role': 0,
                'user.password': 0,
                'user.premium': 0,
                'user.premiumTimestamp': 0,
                'user.hashedPassword': 0,
                'user.avatar': 0,
                'user._id': 0,
            }
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: '$price' },
                documents: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
                documents: 1
            }
        }
    ]);
    const formatedData2 = hydrateData(data2);

    const data3 = await Article.aggregate([
        {
            $match: {
                createdAt: { $gte: subDays(new Date(), 7) }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                date: '$_id',
                count: 1
            }
        },
        {
            $sort: { date: 1 }
        }

    ]);

    console.log(data3);

    const formatedData3 = data3.map(i => {
        return [i.date, i.count];
    });
    formatedData3.unshift(['Date', 'Posts']);

    return (
        <div>
            <div className="my-10">
                <h1 className='text-3xl text-center font-bold '>Publisher Percentage</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[250px]"></span>
            </div>
            <div>
                <PublisherPercentage statistics={formatedData} />
            </div>
            <div className="my-10">
                <h1 className='text-3xl text-center font-bold '>Revenue</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[250px]"></span>
            </div>
            <div>
                <RevenueTable data={formatedData2} />
            </div>
            <div className="my-10">
                <h1 className='text-3xl text-center font-bold '>Last 7 days post</h1>
                <span className="mt-6 bg-secondarys-500 block mx-auto h-1 max-w-[350px]"></span>
            </div>
            <div>
                <Last7Days data={formatedData3} />
            </div>
        </div>
    );
};

export default Engagement;