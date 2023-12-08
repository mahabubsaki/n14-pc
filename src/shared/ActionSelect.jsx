'use client';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const ActionSelect = ({ fields, placeholder, label, name, field, onChange }) => {

    return (
        <>
            {label ? <Label className="cursor-pointer" htmlFor={name}>{label}</Label> : null}

            <Select onValueChange={(e) => {
                field?.onChange(e);
                if (onChange) {
                    onChange(e);
                }
            }} defaultValue={field?.value}>
                <SelectTrigger id={name} name={name} className="w-full">
                    <SelectValue placeholder={field?.value ? fields.find(i => i._id === field.value).name : placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {fields.map(i => <SelectItem className='capitalize cursor-pointer' key={i._id} value={i._id}>{i.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </>

    );
};

export default ActionSelect;