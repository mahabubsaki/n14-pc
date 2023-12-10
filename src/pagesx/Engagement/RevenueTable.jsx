
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import React from 'react';

const RevenueTable = ({ data }) => {

    return (
        <Table>
            <TableCaption>A list of our recent revenues.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>TransactionId</TableHead>
                    <TableHead>UserEmail</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Member Since</TableHead>
                    <TableHead>Membership Since</TableHead>
                    <TableHead>Membership Expires</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data[0].documents.map((invoice) => (
                    <TableRow key={invoice._id}>
                        <TableCell className="font-medium">{invoice.transactionId}</TableCell>
                        <TableCell>{invoice.userEmail}</TableCell>
                        <TableCell className="capitalize">{invoice.package}</TableCell>
                        <TableCell >{format(new Date(invoice.user.createdAt), 'P')}</TableCell>
                        <TableCell >{format(new Date(invoice.createdAt), 'P')}</TableCell>
                        <TableCell >{format(new Date(invoice.expiresAt), 'P')}</TableCell>
                        <TableCell >${invoice.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Revenue</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                    <TableCell className="text-right">${data[0].totalPrice}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default RevenueTable;