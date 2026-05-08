import React from 'react';
import { ExternalLink, User, Calendar, Newspaper } from 'lucide-react';
import NeoBadge from '../ui/NeoBadge';
import NeoButton from '../ui/NeoButton';

export default function NewsCard({ article }) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-bg shadow-neo-md neo-card-lift flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden border-b-4 border-black dark:border-neo-bg">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="w-full h-48 bg-neo-muted items-center justify-center"
          style={{ display: article.image ? 'none' : 'flex' }}
        >
          <Newspaper className="w-12 h-12 text-black" strokeWidth={3} />
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <NeoBadge color={article.category === 'technology' ? 'accent' : 'secondary'} rotate={-2}>
            {article.category}
          </NeoBadge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg leading-snug text-black dark:text-neo-bg mb-3 line-clamp-2">
          {article.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-3 text-xs font-bold uppercase tracking-wide text-black/60 dark:text-neo-bg/60">
          <span className="flex items-center gap-1">
            <Newspaper className="w-3 h-3" strokeWidth={3} />
            {article.source}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" strokeWidth={3} />
            {article.author?.length > 20 ? article.author.slice(0, 20) + '…' : article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" strokeWidth={3} />
            {date}
          </span>
        </div>

        <p className="text-sm font-medium text-black/70 dark:text-neo-bg/70 mb-4 flex-1 line-clamp-3">
          {article.description || 'No description available.'}
        </p>

        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <NeoButton variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4" strokeWidth={3} />
            Read More
          </NeoButton>
        </a>
      </div>
    </div>
  );
}
