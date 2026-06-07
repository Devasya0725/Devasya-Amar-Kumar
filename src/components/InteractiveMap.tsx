import { Map, MapPin, Compass, ArrowUpRight, HelpCircle, GraduationCap, Bus, ExternalLink } from 'lucide-react';
import { launchRapidoApp, RAPIDO_COORDINATES } from '../utils/rapido';

export default function InteractiveMap() {
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Pir+Mitha+Jammu";

  const proximityGuides = [
    { source: 'Pahalwan Di Hatti', distance: '1 min walk', desc: 'Directly adjacent block corridor' },
    { source: 'Monica Electricals', distance: 'Ground Floor', desc: 'Directly below on the 2nd floor' },
    { source: 'Jammu Old Market Bus Stop', distance: '3 mins walk', desc: 'Local transit arrivals' },
    { source: 'Spicer College / Coaching Centers', distance: '5 mins drive', desc: 'Main student hub lane' }
  ];

  return (
    <section id="location" className="py-24 px-6 md:px-16 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Title */}
      <div className="mb-12 text-center md:text-left">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Easy Commute</span>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Geographic Accessibility &amp; Rapido Commuting</h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
          Conveniently accessible for scholars, students, and competitive examinees across Jammu. Ride directly with Rapido or take city transit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: simulated interactive coordinates card */}
        <div className="lg:col-span-8 h-[440px] rounded-[2.5rem] overflow-hidden border border-outline-variant/30 relative flex flex-col justify-end">
          {/* Subtle stylized abstract map outline overlay on background */}
          <div className="absolute inset-0 bg-[#0c1b2c] -z-10 opacity-70">
            {/* Ambient glows mimicking streets and landmarks */}
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full" />
            
            {/* Dynamic visual graph lines representing simulated streets */}
            <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="var(--color-primary)" strokeWidth="1" />
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="var(--color-primary)" strokeWidth="1" />
              <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="var(--color-primary)" strokeWidth="1.5" />
              <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="var(--color-primary)" strokeWidth="0.8" />
              <circle cx="50%" cy="60%" r="20" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="4" />
              <circle cx="50%" cy="60%" r="5" fill="var(--color-primary)" />
            </svg>
          </div>

          {/* Absolute content overlays */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
            <div className="glass-card px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs text-on-surface">
              <MapPin className="text-primary w-4 h-4" />
              <span className="font-semibold">Pir Mitha, Jammu, India</span>
            </div>
            
            <div className="glass-card px-4 py-2.5 rounded-2xl shrink-0 hidden sm:flex items-center gap-2.5 text-xs text-on-surface">
              <Compass className="text-primary w-4 h-4 animate-spin-slow" />
              <span className="font-mono">32.7266° N, 74.8636° E</span>
            </div>
          </div>

          {/* Centered Map Card */}
          <div className="p-8 md:p-10 w-full bg-gradient-to-t from-background via-background/95 to-background/70 backdrop-blur-md rounded-t-[2.5rem] border-t border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                <span>Interactive Map Guide</span>
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg leading-relaxed">
                ScholarSpace is nestled within Jammu Old City division in Pir Mitha, above Monica Electricals. Highly serviced by city e-rickshaws, shared autos, and local transit.
              </p>
            </div>

            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-primary text-on-primary rounded-full font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-primary/10 select-none shrink-0"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: travel guides panel */}
        <div className="lg:col-span-4 glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border border-outline-variant/20 relative">
          <div className="space-y-6">
            <div className="border-b border-outline-variant/15 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Proximity Checkpoints</h4>
              <p className="text-[10px] text-on-surface-variant mt-1">Estimates of proximity indexes for students from major landmarks</p>
            </div>
            
            <div className="space-y-4">
              {proximityGuides.map((guide, idx) => (
                <div key={idx} className="flex gap-3 text-xs items-start">
                  <span className="w-7 h-7 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0 text-primary border border-primary/20 mt-0.5">
                    {idx === 0 ? <GraduationCap className="w-3.5 h-3.5" /> : idx === 2 ? <Bus className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  </span>
                  <div>
                    <div className="flex justify-between items-center gap-2">
                      <strong className="text-on-surface text-xs font-semibold">{guide.source}</strong>
                      <span className="text-[10px] font-mono text-primary font-bold whitespace-nowrap">{guide.distance}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-snug">{guide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info text block */}
          <div className="pt-6 mt-6 border-t border-outline-variant/15 text-[10px] text-on-surface-variant leading-relaxed">
            <p><strong>Note for first-time visitors:</strong> Take the staircase leading next to the main electrical board entrance of the Monica electricals building directly to the 2nd floor.</p>
          </div>
        </div>

      </div>

      {/* Rapido Quick-ride Transit Board */}
      <div className="mt-8 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4 items-center md:items-start text-center md:text-left flex-col md:flex-row">
          <span className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-black font-black text-2xl shadow-xl shrink-0 select-none">
            R
          </span>
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-amber-500 font-sans tracking-wide">
              Direct Rapido Ride Integration
            </h4>
            <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
              Skip public transport queues! Open the Rapido app directly on your smart device to book a safe, localized bike or auto ride directly to <strong>Monica Electricals, Pir Mitha, Jammu</strong> (ScholarSpace is located on floors directly above).
            </p>
          </div>
        </div>

        <button
          onClick={launchRapidoApp}
          className="bg-amber-500 hover:bg-amber-400 text-black px-7 py-4 rounded-xl font-black text-xs transition-all duration-300 shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 active:scale-95 cursor-pointer shrink-0 flex items-center gap-2"
        >
          <span>Request Ride via Rapido</span>
          <ExternalLink className="w-3.5 h-3.5 text-black stroke-[3]" />
        </button>
      </div>

    </section>
  );
}
