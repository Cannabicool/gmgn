import { LeaderboardData } from '../types';

// Using a simple hashing function to generate consistent "Warplet-style" avatars from usernames
const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

const generateAvatar = (username: string) => {
    const bgColor = stringToColor(username);
    const eyeColor = stringToColor(username.split('').reverse().join(''));
    // A simple SVG avatar generator
    const svg = `
        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="${bgColor}" />
            <circle cx="50" cy="50" r="25" fill="white" />
            <circle cx="50" cy="50" r="12" fill="${eyeColor}" />
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};


const mockLeaderboardData: LeaderboardData = {
    mostIgnored: [
        { rank: 1, username: '@dwr', avatarUrl: generateAvatar('@dwr'), stat: '92% Ignored' },
        { rank: 2, username: '@greg', avatarUrl: generateAvatar('@greg'), stat: '88% Ignored' },
        { rank: 3, username: '@jacek', avatarUrl: generateAvatar('@jacek'), stat: '85% Ignored' },
    ],
    mostHumanReplies: [
        { rank: 1, username: '@v', avatarUrl: generateAvatar('@v'), stat: '85% Human' },
        { rank: 2, username: '@linda', avatarUrl: generateAvatar('@linda'), stat: '81% Human' },
        { rank: 3, username: '@cameron', avatarUrl: generateAvatar('@cameron'), stat: '79% Human' },
    ],
    mostBotReplies: [
        { rank: 1, username: '@betashop', avatarUrl: generateAvatar('@betashop'), stat: '95% Bots' },
        { rank: 2, username: '@emodi', avatarUrl: generateAvatar('@emodi'), stat: '91% Bots' },
        { rank: 3, username: '@les', avatarUrl: generateAvatar('@les'), stat: '89% Bots' },
    ],
};

export const fetchLeaderboardData = (): Promise<LeaderboardData> => {
    console.log('Fetching mock leaderboard data...');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockLeaderboardData);
        }, 800);
    });
};
