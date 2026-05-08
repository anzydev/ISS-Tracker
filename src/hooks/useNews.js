import { useState, useCallback, useEffect } from 'react';
import { fetchNews } from '../utils/api';
import { setWithExpiry, getWithExpiry } from '../utils/storage';

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export function useNews() {
  const [articles, setArticles] = useState({ technology: [], science: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['technology', 'science'];

  const loadCategory = useCallback(async (cat, forceRefresh = false) => {
    const cacheKey = `news_${cat}`;

    if (!forceRefresh) {
      const cached = getWithExpiry(cacheKey);
      if (cached) {
        setArticles((prev) => ({ ...prev, [cat]: cached }));
        return cached;
      }
    }

    const data = await fetchNews(cat);
    setWithExpiry(cacheKey, data, CACHE_TTL);
    setArticles((prev) => ({ ...prev, [cat]: data }));
    return data;
  }, []);

  const loadAll = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all(categories.map((cat) => loadCategory(cat, forceRefresh)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadCategory]);

  const searchArticles = useCallback(async (query) => {
    if (!query.trim()) {
      loadAll();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await fetchNews('general', query);
      setArticles({ technology: results.slice(0, 5), science: results.slice(5, 10) });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadAll]);

  const refreshCategory = useCallback(async (cat) => {
    setLoading(true);
    try {
      await loadCategory(cat, true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadCategory]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Get filtered & sorted articles
  const getAllArticles = useCallback(() => {
    let all;
    if (activeCategory === 'all') {
      all = [...articles.technology, ...articles.science];
    } else {
      all = articles[activeCategory] || [];
    }

    // Sort
    if (sortBy === 'date') {
      all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sortBy === 'source') {
      all.sort((a, b) => a.source.localeCompare(b.source));
    }

    return all;
  }, [articles, activeCategory, sortBy]);

  return {
    articles,
    allArticles: getAllArticles(),
    loading,
    error,
    searchQuery,
    setSearchQuery,
    searchArticles,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    refreshCategory,
    refreshAll: () => loadAll(true),
    categories,
  };
}
