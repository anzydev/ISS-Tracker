import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import NeoCard from '../ui/NeoCard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function SpeedChart({ speeds, darkMode }) {
  if (!speeds || speeds.length === 0) {
    return (
      <NeoCard header="⚡ ISS Speed Over Time" headerColor="bg-neo-accent">
        <div className="h-64 flex items-center justify-center">
          <p className="font-bold text-black/50 dark:text-neo-bg/50 uppercase tracking-wide text-sm">
            Collecting speed data...
          </p>
        </div>
      </NeoCard>
    );
  }

  const data = {
    labels: speeds.map((s) => s.time),
    datasets: [
      {
        label: 'Speed (km/h)',
        data: speeds.map((s) => s.speed),
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.15)',
        borderWidth: 4,
        pointBackgroundColor: '#000',
        pointBorderColor: '#FF6B6B',
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { family: 'Space Grotesk', weight: 'bold', size: 12 },
          color: darkMode ? '#FFFDF5' : '#000',
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: '#FFFDF5',
        bodyColor: '#FFFDF5',
        titleFont: { family: 'Space Grotesk', weight: 'bold' },
        bodyFont: { family: 'Space Grotesk', weight: 'bold' },
        borderColor: '#FF6B6B',
        borderWidth: 3,
        cornerRadius: 0,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { color: darkMode ? 'rgba(255,253,245,0.1)' : 'rgba(0,0,0,0.1)', lineWidth: 2 },
        ticks: {
          font: { family: 'Space Grotesk', weight: 'bold', size: 10 },
          color: darkMode ? '#FFFDF5' : '#000',
          maxTicksLimit: 8,
        },
        border: { color: darkMode ? '#FFFDF5' : '#000', width: 3 },
      },
      y: {
        grid: { color: darkMode ? 'rgba(255,253,245,0.1)' : 'rgba(0,0,0,0.1)', lineWidth: 2 },
        ticks: {
          font: { family: 'Space Grotesk', weight: 'bold', size: 10 },
          color: darkMode ? '#FFFDF5' : '#000',
        },
        border: { color: darkMode ? '#FFFDF5' : '#000', width: 3 },
      },
    },
  };

  return (
    <NeoCard header="⚡ ISS Speed Over Time" headerColor="bg-neo-accent" noLift>
      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </NeoCard>
  );
}
