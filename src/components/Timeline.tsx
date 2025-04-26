import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { timelineEvents } from '../data/political-data';
import { TimelineEvent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineProps {
  onEventClick: (event: TimelineEvent) => void;
}

export function Timeline({ onEventClick }: TimelineProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  
  const sortedEvents = timelineEvents.sort((a, b) => a.year - b.year);
  const visibleEvents = sortedEvents.slice(startIndex, startIndex + 3);
  
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + 3 < timelineEvents.length;

  // Auto-scroll effect
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        if (canScrollRight) {
          setStartIndex(i => i + 1);
          setSliderPosition((startIndex + 1) * (100 / (timelineEvents.length - 2)));
        } else {
          setStartIndex(0);
          setSliderPosition(0);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [canScrollRight, isDragging, startIndex]);

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEventId(event.event_id);
    onEventClick(event);
  };

  const handleSliderDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newIndex = Math.min(
      timelineEvents.length - 3,
      Math.round((percentage / 100) * (timelineEvents.length - 2))
    );
    
    setStartIndex(newIndex);
    setSliderPosition(percentage);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-16 pb-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="text-white/60" size={24} />
            </motion.div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Symbol Evolution Timeline
            </h2>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setStartIndex(i => Math.max(0, i - 1));
                setSliderPosition(Math.max(0, sliderPosition - (100 / (timelineEvents.length - 2))));
              }}
              disabled={!canScrollLeft}
              className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              aria-label="Previous events"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setStartIndex(i => Math.min(timelineEvents.length - 3, i + 1));
                setSliderPosition(Math.min(100, sliderPosition + (100 / (timelineEvents.length - 2))));
              }}
              disabled={!canScrollRight}
              className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              aria-label="Next events"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Timeline Slider */}
        <div 
          ref={sliderRef}
          className="relative h-2 bg-white/10 rounded-full mb-8 cursor-pointer"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleSliderDrag}
        >
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
            style={{ width: `${sliderPosition}%` }}
            animate={{ width: `${sliderPosition}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full -ml-2"
            style={{ left: `${sliderPosition}%` }}
            animate={{ left: `${sliderPosition}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visibleEvents.map((event, index) => (
              <motion.button
                key={event.event_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleEventClick(event)}
                className={`group relative bg-white/5 hover:bg-white/10 rounded-lg p-6 text-left transition-all duration-300 ${
                  selectedEventId === event.event_id ? 'ring-2 ring-white/20' : ''
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                  whileHover={{ opacity: 1 }}
                />
                
                <div className="relative">
                  <motion.div
                    className="flex items-center justify-between mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-3xl font-bold text-white/80 font-mono">{event.year}</span>
                    <span className="text-sm text-white/40 uppercase tracking-wider">{event.symbol_id}</span>
                  </motion.div>
                  <h3 className="font-semibold mb-2 text-lg group-hover:text-white transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    {event.description}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="flex gap-2">
            {sortedEvents.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setStartIndex(Math.min(timelineEvents.length - 3, index));
                  setSliderPosition((index * 100) / (timelineEvents.length - 2));
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                  index >= startIndex && index < startIndex + 3
                    ? 'bg-white scale-100'
                    : 'bg-white/20 scale-75 hover:scale-90'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}