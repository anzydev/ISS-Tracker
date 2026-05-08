import React, { useState } from 'react';
import { Satellite, Sun, Moon, Menu, X } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#iss-section', label: 'ISS Tracker' },
    { href: '#news-section', label: 'News' },
    { href: '#charts-section', label: 'Charts' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-neo-bg dark:bg-neo-dark border-b-4 border-black dark:border-neo-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="bg-neo-accent border-4 border-black p-1.5 shadow-neo-sm">
            <Satellite className="w-5 h-5 text-black" strokeWidth={3} />
          </div>
          <span className="font-bold text-lg uppercase tracking-tight text-black dark:text-neo-bg hidden sm:block">
            ISS // Dashboard
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                font-bold text-sm uppercase tracking-wide text-black dark:text-neo-bg
                px-4 py-2
                hover:bg-neo-accent
                transition-colors duration-100
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              w-12 h-12 border-4 border-black dark:border-neo-bg
              bg-neo-secondary dark:bg-neo-muted
              shadow-neo-sm neo-btn-push
              flex items-center justify-center
            "
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-black" strokeWidth={3} />
            ) : (
              <Moon className="w-5 h-5 text-black" strokeWidth={3} />
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden w-12 h-12 border-4 border-black dark:border-neo-bg
              bg-white dark:bg-neo-dark-surface
              shadow-neo-sm neo-btn-push
              flex items-center justify-center
            "
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-black dark:text-neo-bg" strokeWidth={3} />
            ) : (
              <Menu className="w-5 h-5 text-black dark:text-neo-bg" strokeWidth={3} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-neo-bg bg-neo-bg dark:bg-neo-dark">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="
                block px-6 py-4 font-bold text-sm uppercase tracking-wide
                text-black dark:text-neo-bg
                border-b-2 border-black/20 dark:border-neo-bg/20
                hover:bg-neo-accent
                transition-colors duration-100
              "
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
