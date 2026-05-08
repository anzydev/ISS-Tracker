import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import NeoCard from '../ui/NeoCard';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NewsDistributionChart({ articles, onCategoryClick, darkMode }) {
  // Count by category
  const categoryCounts = {};
  const allArticles = [...(articles.technology || []), ...(articles.science || [])];
  allArticles.forEach((a) => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });

  const labels = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);

  if (labels.length === 0) {
    return (
      <NeoCard header="📊 News Distribution" headerColor="bg-neo-secondary">
        <div className="h-64 flex items-center justify-center">
          <p className="font-bold text-black/50 dark:text-neo-bg/50 uppercase tracking-wide text-sm">
            No news data yet...
          </p>
        </div>
      </NeoCard>
    );
  }

  const colorPalette = ['#FF6B6B', '#FFD93D', '#C4B5FD', '#4ADE80', '#60A5FA'];

  const data = {
    labels: labels.map((l) => l.toUpperCase()),
    datasets: [
      {
        data: counts,
        backgroundColor: colorPalette.slice(0, labels.length),
        borderColor: darkMode ? '#FFFDF5' : '#000',
        borderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'Space Grotesk', weight: 'bold', size: 12 },
          color: darkMode ? '#FFFDF5' : '#000',
          usePointStyle: true,
          pointStyle: 'rect',
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#FFFDF5',
        bodyColor: '#FFFDF5',
        titleFont: { family: 'Space Grotesk', weight: 'bold' },
        bodyFont: { family: 'Space Grotesk', weight: 'bold' },
        borderColor: '#FFD93D',
        borderWidth: 3,
        cornerRadius: 0,
        padding: 12,
      },
    },
    onClick: (_, elements) => {
      if (elements.length > 0 && onCategoryClick) {
        const idx = elements[0].index;
        const category = labels[idx];
        onCategoryClick(category);
      }
    },
  };

  return (
    <NeoCard header="📊 News Distribution" headerColor="bg-neo-secondary" noLift>
      <div className="h-72">
        <Doughnut data={data} options={options} />
      </div>
    </NeoCard>
  );
}
