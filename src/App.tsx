import { useState } from 'react';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import { SymbolDetails } from './components/SymbolDetails';
import { SymbolUploader } from './components/SymbolUploader';
import { PoliticalSymbol, SymbolImportData } from './types';
import { useStore } from './store';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<PoliticalSymbol | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const { addCustomSymbols } = useStore();

  const handleSymbolUpload = (symbols: SymbolImportData[]) => {
    addCustomSymbols(symbols);
    setIsUploaderOpen(false);
  };

  return (
    <div className="w-full h-screen relative">
      <Scene onSymbolClick={setSelectedSymbol} />
      <UI onOpenUploader={() => setIsUploaderOpen(true)} />
      {selectedSymbol && (
        <SymbolDetails 
          symbol={selectedSymbol} 
          onClose={() => setSelectedSymbol(null)} 
        />
      )}
      {isUploaderOpen && (
        <SymbolUploader 
          onClose={() => setIsUploaderOpen(false)}
          onUpload={handleSymbolUpload}
        />
      )}
    </div>
  );
}

export default App