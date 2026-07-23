import React, { useState, useEffect, useRef, useCallback } from 'react';

interface PartnerHotel {
  name: string;
  type: string;
  tag: string;
  image: string;
}

interface HotelCarouselProps {
  hotels: PartnerHotel[];
  speed?: number;
}

export default function HotelCarousel({ hotels, speed = 60 }: HotelCarouselProps) {
  const [cardWidth, setCardWidth] = useState(300);
  const [edgePeek, setEdgePeek] = useState(40);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const velocityRef = useRef(0);
  const easeBackRef = useRef<number | null>(null);

  const cardGap = 24;
  const maxCardWidth = 420;
  const visibleCards = 2;

  const duplicatedHotels = [...hotels, ...hotels, ...hotels, ...hotels];

  const getDimensions = useCallback(() => {
    if (typeof window === 'undefined') return { cardWidth: 280, edgePeek: 40 };
    const containerWidth = Math.min(window.innerWidth - 32, 1280);
    const totalGap = cardGap * (visibleCards - 1);
    const availableForCards = containerWidth - totalGap;
    const calculatedWidth = availableForCards / visibleCards;
    const finalCardWidth = Math.min(calculatedWidth, maxCardWidth);
    const totalUsed = finalCardWidth * visibleCards + totalGap;
    const finalEdgePeek = Math.max(20, (containerWidth - totalUsed) / 2);
    return { cardWidth: finalCardWidth, edgePeek: finalEdgePeek };
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      const { cardWidth, edgePeek } = getDimensions();
      setCardWidth(cardWidth);
      setEdgePeek(edgePeek);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [getDimensions]);

  const oneSetWidth = hotels.length * (cardWidth + cardGap);

  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isPausedRef.current && !isDraggingRef.current) {
      offsetRef.current -= (speed * delta) / 1000;

      if (Math.abs(offsetRef.current) >= oneSetWidth) {
        offsetRef.current += oneSetWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current + edgePeek}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [speed, oneSetWidth, edgePeek]);

  useEffect(() => {
    offsetRef.current = -oneSetWidth;
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, oneSetWidth]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
    }
  };

  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    dragStartOffsetRef.current = offsetRef.current;
    velocityRef.current = 0;
    if (easeBackRef.current) {
      cancelAnimationFrame(easeBackRef.current);
      easeBackRef.current = null;
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + delta;
    velocityRef.current = delta;
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    offsetRef.current -= e.deltaY * 0.5;
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {duplicatedHotels.map((hotel, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden text-center hover:bg-brand-50 hover:border-brand-100 transition select-none"
              style={{ width: cardWidth, marginRight: cardGap }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>
              <div className="p-5">
                <div className="text-xl font-bold text-slate-800 truncate">{hotel.name}</div>
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <span className="text-base bg-brand-100 text-brand-700 px-3 py-1.5 rounded font-bold">
                    {hotel.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
