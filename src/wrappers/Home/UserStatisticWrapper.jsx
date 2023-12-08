import dbConnect from '@/db';
import Publisher from '@/modules/publishers/publishers.model';
import User from '@/modules/users/users.model';
import UserStatistic from '@/pagesx/home/UserStatistic';
import hydrateData from '@/utils/hydrateData';
import React from 'react';

const UserStatisticWrapper = async () => {
    await dbConnect();
    const data = await User.aggregate([
        {
            $facet: {
                allUsers: [
                    {
                        $match: { role: { $ne: "admin" } },
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        },
                    },
                ],
                premiumUsers: [
                    {
                        $match: { role: { $ne: "admin" }, premium: true },
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        },
                    },
                ],
                admin: [
                    {
                        $match: { role: "admin" },
                    },
                    {
                        $group: {
                            _id: "$role",
                            count: { $sum: 1 }
                        },
                    },
                ],
            },
        },
    ]);
    const data2 = await Publisher.aggregate([
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ]);
    const users = hydrateData(data);
    const publishers = hydrateData(data2);
    const extractedData = { admins: users?.[0]?.admin?.[0]?.count || 0, totalUsers: users?.[0]?.allUsers?.[0]?.count || 0, premiumUsers: users?.[0]?.premiumUsers?.[0]?.count || 0, publishers: publishers?.[0]?.count || 0 };

    return (
        <UserStatistic users={extractedData} />
    );
};

export default UserStatisticWrapper;