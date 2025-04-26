import { Search, Palette, Tag, Calendar, Filter, Info, X, Upload } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';

interface UIProps {
  onOpenUploader: () => void;
}

export function UI({ onOpenUploader }: UIProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    filters, 
    setTypeFilter, 
    setRegionFilter, 
    setIdeologyFilter,
    setColorFilter,
    setSearchQuery: setStoreSearchQuery,
    resetFilters,
    filteredSymbols,
    searchOpen,
    setSearchOpen
  } = useStore();

  const handleMenuClick = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setStoreSearchQuery(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setStoreSearchQuery('');
    setSearchOpen(false);
  };

  const uniqueTags = Array.from(new Set(
    filteredSymbols
      .flatMap(symbol => [
        ...(typeof symbol.tags === 'string' ? symbol.tags.split(',').map(tag => tag.trim()) : []),
        ...(typeof symbol.keywords === 'string' ? symbol.keywords.split(',').map(keyword => keyword.trim()) : [])
      ])
      .filter(tag => tag && tag.length > 0)
  )).slice(0, 10);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Logo */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto z-50">
        <img 
          src="/logo.svg"
          alt="Logo" 
          className="w-24 h-auto opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Left Side - Parameter Selections */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 space-y-6 pointer-events-auto">
        <div className="flex flex-col items-center gap-4">
          {/* Color Parameter */}
          <div className="relative">
            <button 
              className={`w-16 h-16 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${activeMenu === 'color' ? 'ring-2 ring-white' : ''}`}
              onClick={() => handleMenuClick('color')}
            >
              <Palette className="text-white" size={28} />
            </button>
            {activeMenu === 'color' && (
              <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 rounded-lg p-4 w-48">
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Saffron', 'White', 'Black', 'Tricolor'].map(color => (
                    <button 
                      key={color}
                      onClick={() => {
                        setColorFilter(color.toLowerCase());
                        setActiveMenu(null);
                      }}
                      className={`w-full py-1 px-2 rounded text-xs ${
                        filters.color === color.toLowerCase() 
                          ? 'bg-white text-black' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Type Parameter */}
          <div className="relative">
            <button 
              className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${activeMenu === 'type' ? 'ring-2 ring-white' : ''}`}
              onClick={() => handleMenuClick('type')}
            >
              <Tag className="text-white" size={28} />
            </button>
            {activeMenu === 'type' && (
              <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 rounded-lg p-4 w-48">
                <h3 className="text-lg font-semibold mb-3">Type</h3>
                <div className="space-y-2">
                  {['Flora', 'Object', 'Animal'].map(type => (
                    <button 
                      key={type}
                      onClick={() => {
                        setTypeFilter(type);
                        setActiveMenu(null);
                      }}
                      className={`w-full py-2 px-3 rounded ${
                        filters.type === type 
                          ? 'bg-white text-black' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Year Parameter */}
          <div className="relative">
            <button 
              className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${activeMenu === 'year' ? 'ring-2 ring-white' : ''}`}
              onClick={() => handleMenuClick('year')}
            >
              <Calendar className="text-white" size={28} />
            </button>
            {activeMenu === 'year' && (
              <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 rounded-lg p-4 w-48">
                <h3 className="text-lg font-semibold mb-3">Year</h3>
                <div className="space-y-2">
                  <button className="w-full py-2 px-3 rounded bg-white/10 hover:bg-white/20">Pre-1950</button>
                  <button className="w-full py-2 px-3 rounded bg-white/10 hover:bg-white/20">1950-1980</button>
                  <button className="w-full py-2 px-3 rounded bg-white/10 hover:bg-white/20">1980-2000</button>
                  <button className="w-full py-2 px-3 rounded bg-white/10 hover:bg-white/20">2000-Present</button>
                </div>
              </div>
            )}
          </div>

          {/* Upload */}
          <div className="relative">
            <button 
              className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${activeMenu === 'upload' ? 'ring-2 ring-white' : ''}`}
              onClick={onOpenUploader}
            >
              <Upload className="text-white" size={28} />
            </button>
          </div>

          {/* About */}
          <div className="relative">
            <button 
              className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${activeMenu === 'about' ? 'ring-2 ring-white' : ''}`}
              onClick={() => handleMenuClick('about')}
            >
              <Info className="text-white" size={28} />
            </button>
            {activeMenu === 'about' && (
              <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 rounded-lg p-4 w-64">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-sm text-white/70">
                  Explore the visual language of Indian political symbols in this interactive 3D space. 
                  Discover the meanings, origins, and evolution of symbols that represent political ideologies across India.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Filters */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 w-64">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <button 
              onClick={resetFilters}
              className="text-xs text-white/60 hover:text-white"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Region</label>
              <div className="grid grid-cols-2 gap-2">
                {['North', 'South', 'East', 'West', 'National'].map(region => (
                  <button 
                    key={region}
                    onClick={() => setRegionFilter(region)}
                    className={`py-1.5 px-2 rounded text-sm ${
                      filters.region === region 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Ideology</label>
              <div className="space-y-2">
                {['Nationalist', 'Socialist', 'Regionalist'].map(ideology => (
                  <button 
                    key={ideology}
                    onClick={() => setIdeologyFilter(ideology)}
                    className={`w-full py-1.5 px-3 rounded text-sm ${
                      filters.ideology === ideology 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {ideology}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Creation Period</label>
              <select className="w-full bg-white/10 rounded px-3 py-2 text-sm">
                <option value="">All Periods</option>
                <option value="pre-independence">Pre-Independence</option>
                <option value="post-independence">Post-Independence</option>
                <option value="modern">Modern Era (2000+)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Search */}
      {searchOpen ? (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-auto">
          <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Search Symbols</h2>
              <button 
                onClick={clearSearch}
                className="text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, color, shape, meaning, or tags..."
                  className="w-full bg-white/10 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-1 focus:ring-white/30"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-3 top-3.5 text-white/50" size={20} />
              </div>
            </form>
            {uniqueTags.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-white/70 mb-2">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      className="bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 text-xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-4">
          {searchQuery && (
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <span className="text-sm">{searchQuery}</span>
              <button
                onClick={clearSearch}
                className="hover:text-white/80"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <button 
            onClick={() => setSearchOpen(true)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 transition-colors"
          >
            <Search size={20} />
            <span>I want to see...</span>
          </button>
        </div>
      )}
    </div>
  );
}