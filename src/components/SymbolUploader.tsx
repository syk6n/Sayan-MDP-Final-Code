import { useState } from 'react';
import { SymbolImportData } from '../types';
import { X, Upload, FileText, Check, AlertCircle } from 'lucide-react';

interface SymbolUploaderProps {
  onClose: () => void;
  onUpload: (symbols: SymbolImportData[]) => void;
}

export function SymbolUploader({ onClose, onUpload }: SymbolUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<SymbolImportData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        // Validate data structure
        if (!Array.isArray(data)) {
          throw new Error('File must contain an array of symbols');
        }
        
        // Check first few items for required fields
        const requiredFields = ['symbol_id', 'symbol_name', 'type', 'region', 'ideology', 'color'];
        const sampleItem = data[0];
        
        const missingFields = requiredFields.filter(field => !sampleItem.hasOwnProperty(field));
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        
        // Validate image URLs
        const invalidImageUrls = data
          .filter(item => item.image_url && !isValidImageUrl(item.image_url))
          .map(item => item.symbol_id);
          
        if (invalidImageUrls.length > 0) {
          console.warn(`Some symbols have potentially invalid image URLs: ${invalidImageUrls.join(', ')}`);
        }
        
        setPreview(data.slice(0, 3)); // Show preview of first 3 items
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid file format');
        setFile(null);
      }
    };
    
    reader.readAsText(selectedFile);
  };

  const isValidImageUrl = (url: string): boolean => {
    // Basic URL validation for images
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null || 
           url.startsWith('https://images.unsplash.com/') ||
           url.startsWith('https://source.unsplash.com/');
  };

  const handleUpload = () => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        onUpload(data);
        setIsUploaded(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process file');
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-black/90 border border-white/10 rounded-lg max-w-2xl w-full mx-4 my-8 relative max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-xl font-bold">Upload Symbol Data</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {isUploaded ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Successful!</h3>
              <p className="text-white/60 mb-6">Your symbol data has been successfully imported.</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black rounded-md font-medium"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-white/70 mb-6">
                Upload a JSON file containing your symbol data. The file should contain an array of objects with the following structure:
              </p>
              
              <div className="bg-white/5 rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-sm text-white/70">
{`[
  {
    "symbol_id": "unique-id",
    "symbol_name": "Symbol Name",
    "party_name": "Party Name",
    "image_url": "https://example.com/image.jpg",
    "type": "Flora|Object|Animal",
    "region": "North|South|East|West|National",
    "ideology": "Nationalist|Socialist|Regionalist",
    "color": "Primary color",
    "shape": "Shape description",
    "historical_use": "Historical context",
    "creation_year": 1980,
    "tags": "comma,separated,tags",
    "keywords": "comma,separated,keywords"
  },
  ...
]`}
                </pre>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">Upload JSON File</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  {file ? (
                    <div>
                      <FileText size={32} className="mx-auto mb-2 text-white/60" />
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-white/60 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                      <button 
                        onClick={() => setFile(null)}
                        className="mt-3 text-sm text-white/60 hover:text-white underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload size={32} className="mx-auto mb-2 text-white/60" />
                      <p className="mb-2">Drag and drop your JSON file here, or</p>
                      <label className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md cursor-pointer">
                        Browse Files
                        <input 
                          type="file" 
                          accept=".json" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
                {error && (
                  <div className="mt-3 text-red-400 text-sm flex items-start gap-2">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </div>
              
              {preview.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <div className="bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-white/60 border-b border-white/10">
                          <th className="text-left py-2 px-3">ID</th>
                          <th className="text-left py-2 px-3">Name</th>
                          <th className="text-left py-2 px-3">Type</th>
                          <th className="text-left py-2 px-3">Region</th>
                          <th className="text-left py-2 px-3">Image URL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preview.map((item, index) => (
                          <tr key={index} className="border-b border-white/5">
                            <td className="py-2 px-3">{item.symbol_id}</td>
                            <td className="py-2 px-3">{item.symbol_name}</td>
                            <td className="py-2 px-3">{item.type}</td>
                            <td className="py-2 px-3">{item.region}</td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                {item.image_url ? (
                                  <>
                                    <div className="w-6 h-6 bg-white/10 rounded overflow-hidden">
                                      {isValidImageUrl(item.image_url) ? (
                                        <img 
                                          src={item.image_url} 
                                          alt={item.symbol_name}
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/50?text=Error';
                                          }}
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-white/40">?</div>
                                      )}
                                    </div>
                                    <span className="text-xs text-white/40 truncate max-w-[100px]">{item.image_url}</span>
                                  </>
                                ) : (
                                  <span className="text-xs text-white/40">No image</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-white/50 text-xs mt-2">Showing {preview.length} of {file?.name} items</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className={`px-6 py-2 rounded-md font-medium ${
                    file ? 'bg-white text-black' : 'bg-white/20 text-white/50 cursor-not-allowed'
                  }`}
                >
                  Upload
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}