
import React from 'react';
import { TimePeriod } from '../types';

interface UserInputFormProps {
  username: string;
  setUsername: (username: string) => void;
  timePeriod: TimePeriod;
  setTimePeriod: (period: TimePeriod) => void;
  onAnalyze: () => void;
}

const timePeriods: { value: TimePeriod; label: string }[] = [
  { value: '1D', label: '1 Day' },
  { value: '1W', label: '1 Week' },
  { value: '1M', label: '1 Month' },
  { value: '1Y', label: '1 Year' },
];

export const UserInputForm: React.FC<UserInputFormProps> = ({
  username,
  setUsername,
  timePeriod,
  setTimePeriod,
  onAnalyze,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-brand-text-secondary mb-2">
          Farcaster Username
        </label>
        <div className="relative">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@vitalik"
            className="w-full bg-[#25272C] border-2 border-transparent focus:border-brand-primary focus:ring-0 rounded-lg px-4 py-3 text-brand-text-primary placeholder-brand-text-secondary/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text-secondary mb-2">
          Time Period
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timePeriods.map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => setTimePeriod(period.value)}
              className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                timePeriod === period.value
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                  : 'bg-[#25272C] hover:bg-[#303238]'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-brand-accent text-brand-bg font-bold py-4 rounded-lg hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-brand-accent/30"
        >
          Analyze My GMs
        </button>
      </div>
    </form>
  );
};
