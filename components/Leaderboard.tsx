import React from 'react';
import { LeaderboardData, LeaderboardEntry } from '../types';
import { CrownIcon } from './icons/CrownIcon';
import { GhostIcon } from './icons/GhostIcon';
import { RobotIcon } from './icons/RobotIcon';

interface LeaderboardProps {
    data: LeaderboardData;
}

const LeaderboardColumn: React.FC<{ title: string; icon: React.ReactNode; entries: LeaderboardEntry[]; color: string }> = ({ title, icon, entries, color }) => (
    <div className="bg-[#25272C]/50 rounded-xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${color}20`, color }}>
                {icon}
            </div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
        </div>
        <ul className="space-y-3">
            {entries.map(entry => (
                <li key={entry.rank} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-brand-text-secondary w-4 text-center">{entry.rank}</span>
                    <img src={entry.avatarUrl} alt={entry.username} className="w-8 h-8 rounded-full bg-brand-primary" />
                    <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-brand-text-primary truncate">{entry.username}</p>
                    </div>
                    <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ backgroundColor: `${color}20`, color }}>{entry.stat}</span>
                </li>
            ))}
        </ul>
    </div>
);


export const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
    const tokenContractAddress = '0xaf6d2737a7611a59ac10873b0988dd6a74b2ca9a';
    const zoraLink = `https://zora.co/collect/base:${tokenContractAddress}`;

    return (
        <div className="mt-8 animate-fade-in">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Weekly Champions</h2>
                <p className="text-brand-text-secondary mt-1">Winners in each category get{' '}
                    <a href={zoraLink} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-accent hover:underline">
                        1000 $CANNABICOOL
                    </a>!
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LeaderboardColumn 
                    title="GM Chads" 
                    icon={<CrownIcon />} 
                    entries={data.mostHumanReplies}
                    color="#33D17E"
                />
                <LeaderboardColumn 
                    title="Bot Whisperers" 
                    icon={<RobotIcon />} 
                    entries={data.mostBotReplies}
                    color="#A0A0A5"
                />
                 <LeaderboardColumn 
                    title="Ghost Town Sheriffs" 
                    icon={<GhostIcon />} 
                    entries={data.mostIgnored}
                    color="#4A9DFF"
                />
            </div>
             <p className="text-center text-xs text-brand-text-secondary/50 mt-4">*Leaderboard is currently in beta and uses mock data for demonstration.</p>
        </div>
    );
};
