'use client';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const ReTypeWriter = ({ words }) => {
    return (
        <Typewriter
            words={words}
            loop={0}
            cursor
            cursorBlinking
            cursorStyle='_'
            typeSpeed={50}
            deleteSpeed={50}
            delaySpeed={2500}
        />
    );
};

export default ReTypeWriter;