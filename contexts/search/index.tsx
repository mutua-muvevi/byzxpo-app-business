import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { BusinessInterface } from '@/types/business';
import {
  searchBusinesses,
  SearchParams,
  getSearchHistory,
  saveSearchHistory,
  clearSearchHistory,
  getSearchSuggestions,
} from '@/api/search';

interface SearchContextType {
  // Search state
  query: string;
  setQuery: (query: string) => void;
  filters: SearchParams;
  setFilters: (filters: SearchParams) => void;
  resetFilters: () => void;
  
  // Search results
  searchResults: BusinessInterface[];
  isSearching: boolean;
  searchError: Error | null;
  totalResults: number;
  totalPages: number;
  currentPage: number;
  
  // Search actions
  executeSearch: (newQuery?: string) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  
  // Search history
  searchHistory: string[];
  clearHistory: () => void;
  
  // Search suggestions
  searchSuggestions: string[];
  isFetchingSuggestions: boolean;
  
  // Filter visibility
  isFilterVisible: boolean;
  toggleFilterVisibility: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Default filters
const defaultFilters: SearchParams = {
  pageNo: 1,
  pageLimit: 10,
  sortBy: 'name',
  sortOrder: 'asc',
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  // Search state
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchParams>(defaultFilters);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Load search history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const history = await getSearchHistory();
      setSearchHistory(history);
    };
    loadHistory();
  }, []);

  // Search suggestions query
  const {
    data: searchSuggestions = [],
    isLoading: isFetchingSuggestions,
  } = useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: () => getSearchSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 60000, // 1 minute
  });

  // Infinite query for search results with pagination
  const {
    data,
    isLoading: isSearching,
    error: searchError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['searchResults', query, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams: SearchParams = {
        ...filters,
        name: query, // This ensures exact match with the query
        pageNo: pageParam,
      };
      return searchBusinesses(searchParams);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.pageNum < lastPage.meta.totalPages) {
        return lastPage.meta.pageNum + 1;
      }
      return undefined;
    },
    enabled: false, // Don't run automatically
  });

  // Extract and flatten search results
  const searchResults = data?.pages.flatMap(page => page.businesses) || [];
  const totalResults = data?.pages[0]?.meta.totalBusinesses || 0;
  const totalPages = data?.pages[0]?.meta.totalPages || 0;
  const currentPage = data?.pages.length || 0;

  // Execute search and save to history
  const executeSearch = useCallback(
    async (newQuery?: string) => {
      const searchQuery = newQuery !== undefined ? newQuery : query;
      if (searchQuery) {
        await saveSearchHistory(searchQuery);
        const history = await getSearchHistory();
        setSearchHistory(history);
      }
      refetch();
    },
    [query, refetch]
  );

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Clear search history
  const clearHistory = useCallback(async () => {
    await clearSearchHistory();
    setSearchHistory([]);
  }, []);

  // Toggle filter visibility
  const toggleFilterVisibility = useCallback(() => {
    setIsFilterVisible(prev => !prev);
  }, []);

  const value = {
    // Search state
    query,
    setQuery,
    filters,
    setFilters,
    resetFilters,
    
    // Search results
    searchResults,
    isSearching,
    searchError,
    totalResults,
    totalPages,
    currentPage,
    
    // Search actions
    executeSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    
    // Search history
    searchHistory,
    clearHistory,
    
    // Search suggestions
    searchSuggestions,
    isFetchingSuggestions,
    
    // Filter visibility
    isFilterVisible,
    toggleFilterVisibility,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
