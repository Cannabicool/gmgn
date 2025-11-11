
import React from 'react';
import { AnalysisResult, PieChartData } from '../types';
import { PieChart, Pie, Cell } from 'recharts';

interface ShareCardProps {
    result: AnalysisResult;
    chartData: PieChartData[];
}

const WarpletEyeIconMicro: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#8A63D2"/>
        <g clipPath="url(#eye-clip-share)">
            <circle cx="50" cy="50" r="35" fill="white"/>
            <circle cx="50" cy="50" r="15" fill="#131417"/>
            <circle cx="59" cy="41" r="6" fill="white" opacity="0.8"/>
        </g>
        <defs>
            <clipPath id="eye-clip-share">
                <circle cx="50" cy="50" r="35" />
            </clipPath>
        </defs>
    </svg>
);


export const ShareCard: React.FC<ShareCardProps> = ({ result, chartData }) => {
    const { totalCasts, counts, username, persona, period } = result;
    const getPercentage = (value: number) => totalCasts > 0 ? `${((value / totalCasts) * 100).toFixed(0)}%` : '0%';
    
    return (
        <div className="w-[600px] h-[314px] bg-brand-bg p-8 flex flex-col justify-between font-sans" style={{color: '#E4E4E7'}}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-2xl font-bold text-white">{username}</p>
                    <p className="text-lg text-brand-text-secondary">GM/GN Report - Last {period}</p>
                </div>
                <div className="text-right">
                    <p className="text-base text-brand-text-secondary">Your Persona:</p>
                    <p className="text-2xl font-bold text-brand-primary">{persona}</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="w-36 h-36">
                    <PieChart width={144} height={144}>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" dataKey="value" paddingAngle={5} cornerRadius={8}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                        ))}
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="text-3xl font-bold" fill="#E4E4E7">
                            {totalCasts}
                        </text>
                    </PieChart>
                </div>
                <div className="flex-1 space-y-3">
                    {chartData.map(item => (
                        <div key={item.name} className="flex justify-between items-center text-lg">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></span>
                                <span className="text-brand-text-secondary">{item.name}</span>
                            </div>
                            <span className="font-semibold text-white">{getPercentage(item.value)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-brand-text-secondary/80 mt-2">
                <WarpletEyeIconMicro />
                <p className="font-semibold">GM/GN Analytics</p>
            </div>
        </div>
    );
};
