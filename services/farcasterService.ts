
import { Cast, Reply, TimePeriod, User } from '../types';

// Mock data generation
const createMockUser = (isBot: boolean): User => {
    const username = `user${Math.floor(Math.random() * 1000)}`;
    const neynarScore = isBot ? Math.random() * 0.34 : 0.35 + Math.random() * 0.65;
    return { username, neynarScore: parseFloat(neynarScore.toFixed(2)) };
};

const createMockReplies = (): Reply[] => {
    const replyCount = Math.floor(Math.random() * 6);
    if (replyCount === 0) return [];
    
    const isBotThread = Math.random() > 0.6; // 40% chance of being mostly bots
    const replies: Reply[] = [];
    for (let i = 0; i < replyCount; i++) {
        replies.push({
            text: 'gm',
            author: createMockUser(isBotThread ? Math.random() > 0.2 : Math.random() > 0.8)
        });
    }
    return replies;
};

const createMockCast = (id: number): Cast => {
    const text = Math.random() > 0.5 ? 'gm' : 'gn';
    return {
        id: `cast_${id}`,
        text,
        timestamp: new Date().toISOString(),
        replies: createMockReplies()
    };
};

const getCastCountForPeriod = (period: TimePeriod): number => {
    switch (period) {
        case '1D': return Math.floor(Math.random() * 2) + 1; // 1-2
        case '1W': return Math.floor(Math.random() * 8) + 7; // 7-14
        case '1M': return Math.floor(Math.random() * 30) + 30; // 30-60
        case '1Y': return Math.floor(Math.random() * 200) + 300; // 300-500
        default: return 10;
    }
}

// Mock API service function
export const fetchGmGnCasts = (username: string, period: TimePeriod): Promise<Cast[]> => {
    console.log(`Fetching mock casts for ${username} over ${period}...`);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const castCount = getCastCountForPeriod(period);
            const casts = Array.from({ length: castCount }, (_, i) => createMockCast(i));
            
            // Sprinkle in some ignored casts
            const ignoredCount = Math.floor(castCount * (Math.random() * 0.4 + 0.3)); // 30-70% ignored
            for (let i = 0; i < ignoredCount; i++) {
                const randomIndex = Math.floor(Math.random() * castCount);
                casts[randomIndex].replies = [];
            }

            resolve(casts);
        }, 1500 + Math.random() * 1000); // Simulate network latency
    });
};
