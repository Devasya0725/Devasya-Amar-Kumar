import { useState } from 'react';
import { Shield, Sparkles, MapPin, Check, Copy, ExternalLink, X } from 'lucide-react';
import { launchRapidoApp, RAPIDO_COORDINATES } from '../utils/rapido';

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const [showRapidoModal, setShowRapidoModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RAPIDO_COORDINATES.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchRapido = () => {
    launchRapidoApp();
    setShowRapidoModal(false);
  };

  return (
    <>
      <section id="home" className="relative min-h-[90vh] flex items-center px-6 md:px-16 overflow-hidden pt-24">
        {/* Background Image Panel */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Whispering Pages Library Premium Study Room" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH7mJ1rSRGKBv5yZiTYap6BXZxvFa6Je_HNz_HSpYZJLVYZYQ4pL7SbVnnva4dvCAtcapAei2YHJXQzBY3tfXzbULyKx9FhRaL5yC1kcN2T8ux1NkPr1ykzv4ZcotCDUEet8QMwr91UMNrgMYtu1v7iVZjvVBIETqH9tCoD959JjHxJJm0NV30VJK4DsHa9C9LZow3Wt4QjTpGcNqj2SAzg17SjL16Ex1LcC4FHPsKEvA20UdqnNMo_Qx2B0Snd4hq6uUNP-WXv_AW" 
            className="w-full h-full object-cover opacity-35 brightness-[0.4] scale-105"
          />
          {/* Soft atmospheric gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl ml-0 md:ml-8 flex flex-col items-start text-left">
          {/* Badge */}
          <div 
            id="hero-badge" 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary/30 text-primary mb-6 animate-pulse-slow"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-sans text-xs font-bold tracking-widest uppercase text-primary">
              Premium Study Space
            </span>
          </div>

          {/* Title */}
          <h1 
            id="hero-title"
            className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6 leading-none"
          >
            Whispering Pages <span className="text-primary block sm:inline">Library</span>
          </h1>

          {/* Subtitle */}
          <p 
            id="hero-desc"
            className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed font-normal"
          >
            Your Sanctuary for Focused Study. Experience a modern, distraction-free environment in Jammu tailored specifically for competitive exam prep and research.
          </p>

          {/* CTA Actions */}
          <div id="hero-actions" className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onScrollTo('booking')}
              className="bg-primary text-on-primary font-bold text-sm sm:text-base px-8 py-4 rounded-full flex items-center gap-3 hover:brightness-110 shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Reserve a Cubicle</span>
              <span className="w-5 h-5 rounded-full bg-on-primary/15 flex items-center justify-center font-bold">→</span>
            </button>
            
            <button
              onClick={() => setShowRapidoModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm sm:text-base px-8 py-4 rounded-full flex items-center gap-2.5 shadow-lg shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping"></span>
              <span>Book Ride via Rapido</span>
            </button>
          </div>
        </div>

        {/* Decorative Floating Status Pill */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3 bg-surface-container-low/80 backdrop-blur border border-outline-variant/30 px-5 py-3 rounded-full text-xs text-on-surface-variant font-medium shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute ml-0"></span>
          <span>Currently Open: <strong>7:00 AM – 12:00 AM (Midnight)</strong></span>
        </div>
      </section>

      {/* Rapido Ride Assistant Modal */}
      {showRapidoModal && (
        <div id="modal-rapido-hero" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
            onClick={() => setShowRapidoModal(false)}
          />
          
          <div className="relative bg-[#121214] border border-amber-500/20 w-full max-w-md p-8 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in duration-300">
            {/* Top Yellow Brand accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500 animate-pulse" />
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2.5 select-none">
                <span className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black text-sm shadow-md">
                  R
                </span>
                <div>
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest">Rapido Commute</h4>
                  <p className="text-[10px] text-zinc-400">Arrive directly at our doorstep</p>
                </div>
              </div>
              
              <button 
                className="text-zinc-500 hover:text-zinc-300 p-1 rounded-full hover:bg-zinc-800/50"
                onClick={() => setShowRapidoModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  We are launching the <strong>Rapido Passenger App</strong> on your device. Set your destination pin to the address below to reach ScholarSpace Library immediately:
                </p>

                <div className="p-3.5 bg-black/40 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex gap-2 items-start text-xs text-zinc-300">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-zinc-100 font-bold">Monica Electricals</strong>
                      <span className="text-[11px] text-zinc-400 leading-normal">{RAPIDO_COORDINATES.address}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopyAddress}
                    title="Copy dropoff address"
                    className={`p-2.5 rounded-lg border transition-all active:scale-90 ${
                      copied 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-zinc-800/50 border-zinc-700/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 flex items-start gap-1.5 p-1 bg-amber-500/5 border border-amber-500/10 rounded-xl leading-normal">
                <span className="text-amber-500 text-xs">ℹ</span>
                <span>Our premium study space is located on the second floor directly above Monica Electricals.</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRapidoModal(false)}
                  className="flex-1 bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 py-3.5 rounded-xl font-bold text-xs border border-zinc-700/40 select-none transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLaunchRapido}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black py-3.5 rounded-xl font-extrabold text-xs shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 select-none transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>Launch Rapido</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
