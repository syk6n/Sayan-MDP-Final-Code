import { X, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { PoliticalSymbol } from '../types';

interface SymbolDetailsProps {
  symbol: PoliticalSymbol;
  onClose: () => void;
}

export function SymbolDetails({ symbol, onClose }: SymbolDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline'>('details');
  
  const timelineEvents = symbol.timeline.split(';').map(event => event.trim()).filter(Boolean);
  const hasTimeline = timelineEvents.length > 0;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/90 border border-white/10 rounded-lg max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'details' 
                  ? 'bg-white text-black' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Symbol Details
            </button>
            {hasTimeline && (
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                  activeTab === 'timeline' 
                    ? 'bg-white text-black' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Clock size={18} />
                Timeline
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {activeTab === 'details' ? (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">{symbol.symbol_name}</h2>
                <span className="text-white/60">|</span>
                <h3 className="text-xl text-white/80">{symbol.party_name}</h3>
              </div>
              
              <div className="space-y-6">
                {/* Origin Story */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white/80">Origin Story</h3>
                  <p className="text-white/60">{symbol.origin_story}</p>
                </div>

                {/* Cultural Significance */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white/80">Cultural Significance</h3>
                  <p className="text-white/60">{symbol.cultural_significance}</p>
                </div>

                {/* Historical Use */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white/80">Historical Use</h3>
                  <p className="text-white/60">{symbol.historical_use}</p>
                </div>

                {/* Evolution */}
                {symbol.evolution && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white/80">Evolution</h3>
                    <p className="text-white/60">{symbol.evolution}</p>
                  </div>
                )}

                {/* Symbol Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white/80">Symbol Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-white/80 font-medium min-w-20">Color:</span>
                      <span className="text-white/60">{symbol.color}</span>
                    </div>
                    {symbol.shape && (
                      <div className="flex items-start gap-2">
                        <span className="text-white/80 font-medium min-w-20">Shape:</span>
                        <span className="text-white/60">{symbol.shape}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white/50">Type</span>
                    <p className="text-white font-medium">{symbol.type}</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white/50">Region</span>
                    <p className="text-white font-medium">{symbol.region}</p>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <span className="text-white/50">Ideology</span>
                    <p className="text-white font-medium">{symbol.ideology}</p>
                  </div>
                  {symbol.creation_year && (
                    <div className="bg-white/5 rounded p-3">
                      <span className="text-white/50">Created</span>
                      <p className="text-white font-medium">{symbol.creation_year}</p>
                    </div>
                  )}
                </div>

                {/* Tags and Keywords */}
                <div className="space-y-4">
                  {symbol.tags && (
                    <div>
                      <h3 className="text-sm font-medium text-white/70 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {symbol.tags.split(',').map(tag => (
                          <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {symbol.keywords && (
                    <div>
                      <h3 className="text-sm font-medium text-white/70 mb-2">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {symbol.keywords.split(',').map(keyword => (
                          <span key={keyword} className="bg-white/5 px-3 py-1 rounded-full text-sm text-white/60">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent flex items-center gap-2">
                <Clock className="text-white/60" size={20} />
                Historical Timeline
              </h2>
              
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}