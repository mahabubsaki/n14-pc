import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ActionTextArea = ({ placeholder, name, label }) => {
    return (
        <>
            <Label className="cursor-pointer" htmlFor={name}>{label}</Label>
            <Textarea id={name} name={name} className="resize-none h-40" placeholder={placeholder} />
        </>
    );
};

export default ActionTextArea;