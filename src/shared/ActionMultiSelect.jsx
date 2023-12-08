'use client';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import makeAnimated from 'react-select/animated';
import { Label } from '@/components/ui/label';
import useDetectTheme from '@/hooks/useDetectTheme';



const NoOptionsMessage = (props) => {
    return (
        <div className=' px-5 py-4 text-center font-bold text-accents-50 bg-backgrounds-950'>
            No Tags Available
        </div>
    );
};
const IndicatorSeparator = () => null;
const animatedComponents = makeAnimated({ NoOptionsMessage, IndicatorSeparator });

const ActionMultiSelect = ({ name, placeholder, label, selectOptions = [], onChange, defaults }) => {
    const modifiedOptions = selectOptions.map(i => ({ value: i.toLowerCase(), label: i }));
    const modifiedDefaultOptions = defaults ? defaults.map(i => ({ value: i, label: i[0].toUpperCase() + i.slice(1) })) : [];
    const dark = useDetectTheme();

    const colourStyles = {
        control: (styles) => ({
            ...styles, backgroundColor: dark ? '#ffffffd' : '#000000d', border: dark ? '1px solid rgb(30, 41, 59)' : '1px solid rgb(229, 231, 235)', boxShadow: 'none', fontSize: '14px', paddingLeft: '0px', paddingRight: '10px', paddingTop: '3.5px', paddingBottom: '3.5px', cursor: 'pointer', "&:hover": {
                border: dark ? '1px solid rgb(30, 41, 59)' : '1px solid rgb(229, 231, 235)',
            }
        }),
        multiValueLabel: (base) => ({
            ...base,
            background: dark ? 'rgb(164,140,91)' : 'rgb(213,171,93)',
            color: dark ? 'white' : 'black',
            borderRadius: '0px',
            border: dark ? '0.5px solid rgb(185,145,70)' : '0.5px solid rgb(199,167,107)',
            borderRight: '0px'
        }),
        multiValueRemove: (base) => ({

            ...base,
            background: dark ? 'rgb(164,140,91)' : 'rgb(213,171,93)',
            color: dark ? 'white' : 'black',
            borderRadius: '0px',
            border: dark ? '0.5px solid rgb(185,145,70)' : '0.5px solid rgb(199,167,107)',
            borderLeft: '0px',
            "&:hover": {

                color: dark ? 'white' : 'black',
                background: dark ? 'rgb(127,29,29)' : 'rgb(239,68,68)'
            }
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {

            return {
                ...styles,
                background: !isFocused ? dark ? '#020817' : 'white' : '#E2A83C',
                color: dark ? 'white' : 'black',
                cursor: 'pointer',
                ':active': {
                    ...styles[':active'],
                    background: dark ? 'rgb(237,232,222)' : 'rgb(164,140,91)',
                    color: dark ? 'black' : 'white'
                },
            };
        },

        input: (styles) => ({ ...styles, color: dark ? '#9890A4' : '#666666', borderColor: 'rgb(229, 231, 235)' }),
        placeholder: (styles) => ({ ...styles, color: dark ? 'rgb(242, 240, 237)' : 'rgb(18, 16, 13)' }),
        dropdownIndicator: (styles) => ({ ...styles, color: dark ? "rgb(242, 240, 237,0.5)" : "rgba(18, 16, 13,0.5)", padding: '0px', width: "20px" }),

    };
    return (
        <>
            {label ? <Label className="cursor-pointer" htmlFor={name}>{label}</Label> : null}
            <Select
                placeholder={placeholder}
                id={name}
                isMulti
                onChange={onChange}
                name={name}
                styles={colourStyles}
                defaultValue={modifiedDefaultOptions}
                components={animatedComponents}
                options={modifiedOptions}
            />
        </>
    );
};

export default ActionMultiSelect;