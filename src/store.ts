import { create } from 'zustand';
import { PoliticalSymbol, SymbolImportData } from './types';

interface FilterState {
  type: string | null;
  region: string | null;
  ideology: string | null;
  color: string | null;
  searchQuery: string;
}

interface StoreState {
  filters: FilterState;
  filteredSymbols: PoliticalSymbol[];
  customSymbols: PoliticalSymbol[];
  searchOpen: boolean;
  setTypeFilter: (type: string | null) => void;
  setRegionFilter: (region: string | null) => void;
  setIdeologyFilter: (ideology: string | null) => void;
  setColorFilter: (color: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  resetFilters: () => void;
  addCustomSymbols: (importData: SymbolImportData[]) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  filters: {
    type: null,
    region: null,
    ideology: null,
    color: null,
    searchQuery: '',
  },
  
  filteredSymbols: [],
  customSymbols: [],
  searchOpen: false,
  
  setSearchOpen: (open) => {
    set({ searchOpen: open });
  },
  
  setTypeFilter: (type) => {
    set(state => {
      const newFilters = { ...state.filters, type };
      return {
        filters: newFilters,
        filteredSymbols: filterSymbols(newFilters, state.customSymbols)
      };
    });
  },
  
  setRegionFilter: (region) => {
    set(state => {
      const newFilters = { ...state.filters, region };
      return {
        filters: newFilters,
        filteredSymbols: filterSymbols(newFilters, state.customSymbols)
      };
    });
  },
  
  setIdeologyFilter: (ideology) => {
    set(state => {
      const newFilters = { ...state.filters, ideology };
      return {
        filters: newFilters,
        filteredSymbols: filterSymbols(newFilters, state.customSymbols)
      };
    });
  },
  
  setColorFilter: (color) => {
    set(state => {
      const newFilters = { ...state.filters, color };
      return {
        filters: newFilters,
        filteredSymbols: filterSymbols(newFilters, state.customSymbols)
      };
    });
  },
  
  setSearchQuery: (searchQuery) => {
    set(state => {
      const newFilters = { ...state.filters, searchQuery };
      return {
        filters: newFilters,
        filteredSymbols: filterSymbols(newFilters, state.customSymbols)
      };
    });
  },
  
  resetFilters: () => {
    set(state => ({
      filters: {
        type: null,
        region: null,
        ideology: null,
        color: null,
        searchQuery: '',
      },
      filteredSymbols: state.customSymbols
    }));
  },
  
  addCustomSymbols: (importData) => {
    set(state => {
      const newSymbols = importData.map(symbol => ({
        ...symbol,
        // Ensure required fields have default values
        type: symbol.type || 'Object',
        region: symbol.region || 'National',
        ideology: symbol.ideology || 'Nationalist',
        color: symbol.color || 'White',
        shape: symbol.shape || '',
        historical_use: symbol.historical_use || '',
        origin_story: symbol.origin_story || '',
        cultural_significance: symbol.cultural_significance || '',
        evolution: symbol.evolution || '',
        timeline: symbol.timeline || '',
        creation_year: symbol.creation_year || 0,
        tags: symbol.tags || '',
        keywords: symbol.keywords || ''
      }));
      
      const updatedCustomSymbols = [...state.customSymbols, ...newSymbols];
      return {
        customSymbols: updatedCustomSymbols,
        filteredSymbols: filterSymbols(state.filters, updatedCustomSymbols)
      };
    });
  }
}));

function filterSymbols(filters: FilterState, symbols: PoliticalSymbol[]): PoliticalSymbol[] {
  return symbols
    .filter(symbol => {
      if (!symbol) return false;
      
      if (filters.type && symbol.type !== filters.type) {
        return false;
      }
      
      if (filters.region && symbol.region !== filters.region) {
        return false;
      }
      
      if (filters.ideology && symbol.ideology !== filters.ideology) {
        return false;
      }
      
      if (filters.color && !symbol.color?.toLowerCase().includes(filters.color.toLowerCase())) {
        return false;
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = symbol.symbol_name?.toLowerCase().includes(query);
        const matchesParty = symbol.party_name?.toLowerCase().includes(query);
        const matchesType = symbol.type?.toLowerCase().includes(query);
        const matchesRegion = symbol.region?.toLowerCase().includes(query);
        const matchesIdeology = symbol.ideology?.toLowerCase().includes(query);
        const matchesColor = symbol.color?.toLowerCase().includes(query);
        const matchesShape = symbol.shape?.toLowerCase().includes(query);
        const matchesOrigin = symbol.origin_story?.toLowerCase().includes(query);
        const matchesCultural = symbol.cultural_significance?.toLowerCase().includes(query);
        const matchesHistorical = symbol.historical_use?.toLowerCase().includes(query);
        
        const matchesTags = typeof symbol.tags === 'string' ? symbol.tags.toLowerCase().includes(query) : false;
        const matchesKeywords = typeof symbol.keywords === 'string' ? symbol.keywords.toLowerCase().includes(query) : false;
        
        return matchesName || matchesParty || matchesType || matchesRegion || 
               matchesIdeology || matchesColor || matchesShape || matchesOrigin || 
               matchesCultural || matchesHistorical || matchesTags || matchesKeywords;
      }
      
      return true;
    });
}