import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UserInputForm } from './components/UserInputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { fetchGmGnCasts } from './services/farcasterService';
import { generateInsights } from './services/geminiService';
import { AnalysisResult, Cast, TimePeriod } from './types';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('@cannabicool');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('1W');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!username) {
      setError('Please enter a Farcaster username.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setAiInsight('');

    try {
      const casts = await fetchGmGnCasts(username, timePeriod);
      const result = processCasts(casts);
      setAnalysisResult(result);
      
      const insight = await generateInsights(result);
      setAiInsight(insight);

    } catch (err) {
      setError('Failed to analyze casts. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [username, timePeriod]);

  const getPersona = (counts: { ignored: number; botReplied: number; humanReplied: number; }, totalCasts: number): string => {
    if (totalCasts === 0) return "The Lurker";

    const { ignored, botReplied, humanReplied } = counts;
    const humanPercentage = humanReplied / totalCasts;
    const botPercentage = botReplied / totalCasts;
    const ignoredPercentage = ignored / totalCasts;

    if (humanPercentage > 0.5) return "GM Chad";
    if (botPercentage > 0.5) return "Bot Whisperer";
    if (ignoredPercentage > 0.6) return "Ghost Town Sheriff";
    if (totalCasts > (timePeriod === '1W' ? 14 : 40) ) return "The Consistent One";
    
    return "The Balanced GMer";
  };

  const processCasts = (casts: Cast[]): AnalysisResult => {
    let ignored = 0;
    let botReplied = 0;
    let humanReplied = 0;

    casts.forEach(cast => {
      if (cast.replies.length === 0) {
        ignored++;
      } else {
        const totalScore = cast.replies.reduce((sum, reply) => sum + reply.author.neynarScore, 0);
        const avgScore = totalScore / cast.replies.length;
        if (avgScore < 0.35) {
          botReplied++;
        } else {
          humanReplied++;
        }
      }
    });

    const total = casts.length;
    const counts = { ignored, botReplied, humanReplied };
    const persona = getPersona(counts, total);

    return {
      totalCasts: total,
      counts,
      period: timePeriod,
      username: username,
      persona,
    };
  };

  const reset = () => {
    setAnalysisResult(null);
    setAiInsight('');
    setError(null);
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 bg-brand-surface rounded-2xl shadow-2xl shadow-brand-primary/10 p-6 sm:p-8 border border-white/10">
          {!analysisResult && !isLoading && (
            <UserInputForm
              username={username}
              setUsername={setUsername}
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
              onAnalyze={handleAnalysis}
            />
          )}
          {isLoading && <Loader />}
          {error && !isLoading && (
            <div className="text-center">
              <p className="text-red-400">{error}</p>
              <button onClick={reset} className="mt-4 px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary/80 transition-colors">
                Try Again
              </button>
            </div>
          )}
          {!isLoading && analysisResult && (
             <ResultsDisplay 
                result={analysisResult} 
                aiInsight={aiInsight}
                onReset={reset}
             />
          )}
        </main>
        
        <footer className="text-center mt-8 text-brand-text-secondary text-sm">
          <p>Inspired by a fever dream on Farcaster. Built with Warplet energy.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;