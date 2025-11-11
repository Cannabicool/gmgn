import React from 'react';

const WarpletEyeIcon: React.FC = () => (
    <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-110 transition-transform duration-300">
        <style>
            {`
                .eyelid-top {
                    animation: blink-top 4s infinite ease-in-out;
                    transform-origin: 50% 50%;
                }
                .eyelid-bottom {
                    animation: blink-bottom 4s infinite ease-in-out;
                    transform-origin: 50% 50%;
                }
                @keyframes blink-top {
                    0%, 90%, 100% { transform: translateY(-50px); }
                    95% { transform: translateY(0px); }
                }
                @keyframes blink-bottom {
                    0%, 90%, 100% { transform: translateY(50px); }
                    95% { transform: translateY(0px); }
                }
            `}
        </style>
        <defs>
            <clipPath id="eye-clip-header">
                <circle cx="50" cy="50" r="35" />
            </clipPath>
        </defs>
        <circle cx="50" cy="50" r="48" fill="#8A63D2"/>
        <g clipPath="url(#eye-clip-header)">
            <circle cx="50" cy="50" r="35" fill="white"/>
            <circle cx="50" cy="50" r="15" fill="#131417"/>
            <circle cx="59" cy="41" r="6" fill="white" opacity="0.8"/>
            <path d="M 0 50 H 100" stroke="#8A63D2" strokeWidth="70" className="eyelid-top" />
            <path d="M 0 50 H 100" stroke="#8A63D2" strokeWidth="70" className="eyelid-bottom" />
        </g>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center text-center">
        <WarpletEyeIcon />
        <h1 className="text-3xl sm:text-4xl font-bold mt-4 text-brand-text-primary tracking-tight">
            GM/GN Analytics
        </h1>
        <p className="mt-2 text-md sm:text-lg text-brand-text-secondary">
            Find out who's really listening to your daily greetings.
        </p>
    </header>
  );
};