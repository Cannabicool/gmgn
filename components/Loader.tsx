import React from 'react';

const WarpletLoaderIcon: React.FC = () => (
    <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`
                .loader-eyelid-top {
                    animation: blink-top-loader 4s infinite ease-in-out;
                    transform-origin: 50% 50%;
                }
                .loader-eyelid-bottom {
                    animation: blink-bottom-loader 4s infinite ease-in-out;
                    transform-origin: 50% 50%;
                }
                @keyframes blink-top-loader {
                    0%, 90%, 100% { transform: translateY(-50px); }
                    95% { transform: translateY(0px); }
                }
                @keyframes blink-bottom-loader {
                    0%, 90%, 100% { transform: translateY(50px); }
                    95% { transform: translateY(0px); }
                }
            `}
        </style>
        <defs>
            <clipPath id="eye-clip-loader">
                <circle cx="50" cy="50" r="35" />
            </clipPath>
        </defs>
        <circle cx="50" cy="50" r="48" fill="#8A63D2" fillOpacity="0.8"/>
        <g clipPath="url(#eye-clip-loader)">
            <circle cx="50" cy="50" r="35" fill="white"/>
            <circle cx="50" cy="50" r="15" fill="#131417"/>
            <circle cx="59" cy="41" r="6" fill="white" opacity="0.8"/>
            <path d="M 0 50 H 100" stroke="#8A63D2" strokeWidth="70" className="loader-eyelid-top" />
            <path d="M 0 50 H 100" stroke="#8A63D2" strokeWidth="70" className="loader-eyelid-bottom" />
        </g>
    </svg>
);


export const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 animate-fade-in">
            <div className="animate-pulse">
                <WarpletLoaderIcon />
            </div>
            <p className="text-brand-text-secondary font-semibold">Analyzing your casts...</p>
            <p className="text-sm text-brand-text-secondary/70">Warping through the Farcaster timeline.</p>
        </div>
    );
}