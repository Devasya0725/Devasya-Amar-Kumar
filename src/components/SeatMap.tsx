import { Seat } from '../types';
import { CircleDot, Armchair, HelpCircle } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  selectedSeatId: number | null;
  onSelectSeat: (id: number) => void;
}

export default function SeatMap({ seats, selectedSeatId, onSelectSeat }: SeatMapProps) {
  const premiumSeats = seats.filter(s => s.zone === 'Premium');
  const standardSeats = seats.filter(s => s.zone === 'Standard');

  const totalSeats = seats.length;
  const occupiedCount = seats.filter(s => s.isOccupied).length;
  const availableCount = totalSeats - occupiedCount;

  return (
    <div id="seat-map-container" className="flex flex-col h-full bg-surface-container/30 border border-outline-variant/30 rounded-3xl p-6 md:p-8">
      {/* Floorplan Stats Panel */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-outline-variant/20 pb-4">
        <div>
          <h3 className="text-base font-bold text-on-surface">Interactive Floor Plan</h3>
          <p className="text-xs text-on-surface-variant">Click an available desk cubicle below to draft your reservation.</p>
        </div>
        
        {/* Real-time stats */}
        <div className="flex gap-4 text-xs font-mono">
          <div className="bg-surface-container max-sm:px-2 px-3 py-1.5 rounded-lg border border-outline-variant/20 text-center">
            <span className="text-on-surface-variant block uppercase text-[9px] font-sans">Total</span>
            <strong className="text-on-surface text-sm">{totalSeats}</strong>
          </div>
          <div className="bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20 text-center">
            <span className="text-primary block uppercase text-[9px] font-sans">Available</span>
            <strong className="text-primary text-sm">{availableCount}</strong>
          </div>
          <div className="bg-surface-variant/40 px-3 py-1.5 rounded-lg border border-outline-variant/10 text-center col">
            <span className="text-on-surface-variant block uppercase text-[9px] font-sans">Occupied</span>
            <strong className="text-on-secondary-container text-sm">{occupiedCount}</strong>
          </div>
        </div>
      </div>

      {/* Grid Layouts divided by bays */}
      <div className="space-y-6 flex-1">
        {/* Premium Zone */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold font-sans uppercase tracking-widest text-primary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Premium Quiet Zone (Desks 1 - 12)
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded border border-emerald-900/30 uppercase tracking-wider">Fees Collected Monthly</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-3">
            {premiumSeats.map((seat) => {
              const isSelected = selectedSeatId === seat.id;
              return (
                <button
                  key={seat.id}
                  id={`btn-seat-${seat.id}`}
                  disabled={seat.isOccupied}
                  onClick={() => onSelectSeat(seat.id)}
                  title={seat.isOccupied ? `Occupied by ${seat.occupiedBy}` : `Desk #${seat.id} (Premium)`}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center font-mono font-semibold text-xs sm:text-sm tracking-tighter transition-all duration-300 select-none ${
                    seat.isOccupied 
                      ? 'bg-surface-variant/25 text-on-surface-variant border border-outline-variant/10 cursor-not-allowed opacity-50'
                      : isSelected
                        ? 'bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(87,241,219,0.35)] stroke-[3] border border-primary scale-[1.03]'
                        : 'border border-outline-variant/30 text-on-surface hover:border-primary/80 hover:bg-primary/5 cursor-pointer'
                  }`}
                >
                  <span className="absolute top-1 text-[8px] sm:text-[9px] uppercase tracking-wide opacity-50 pointer-events-none">A</span>
                  <span className="pt-2">{seat.id}</span>
                  {isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-on-primary"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Standard Zone */}
        <div>
          <div className="flex justify-between items-center mb-3 pt-2">
            <span className="text-xs font-bold font-sans uppercase tracking-widest text-secondary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Standard Seating Zone (Desks 13 - 40)
            </span>
            <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/40 px-3 py-1 rounded border border-blue-900/30 uppercase tracking-wider">Fees Collected Monthly</span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 gap-2">
            {standardSeats.map((seat) => {
              const isSelected = selectedSeatId === seat.id;
              return (
                <button
                  key={seat.id}
                  id={`btn-seat-${seat.id}`}
                  disabled={seat.isOccupied}
                  onClick={() => onSelectSeat(seat.id)}
                  title={seat.isOccupied ? `Occupied by ${seat.occupiedBy}` : `Desk #${seat.id} (Standard)`}
                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center font-mono font-semibold text-xs transition-all duration-300 select-none ${
                    seat.isOccupied 
                      ? 'bg-surface-variant/25 text-on-surface-variant border border-outline-variant/10 cursor-not-allowed opacity-50'
                      : isSelected
                        ? 'bg-primary text-on-primary font-bold shadow-[0_0_12px_rgba(87,241,219,0.3)] border border-primary scale-[1.03]'
                        : 'border border-outline-variant/30 text-on-surface hover:border-primary/80 hover:bg-primary/5 cursor-pointer'
                  }`}
                >
                  <span className="absolute top-0.5 text-[8px] uppercase tracking-wide opacity-45 pointer-events-none">B</span>
                  <span className="pt-1.5">{seat.id}</span>
                  {isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-on-primary"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Interactive Legend */}
      <div id="seat-legend" className="mt-8 pt-4 border-t border-outline-variant/15 flex flex-wrap gap-4 text-xs font-medium text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md border border-outline-variant/30 flex items-center justify-center bg-transparent"></span> 
          <span>Available Cubicle</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-surface-variant/25 border border-outline-variant/10 opacity-50"></span> 
          <span>Occupied / Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-primary shadow-sm shadow-primary/25"></span> 
          <span>Your Draft Choice</span>
        </div>
      </div>
    </div>
  );
}
