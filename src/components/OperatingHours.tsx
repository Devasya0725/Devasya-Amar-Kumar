import { Clock, MapPin, Phone, HelpCircle, Bell } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data';

export default function OperatingHours() {
  return (
    <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Container main deck */}
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 flex flex-col xl:flex-row items-stretch justify-between gap-10 overflow-hidden relative border border-outline-variant/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full -z-10" />
        
        {/* Left: Schedule details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">
              Always Available
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface mb-6">
              Study Schedule &amp; Timing
            </h2>
            
            <div className="inline-flex items-center gap-5 px-8 py-6 bg-surface-container rounded-3xl border border-outline-variant/35 shadow-md">
              <span className="w-12 h-12 rounded-2xl bg-primary-container/15 flex items-center justify-center text-primary">
                <Clock className="w-6 h-6 text-primary" />
              </span>
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Daily Session Window</p>
                <p className="text-xl sm:text-2xl font-extrabold text-on-surface font-sans mt-0.5">7:00 AM – 12:00 Midnight</p>
              </div>
            </div>
          </div>

          {/* Quick timing rules notice helper */}
          <div className="mt-8 space-y-2 text-xs text-on-surface-variant max-w-md">
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <span>Slots are booked in blocks of 1 hour, 4 hours, or the entire Day.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
              <span>Checking-in is self-service via desk code validation on arrival.</span>
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-outline-variant/20 hidden xl:block self-stretch mx-4" />

        {/* Center: Find Us Location */}
        <div id="location" className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Find Our Study Zone</span>
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mb-6">
              Near Pahalwan Di Hatti, Pir Mitha, Jammu,<br />
              2nd floor above Monica electricals
            </p>
            
            <a 
              href="tel:9149777486"
              className="inline-flex items-center gap-3 text-sm font-bold text-primary bg-primary/10 border border-primary/25 hover:bg-primary/20 px-5 py-3 rounded-2xl transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>+91 9149777486</span>
            </a>
          </div>

          {/* Contact helper */}
          <p className="text-xs text-on-surface-variant/75 mt-8 max-w-sm">
            For on-site seat custom configuration, corporate block reservations, or group studies, drop us a ring on our coordinator line directly.
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-outline-variant/20 hidden xl:block self-stretch mx-4" />

        {/* Right: Important Rules notice list */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant/15 pb-3">
            <Bell className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">Scholar Space Bullettins</h4>
          </div>
          <div className="space-y-3.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {ANNOUNCEMENTS.map((ann) => (
              <div 
                key={ann.id} 
                className={`p-3 rounded-xl border text-xs ${
                  ann.type === 'alert' 
                    ? 'bg-rose-955/20 border-rose-900/40 text-rose-300' 
                    : ann.type === 'success' 
                      ? 'bg-emerald-955/20 border-emerald-900/40 text-emerald-300' 
                      : 'bg-surface-container/60 border-outline-variant/20 text-on-surface'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold tracking-tight">{ann.title}</span>
                  <span className="text-[9px] opacity-60 font-mono">{ann.date}</span>
                </div>
                <p className="text-[11px] opacity-80 leading-snug">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
