import { Seat, BookingDuration } from '../types';
import { Clock, CheckSquare, Coins, CalendarDays, Sparkles } from 'lucide-react';

interface BookingWidgetProps {
  selectedSeat: Seat | null;
  duration: BookingDuration;
  onSelectDuration: (duration: BookingDuration) => void;
  onConfirm: () => void;
  isLoggedIn: boolean;
  onTriggerLogin: () => void;
}

export default function BookingWidget({
  selectedSeat,
  duration,
  onSelectDuration,
  onConfirm,
  isLoggedIn,
  onTriggerLogin
}: BookingWidgetProps) {
  // Compute cost
  const getHours = (dur: BookingDuration): number => {
    if (dur === '1 Hour') return 1;
    if (dur === '4 Hours') return 4;
    return 12; // Full day represents 12 hours from 7 AM - 12 PM slot limits
  };

  const getPrice = (): number => {
    if (!selectedSeat) return 0;
    const rate = selectedSeat.pricePerHour;
    const hrs = getHours(duration);
    if (duration === 'Full Day') {
      // Offer a discount for full days
      return selectedSeat.zone === 'Premium' ? 120 : 80;
    }
    return rate * hrs;
  };

  const calcSavings = (): number => {
    if (!selectedSeat || duration !== 'Full Day') return 0;
    const rate = selectedSeat.pricePerHour;
    const standardCost = rate * 12;
    const actualCost = getPrice();
    return Math.max(0, standardCost - actualCost);
  };

  const durationOptions: BookingDuration[] = ['1 Hour', '4 Hours', 'Full Day'];

  return (
    <div id="booking-widget" className="glass-card p-6 md:p-8 rounded-3xl sticky top-28 shadow-xl flex flex-col justify-between h-fit transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 rounded-full" />
      
      <div>
        {/* Widget Heading */}
        <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/15 pb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-on-surface">Seat Reservation Hub</h3>
        </div>

        {selectedSeat ? (
          <div className="space-y-6">
            {/* Quick durations */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-3">
                Select Session Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {durationOptions.map((opt) => {
                  const isActive = duration === opt;
                  return (
                    <button
                      key={opt}
                      id={`btn-duration-${opt.replace(' ', '-')}`}
                      onClick={() => onSelectDuration(opt)}
                      className={`px-2 py-3.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-primary-container text-on-primary-container shadow-md shadow-primary/10'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected seat meta spec */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-3">
                Seat Configuration
              </label>
              <div className="flex items-center justify-between p-4 bg-surface-container rounded-2xl border border-outline-variant/20">
                <div>
                  <span className="text-sm font-sans text-on-surface-variant block">Selected Cubicle</span>
                  <span className="font-extrabold text-xl text-on-surface font-mono">Desk #{selectedSeat.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    {selectedSeat.zone} Zone
                  </span>
                </div>
              </div>
            </div>

            {/* Features spec list */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-2.5">
                Included High-End Amenities
              </label>
              <ul className="space-y-2 bg-surface-container/40 p-4 rounded-xl border border-outline-variant/10">
                {selectedSeat.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <CheckSquare className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price dynamic metrics replaced with monthly billing notification */}
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 space-y-3">
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                <span>Billing Cycle</span>
                <span className="text-primary font-bold">Postpaid Monthly</span>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant">
                <span>Reserved Duration</span>
                <span className="font-semibold text-on-surface">{getHours(duration)} Hour Session</span>
              </div>
              
              <div className="w-full h-px bg-outline-variant/20 my-2" />
              
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface block">Month-End Collection Policy</span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Hourly rates have been completely waived from direct seat booking. Your seat reservation is registered under your student profile and all charges are collected collectively by the end of every month. Just book and focus on your studies!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-2">
              <Clock className="w-6 h-6 text-on-surface-variant opacity-60" />
            </div>
            <h4 className="text-sm font-bold text-on-surface">No Cubicle Selected</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs">
              Take a look at our interactive real-time floor plan layout and pick any active/available seat to draft your booking duration and explore individual cubicle features.
            </p>
          </div>
        )}
      </div>

      {selectedSeat && (
        <div className="pt-6 mt-6 border-t border-outline-variant/15">
          {isLoggedIn ? (
            <button
              id="btn-confirm-booking"
              onClick={onConfirm}
              className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10 cursor-pointer"
            >
              Confirm Booking
            </button>
          ) : (
            <button
              id="btn-login-to-book"
              onClick={onTriggerLogin}
              className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In to Complete Reservation</span>
            </button>
          )}
          <p className="text-[10px] text-on-surface-variant/70 text-center mt-3">
            By booking, you agree to our silent space policy & Wi-Fi guidelines.
          </p>
        </div>
      )}
    </div>
  );
}
