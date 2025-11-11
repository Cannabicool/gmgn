
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChartData } from '../types';

interface GmGnPieChartProps {
  data: PieChartData[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percentage = payload[0].percent * 100;
      return (
        <div className="bg-brand-surface/80 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-lg">
          <p className="text-sm font-semibold text-brand-text-primary">{`${name}: ${percentage.toFixed(0)}%`}</p>
          <p className="text-xs text-brand-text-secondary">{`(${value} casts)`}</p>
        </div>
      );
    }
    return null;
};


export const GmGnPieChart: React.FC<GmGnPieChartProps> = ({ data }) => {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    if (total === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center text-brand-text-secondary">
                No gm/gn casts found for this period.
            </div>
        )
    }

    return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          cornerRadius={8}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="text-3xl font-bold fill-brand-text-primary">
          {total}
        </text>
        <text x="50%" y="50%" dy={24} textAnchor="middle" className="fill-brand-text-secondary text-sm">
          Total Casts
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};
