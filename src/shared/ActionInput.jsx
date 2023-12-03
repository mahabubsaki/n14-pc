
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

const ActionInput = ({ label, name, type, defaultValue = null, disabled = false, placeholder = "" }) => {

    return (
        <div className='flex flex-col gap-3'>

            <Label className="cursor-pointer" htmlFor={name}>{label}</Label>
            <Input placeholder={placeholder} disabled={disabled} name={name} id={name} type={type} defaultValue={defaultValue} />
        </div>
    );
};

export default ActionInput;