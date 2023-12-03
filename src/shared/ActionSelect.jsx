import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const ActionSelect = ({ fields, placeholder, label, name, field }) => {
    return (
        <>
            {label ? <Label className="cursor-pointer" htmlFor={name}>{label}</Label> : null}

            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id={name} name={name} className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {fields.map(i => <SelectItem className='capitalize cursor-pointer' key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
            </Select>
        </>

    );
};

export default ActionSelect;