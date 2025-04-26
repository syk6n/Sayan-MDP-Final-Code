export interface PoliticalSymbol {
  symbol_id: string;
  symbol_name: string;
  party_name: string;
  image_url: string;
  type: 'Flora' | 'Object' | 'Animal';
  region: 'North' | 'South' | 'East' | 'West' | 'National';
  ideology: 'Nationalist' | 'Socialist' | 'Regionalist';
  color: string;
  shape: string;
  historical_use: string;
  origin_story: string;
  cultural_significance: string;
  evolution: string;
  timeline: string;
  creation_year: number;
  tags: string;
  keywords: string;
}

export interface TimelineEvent {
  event_id: string;
  year: number;
  title: string;
  description: string;
  party_id: string;
  symbol_id: string;
}

// New interface for symbol data import
export interface SymbolImportData extends PoliticalSymbol {}