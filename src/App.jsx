import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import ISSSection from './components/iss/ISSSection';
import NewsSection from './components/news/NewsSection';
import ChartsSection from './components/charts/ChartsSection';
import ChatBot from './components/chatbot/ChatBot';
import { useISS } from './hooks/useISS';
import { useNews } from './hooks/useNews';
import { useChatbot } from './hooks/useChatbot';
import { Star } from 'lucide-react';

export default function App() {
  // Dark mode — persisted in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('darkMode')) || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Data hooks
  const issData = useISS();
  const newsData = useNews();
  const chatData = useChatbot(issData, newsData);

  // Notify on ISS data updates
  useEffect(() => {
    if (issData.currentPosition && issData.positions.length > 1) {
      toast.success('ISS position updated!', {
        duration: 2000,
        style: {
          background: darkMode ? '#2A2A2A' : '#FFFDF5',
          color: darkMode ? '#FFFDF5' : '#000',
          border: '3px solid #000',
          borderRadius: '0',
          boxShadow: '4px 4px 0px 0px #000',
          fontFamily: 'Space Grotesk',
          fontWeight: '700',
        },
      });
    }
  }, [issData.positions.length]);

  // Handle chart category click → filter news
  const handleCategoryClick = (category) => {
    newsData.setActiveCategory(category);
    document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
    toast(`Filtered to: ${category.toUpperCase()}`, {
      icon: '📰',
      duration: 2000,
      style: {
        background: '#FFD93D',
        color: '#000',
        border: '3px solid #000',
        borderRadius: '0',
        boxShadow: '4px 4px 0px 0px #000',
        fontFamily: 'Space Grotesk',
        fontWeight: '700',
      },
    });
  };

  return (
    <div className={`min-h-screen bg-neo-bg dark:bg-neo-dark font-grotesk transition-colors duration-200`}>
      <Toaster position="top-right" containerClassName="toast-neo" />

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Banner */}
      <section className="relative bg-black border-b-4 border-black overflow-hidden">
        <div className="absolute inset-0 bg-halftone opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-8 h-8 text-neo-accent animate-spin-slow" strokeWidth={3} fill="#FF6B6B" />
            <span className="bg-neo-accent border-4 border-neo-accent px-4 py-1 font-bold text-xs uppercase tracking-widest text-black">
              Live Dashboard
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white leading-none mb-4">
            ISS{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '3px #FF6B6B' }}
            >
              MISSION
            </span>
            <br />
            <span className="text-neo-secondary">CONTROL</span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-white/70 max-w-xl tracking-wide">
            Real-time ISS tracking, live news feed, and AI-powered chatbot.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main>
        <ISSSection issData={issData} darkMode={darkMode} />

        <div className="border-t-4 border-black dark:border-neo-bg" />

        <ChartsSection
          speeds={issData.speeds}
          articles={newsData.articles}
          onCategoryClick={handleCategoryClick}
          darkMode={darkMode}
        />

        <div className="border-t-4 border-black dark:border-neo-bg" />

        <NewsSection newsData={newsData} />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-black py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-sm uppercase tracking-widest text-white/60">
            ISS Dashboard © {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-neo-accent w-3 h-3 border-2 border-white" />
            <span className="bg-neo-secondary w-3 h-3 border-2 border-white" />
            <span className="bg-neo-muted w-3 h-3 border-2 border-white" />
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatBot chatData={chatData} />
    </div>
  );
}
