import { useState, useEffect, useRef } from 'react';
import { INITIAL_SEATS } from './data';
import { Seat, BookingDuration, Booking, UserProfile } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SeatMap from './components/SeatMap';
import BookingWidget from './components/BookingWidget';
import Amenities from './components/Amenities';
import OperatingHours from './components/OperatingHours';
import Gallery from './components/Gallery';
import InteractiveMap from './components/InteractiveMap';
import Footer from './components/Footer';
import { CheckCircle2, Clock, Trash2, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

export default function App() {
  // Initialize States with Local Storage persistent synchronization
  const [seats, setSeats] = useState<Seat[]>(() => {
    const saved = localStorage.getItem('scholarspace_seats');
    return saved ? JSON.parse(saved) : INITIAL_SEATS;
  });

  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);
  const [duration, setDuration] = useState<BookingDuration>('4 Hours');
  
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('scholarspace_user');
    return saved ? JSON.parse(saved) : {
      name: 'Scholar Student',
      email: 'student@scholarspace.edu',
      phone: '9149777486',
      isLoggedIn: true
    };
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('scholarspace_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [activeCountdown, setActiveCountdown] = useState<string>('');

  // Sync state to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('scholarspace_seats', JSON.stringify(seats));
  }, [seats]);

  useEffect(() => {
    localStorage.setItem('scholarspace_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('scholarspace_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Countdown timer clock ticks for the currently active booking
  useEffect(() => {
    const activeBooking = bookings.find(b => b.status === 'active');
    if (!activeBooking) {
      setActiveCountdown('');
      return;
    }

    const interval = setInterval(() => {
      const targetTime = new Date(activeBooking.endTime).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Complete the session
        const updated = bookings.map(b => b.id === activeBooking.id ? { ...b, status: 'completed' as const } : b);
        setBookings(updated);
        
        // Return seat to available
        const updatedSeats = seats.map(s => s.id === activeBooking.seatId ? { ...s, isOccupied: false, occupiedBy: null } : s);
        setSeats(updatedSeats);

        setActiveCountdown('');
        clearInterval(interval);
      } else {
        const hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);
        
        const pad = (n: number) => n.toString().padStart(2, '0');
        setActiveCountdown(`${pad(hrs)}h : ${pad(mins)}m : ${pad(secs)}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings, seats]);

  // Handle seat clicks
  const handleSelectSeat = (seatId: number) => {
    setSelectedSeatId(seatId);
  };

  // Perform reserving action
  const handleConfirmReservation = () => {
    if (!selectedSeatId) return;
    const selectedSeat = seats.find(s => s.id === selectedSeatId);
    if (!selectedSeat || selectedSeat.isOccupied) return;

    // Trigger calculation
    const currentPrice = selectedSeat.zone === 'Premium' 
      ? (duration === '1 Hour' ? 15 : duration === '4 Hours' ? 60 : 120)
      : (duration === '1 Hour' ? 10 : duration === '4 Hours' ? 40 : 80);

    const now = new Date();
    const end = new Date(now.getTime());
    if (duration === '1 Hour') end.setHours(end.getHours() + 1);
    else if (duration === '4 Hours') end.setHours(end.getHours() + 4);
    else end.setHours(end.getHours() + 12); // Full day block

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      seatId: selectedSeatId,
      duration,
      startTime: now.toISOString(),
      endTime: end.toISOString(),
      status: 'active',
      pricePaid: currentPrice,
      seatZone: selectedSeat.zone
    };

    // Update Seat occupancy state immediately so visual changes reflect across entire grid and maps
    const updatedSeats = seats.map(s => 
      s.id === selectedSeatId 
        ? { ...s, isOccupied: true, occupiedBy: user.name } 
        : s
    );

    // Cancel other active bookings representing physical desk constraints
    const cleanBookings = bookings.map(b => b.status === 'active' ? { ...b, status: 'completed' as const } : b);

    setSeats(updatedSeats);
    setBookings([newBooking, ...cleanBookings]);
    setBookingSuccess(newBooking);
    setSelectedSeatId(null);

    // Auto-scroll screen overlay to success notification box smoothly
    setTimeout(() => {
      document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Cancel reservation prior to timing limits
  const handleCancelBooking = (bookingId: string, seatId: number) => {
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);

    const updatedSeats = seats.map(s => s.id === seatId ? { ...s, isOccupied: false, occupiedBy: null } : s);
    setSeats(updatedSeats);
  };

  // Smooth scroll routine inside index targets
  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const navHeight = 80;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  };

  const selectedSeat = selectedSeatId !== null ? seats.find(s => s.id === selectedSeatId) || null : null;
  const activeBooking = bookings.find(b => b.status === 'active');

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col pt-0 selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden">
      
      {/* Navbar segment */}
      <Navbar 
        user={user} 
        onChangeProfile={(p) => setUser(p)}
        onScrollTo={handleScrollToSection}
      />

      {/* Main Core View Area */}
      <main className="flex-1">
        
        {/* Banner Success Modal or top card */}
        {bookingSuccess && (
          <div id="booking-success-toast" className="bg-primary-container/20 border-b border-primary/30 p-4 sticky top-16 z-40 backdrop-blur-md animate-in slide-in-from-top duration-300">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 animate-bounce">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                    Reservation Secured! Welcome to Whispering Pages
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Check-in verified at <strong>Desk #{bookingSuccess.seatId} ({bookingSuccess.seatZone} Zone)</strong> for <strong>{bookingSuccess.duration}</strong>.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleScrollToSection('booking-dashboard')}
                  className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-bold hover:brightness-110 select-none cursor-pointer"
                >
                  Track Countdown
                </button>
                <button 
                  onClick={() => setBookingSuccess(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-surface-container-highest text-on-surface select-none cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Segment */}
        <Hero onScrollTo={handleScrollToSection} />

        {/* Dynamic Booking Core Dashboard Section */}
        <section id="booking" className="py-24 px-6 md:px-16 max-w-7xl mx-auto transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Seating map layout */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex flex-col gap-2">
                <span className="text-primary font-bold text-xs uppercase tracking-widest block">
                  Interactive Floorplan
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight leading-none">
                  Select Your Silent Desk Cubicle
                </h2>
              </div>
              
              <SeatMap 
                seats={seats}
                selectedSeatId={selectedSeatId}
                onSelectSeat={handleSelectSeat}
              />
            </div>

            {/* Float booking widget panel */}
            <div className="lg:col-span-4 h-full">
              <BookingWidget 
                selectedSeat={selectedSeat}
                duration={duration}
                onSelectDuration={(d) => setDuration(d)}
                onConfirm={handleConfirmReservation}
                isLoggedIn={user.isLoggedIn}
                onTriggerLogin={() => {
                  const el = document.getElementById('btn-profile-trigger') || document.getElementById('nav-brand');
                  el?.click();
                }}
              />
            </div>
          </div>
        </section>

        {/* Active Session & Pre-booking Dashboard Tracker Panel */}
        {(bookings.length > 0 || activeBooking) && (
          <section id="booking-dashboard" className="py-16 bg-surface-container-low border-y border-outline-variant/15 px-6 md:px-16">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-primary" />
                    Personal Student Hub
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface mt-1">
                    Studies Tracking &amp; History
                  </h3>
                </div>
                
                {activeCountdown && (
                  <div className="bg-primary/10 border border-primary/25 px-5 py-2.5 rounded-2xl flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs uppercase tracking-wider text-primary font-bold">Time Left:</span>
                    <span className="font-mono text-base font-extrabold text-primary">{activeCountdown}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Booking Monitor */}
                <div className="md:col-span-2 glass-card p-6 rounded-3xl border border-outline-variant/30 space-y-4 relative flex flex-col justify-between">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-full inline-block">
                      {activeBooking ? 'Active Session Room' : 'Ready For Seat Reservation'}
                    </span>
                    
                    {activeBooking ? (
                      <div>
                        <h4 className="text-lg font-bold text-on-surface">
                          Cubicle Desk {activeBooking.seatId} – {activeBooking.seatZone} Zone
                        </h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                          Secured for {activeBooking.duration}. Immediate silent checking-in verified. Enjoy high speed fiber wifi while you study.
                        </p>
                        <div className="text-[11px] text-on-surface-variant mt-2">
                          Session Expires on: <strong>{new Date(activeBooking.endTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6">
                        <p className="text-xs text-on-surface-variant max-w-md">
                          You do not have any physical session actively reserved right now. Choose any slot above on the floor plan map to register an available study cubicle layout!
                        </p>
                      </div>
                    )}
                  </div>

                  {activeBooking && (
                    <div className="pt-4 border-t border-outline-variant/15 flex justify-between items-center gap-4">
                      <span className="text-xs text-on-surface-variant">Billing Scheme: <strong className="text-emerald-400">Postpaid Monthly</strong></span>
                      <button 
                        onClick={() => handleCancelBooking(activeBooking.id, activeBooking.seatId)}
                        className="flex items-center gap-1 bg-red-950/20 hover:bg-red-950/40 text-rose-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-900/45 transition-colors cursor-pointer select-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Historic list */}
                <div className="glass-card p-6 rounded-3xl border border-outline-variant/35 flex flex-col justify-between max-h-[280px]">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Saved Record Books
                    </h4>
                    
                    <div className="space-y-2.5 overflow-y-auto max-h-[170px] pr-1 custom-scrollbar">
                      {bookings.map((booking) => {
                        return (
                          <div 
                            key={booking.id} 
                            className="p-3 bg-surface-container/50 border border-outline-variant/10 rounded-xl flex items-center justify-between text-xs transition-transform"
                          >
                            <div>
                              <div className="font-extrabold text-on-surface">Desk #{booking.seatId} ({booking.seatZone})</div>
                              <span className="text-[9px] text-on-surface-variant block mt-0.5">{booking.duration} session completed</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] font-extrabold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 uppercase tracking-wider">Postpaid</span>
                              <span className={`text-[9px] block uppercase font-bold tracking-wider mt-1 ${booking.status === 'active' ? 'text-primary' : 'text-on-surface-variant/65'}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {bookings.length === 0 && (
                        <div className="text-xs text-on-surface-variant/70 text-center py-8">
                          No historic bookings saved.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* World-Class Amenities Segment */}
        <Amenities />

        {/* Operating Hours Segment */}
        <OperatingHours />

        {/* Photos Gallery Segment */}
        <Gallery />

        {/* Interactive routing guide */}
        <InteractiveMap />

      </main>

      {/* Footer segment */}
      <Footer onScrollTo={handleScrollToSection} />

    </div>
  );
}
