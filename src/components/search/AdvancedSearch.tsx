import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Tag } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

export interface SearchResult {
  id: string;
  title: string;
  type: string;
  tags?: string[];
  thumbnail?: string;
}

interface AdvancedSearchProps {
  onSearch: (query: string) => Promise<SearchResult[]>;
  onResultClick: (result: SearchResult) => void;
  placeholder?: string;
  minChars?: number;
  maxResults?: number;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  onResultClick,
  placeholder = 'Search...',
  minChars = 2,
  maxResults = 10,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.length >= minChars) {
        setIsLoading(true);
        try {
          const searchResults = await onSearch(debouncedQuery);
          setResults(searchResults.slice(0, maxResults));
          setIsOpen(true);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };

    handleSearch();
  }, [debouncedQuery, minChars, maxResults, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length >= minChars) {
      setIsOpen(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    const newRecentSearches = [
      result.title,
      ...recentSearches.filter((item) => item !== result.title),
    ].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    onResultClick(result);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        {query && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.length >= minChars || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Searching...
              </div>
            ) : (
              <>
                {results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result) => (
                      <motion.button
                        key={result.id}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-2 flex items-center space-x-3 text-left"
                      >
                        {result.thumbnail && (
                          <img
                            src={result.thumbnail}
                            alt=""
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{result.title}</div>
                          <div className="text-sm text-gray-500">
                            {result.type}
                          </div>
                          {result.tags && (
                            <div className="flex items-center space-x-1 mt-1">
                              <Tag className="w-3 h-3 text-gray-400" />
                              <div className="text-xs text-gray-400">
                                {result.tags.join(', ')}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : query.length >= minChars ? (
                  <div className="p-4 text-center text-gray-500">
                    No results found
                  </div>
                ) : null}

                {recentSearches.length > 0 && !results.length && (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                      Recent Searches
                    </div>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                        onClick={() => setQuery(search)}
                        className="w-full px-4 py-2 flex items-center space-x-2 text-left"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{search}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
