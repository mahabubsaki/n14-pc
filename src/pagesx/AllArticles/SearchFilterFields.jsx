'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ActionMultiSelect from '@/shared/ActionMultiSelect';
import ActionSelect from '@/shared/ActionSelect';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';
const MULTI_SELECT_OPTIONS = ['Sports', 'International', 'Space', 'Hollywood', 'Trending'];

const SearchFilterFields = ({ publishers, pages, activePage }) => {

    const [fields, setFields] = useState({ title: "", publisher: "", tags: [], sort: "" });
    const router = useRouter();

    const queryCreator = (fields, page) => {
        let query = "/all-articles";
        if ((Object.values(fields).some(i => i.length > 0)) || page) query += "?";
        else return;
        const arr = [];
        if (fields.search) arr.push(`title=${fields.title}`);
        if (fields.publisher) arr.push(`publisher=${fields.publisher}`);
        if (fields.tags.length > 0) arr.push(`tags=${fields.tags.join('-')}`);
        if (fields.sort) arr.push(`newest=${fields.sort}`);
        if (page) arr.push(`page=${page}`);
        if (arr.length > 1) query += arr.join("&");
        else query += arr[0];
        return query;
    };

    const urlParams = useSearchParams();



    return (
        <>
            <div className='py-4 px-2 bg-accent rounded-lg flex gap-5 items-center'>
                <Input placeholder="Search by title" onChange={(e) => setFields({ ...fields, title: e.target.value })} />
                <div className='min-w-[270px]'>
                    <ActionSelect onChange={(e) => setFields({ ...fields, publisher: e })} name={"publisher"} placeholder={'Select Publisher'} fields={publishers} />
                </div>
                <div className='min-w-[150px]'>
                    <ActionSelect onChange={(e) => setFields({ ...fields, sort: e })} name={"publisher"} placeholder={'Sort'} fields={[{ _id: "true", name: "Newest First" }, { _id: "false", name: "Oldest First" }]} />
                </div>
                <div className='min-w-[400px] bg-background text-foreground rounded-lg'>
                    <ActionMultiSelect onChange={(e) => {
                        const minifiedValues = e.map(i => i.value);
                        setFields({ ...fields, tags: minifiedValues });
                    }} selectOptions={MULTI_SELECT_OPTIONS} placeholder={'Select Article Tags'} name={'tags'} />
                </div>

                <Button onClick={() => router.push(queryCreator(fields))}>Filter</Button>
            </div>
            <div className='flex gap-2 justify-center py-5'>
                {pages?.map((_, i) => <Button onClick={() => {
                    const queryParams = [];
                    for (const [key, value] of urlParams.entries()) {
                        queryParams.push(`${key}=${value}`);
                    }
                    const reconstructedQueryString = queryParams.join('&');
                    console.log(reconstructedQueryString.length);
                    const conditonalQuery = (reconstructedQueryString.length < 1 || reconstructedQueryString.includes('page')) ? `/all-articles?page=${i + 1}` : `/all-articles?page=${i + 1}&${reconstructedQueryString}`;
                    router.push(conditonalQuery);
                }} variant={activePage == (i + 1) ? "default" : "outline"} size="sm" key={i}>{i + 1}</Button>)}
            </div>
        </>

    );
};

export default SearchFilterFields;