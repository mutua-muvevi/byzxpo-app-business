import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BusinessInterface } from '@/types/business';

const API_URL = 'https://byzxpo-server.onrender.com/api';

// Set auth token for requests
const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Search parameters interface
export interface SearchParams {
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  category?: string;
  isOpen?: boolean;
  isVerified?: boolean;
  email?: string;
  pageNo?: number;
  pageLimit?: number;
  sortBy?: 'name' | 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Search response interface
export interface SearchResponse {
  success: boolean;
  businesses: BusinessInterface[];
  meta: {
    pageNum: number;
    limit: number;
    totalBusinesses: number;
    totalPages: number;
  };
}

/**
 * Search businesses with filters
 */
export const searchBusinesses = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token;
    }
    
    // Ensure query parameter is properly formatted for exact matching
    const searchParams = { ...params };
    if (searchParams.name) {
      // Make sure the name parameter is exactly what the user typed
      searchParams.name = searchParams.name.trim();
    }

    const response = await axios.get(`${API_URL}/business/search-filter`, {
      params: searchParams,
      headers,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    throw new Error(
      axiosError.response?.data?.error || 'Failed to search businesses'
    );
  }
};

/**
 * Get search suggestions based on partial query
 */
export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await axios.get(`${API_URL}/business/fetch/simple`, {
      params: { name: query },
    });
    
    // Extract business names from response
    return response.data.businesses.map((business: any) => business.businessName);
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return [];
  }
};

/**
 * Save search history
 */
export const saveSearchHistory = async (query: string): Promise<void> => {
  try {
    const historyString = await AsyncStorage.getItem('searchHistory');
    let history: string[] = historyString ? JSON.parse(historyString) : [];
    
    // Remove duplicate if exists
    history = history.filter(item => item !== query);
    
    // Add new query to the beginning
    history.unshift(query);
    
    // Keep only the last 10 searches
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

/**
 * Get search history
 */
export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const historyString = await AsyncStorage.getItem('searchHistory');
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

/**
 * Clear search history
 */
export const clearSearchHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('searchHistory');
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};
