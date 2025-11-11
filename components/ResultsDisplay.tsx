
import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { AnalysisResult, PieChartData } from '../types';
import { GmGnPieChart } from './GmGnPieChart';
import { ShareIcon } from './icons/ShareIcon';
import { ShareCard } from './ShareCard';

interface ResultsDisplayProps {
  result: AnalysisResult;
  aiInsight: string;
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, aiInsight, onReset }) => {
  const { totalCasts, counts, persona } = result;
  const shareCardRef = useRef<HTMLDivElement>(null);


  const chartData: PieChartData[] = [
    { name: 'Ignored', value: counts.ignored, color: '#4A9DFF' }, // blue
    { name: 'Bot Replied', value: counts.botReplied, color: '#A0A0A5' }, // gray
    { name: 'Human Replied', value: counts.humanReplied, color: '#33D17E' }, // green
  ];

  const getPercentage = (value: number) => {
    if (totalCasts === 0) return '0%';
    return `${((value / totalCasts) * 100).toFixed(0)}%`;
  };
  
  const handleShare = async () => {
    if (!shareCardRef.current) return;

    try {
        const dataUrl = await toPng(shareCardRef.current, { cacheBust: true, quality: 0.95, pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `gm-gn-stats-${result.username.replace('@', '')}.png`;
        link.href = dataUrl;
        link.click();

        // Optional: Copy text to clipboard for easy pasting
        const shareText = `Just checked my GM/GN stats and I'm a certified "${persona}".\n\nWhat's your persona? Find out here 👇\n#farcaster #based #gmanalytics`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Share image downloaded! A suggested post has been copied to your clipboard.');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });

    } catch (err) {
        console.error('Failed to generate share image', err);
        alert('Oops! Could not create the share image. Please try again.');
    }
  };


  return (
    <>
      <div ref={shareCardRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
         <ShareCard result={result} chartData={chartData} />
      </div>

      <div className="animate-fade-in space-y-8">
          <div className="text-center">
              <p className="text-brand-text-secondary">Your Persona:</p>
              <h2 className="text-3xl font-bold text-brand-primary tracking-tight">{persona}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="w-full h-64 sm:h-72">
                  <GmGnPieChart data={chartData} />
              </div>
              <div className="space-y-4">
                  <h3 className="text-xl font-bold text-brand-text-primary">Your GM/GN Report</h3>
                  <p className="text-brand-text-secondary">Analysis of {totalCasts} casts from {result.username} over the last {result.period}.</p>
                  <ul className="space-y-3 pt-2">
                      {chartData.map(item => (
                          <li key={item.name} className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                  <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></span>
                                  <span className="text-brand-text-secondary">{item.name}</span>
                              </div>
                              <span className="font-semibold text-brand-text-primary">{getPercentage(item.value)}</span>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>

          {aiInsight && (
              <div className="bg-[#25272C]/50 p-5 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-brand-primary mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                      CLANKER's Hot Take
                  </h4>
                  <p className="text-brand-text-secondary whitespace-pre-wrap font-mono text-sm leading-relaxed">{aiInsight}</p>
              </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button onClick={handleShare} className="flex-1 bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <ShareIcon />
                  Share on Farcaster
              </button>
              <button onClick={onReset} className="flex-1 bg-[#25272C] text-brand-text-primary font-bold py-3 px-4 rounded-lg hover:bg-[#303238] transition-colors">
                  Analyze Again
              </button>
          </div>
      </div>
    </>
  );
};
