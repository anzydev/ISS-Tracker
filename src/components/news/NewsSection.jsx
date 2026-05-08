import React, { useState } from 'react';
import { Newspaper, Search, RefreshCw, SortAsc, Star } from 'lucide-react';
import NewsCard from './NewsCard';
import NeoButton from '../ui/NeoButton';
import NeoInput from '../ui/NeoInput';
import { CardSkeleton, Spinner } from '../ui/Loader';

export default function NewsSection({ newsData }) {
  const {
    allArticles, loading, error, searchQuery, setSearchQuery,
    searchArticles, sortBy, setSortBy, activeCategory, setActiveCategory,
    refreshCategory, refreshAll, categories,
  } = newsData;

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    searchArticles(searchInput);
  };

  return (
    <section id="news-section" className="relative py-16 px-4 sm:px-8 bg-neo-secondary/20 dark:bg-neo-dark">
      {/* Decorative */}
      <div className="absolute top-10 left-6 hidden lg:block">
        <Star className="w-10 h-10 text-neo-secondary animate-spin-slow" strokeWidth={3} fill="#FFD93D" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div className="bg-neo-secondary border-4 border-black p-3 shadow-neo-sm">
            <Newspaper className="w-8 h-8 text-black" strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black dark:text-neo-bg leading-none">
              NEWS <span className="text-stroke">FEED</span>
            </h2>
            <p className="text-sm uppercase tracking-widest font-bold text-black/60 dark:text-neo-bg/60 mt-1">
              Latest Articles from Around the World
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <NeoInput
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles..."
              className="flex-1"
            />
            <NeoButton type="submit" variant="primary">
              <Search className="w-5 h-5" strokeWidth={3} />
            </NeoButton>
          </form>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-bg font-bold text-sm uppercase px-4 h-14 cursor-pointer focus:bg-neo-secondary focus:outline-none text-black dark:text-neo-bg"
            >
              <option value="date">Sort: Date</option>
              <option value="source">Sort: Source</option>
            </select>
            <NeoButton onClick={refreshAll} variant="secondary">
              <RefreshCw className="w-5 h-5" strokeWidth={3} />
            </NeoButton>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <NeoButton
            variant={activeCategory === 'all' ? 'primary' : 'outline'}
            onClick={() => setActiveCategory('all')}
            className="text-xs"
          >
            All
          </NeoButton>
          {categories.map((cat) => (
            <div key={cat} className="flex gap-1">
              <NeoButton
                variant={activeCategory === cat ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(cat)}
                className="text-xs"
              >
                {cat}
              </NeoButton>
              <NeoButton
                variant="outline"
                onClick={() => refreshCategory(cat)}
                className="text-xs px-2"
              >
                <RefreshCw className="w-3 h-3" strokeWidth={3} />
              </NeoButton>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-neo-accent border-4 border-black p-4 flex items-center justify-between">
            <span className="font-bold text-black">⚠ {error}</span>
            <NeoButton onClick={refreshAll} variant="outline">Retry</NeoButton>
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : allArticles.length === 0 ? (
          <div className="text-center py-12 border-4 border-black dark:border-neo-bg bg-white dark:bg-neo-dark-surface">
            <p className="font-bold text-xl text-black dark:text-neo-bg">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article, i) => (
              <NewsCard key={`${article.url}-${i}`} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
