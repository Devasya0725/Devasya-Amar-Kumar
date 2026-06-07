import React, { useState } from 'react';
import { Share2, Heart, Mail, ShieldAlert, Check } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const appUrl = window.location.href;
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 transition-colors duration-300">
      
      {/* Upper Grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 px-6 md:px-16 py-16 max-w-7xl mx-auto">
        
        {/* Branding & description */}
        <div className="space-y-4">
          <div className="text-xl md:text-2xl font-extrabold text-primary tracking-tight font-sans">
            ScholarSpace
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal">
            The most tranquil study environmental hub in Jammu. Explicitly engineered to promote continuous mental momentum and academic research accomplishments.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h5 className="text-tertiary-container font-bold text-xs uppercase tracking-widest mb-5">
            Explore
          </h5>
          <ul className="space-y-3.5 text-xs font-semibold text-on-surface-variant">
            <li>
              <button onClick={() => onScrollTo('amenities')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Facilities &amp; Amenities
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('booking')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Seating floor plan
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('location-guide')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Accessibility map
              </button>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h5 className="text-tertiary-container font-bold text-xs uppercase tracking-widest mb-5">
            Support
          </h5>
          <ul className="space-y-3.5 text-xs font-semibold text-on-surface-variant">
            <li>
              <a href="tel:9149777486" className="hover:text-primary transition-colors hover:underline">
                Contact coordinator
              </a>
            </li>
            <li>
              <button onClick={() => onScrollTo('location-guide')} className="hover:text-primary transition-colors cursor-pointer text-left">
                Opening Hours guide
              </button>
            </li>
            <li>
              <a href="mailto:devasyathakuri@gmail.com" className="hover:text-primary transition-colors hover:underline">
                Email coordinator
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h5 className="text-tertiary-container font-bold text-xs uppercase tracking-widest mb-5">
            Legal
          </h5>
          <ul className="space-y-3.5 text-xs font-semibold text-on-surface-variant">
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
                Terms of Study Service
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
                Rules &amp; Silenced Conducts
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal disclaimer & Social bar */}
      <div className="px-6 md:px-16 py-8 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="text-xs text-on-surface-variant text-center sm:text-left">
          © 2026 ScholarSpace Library. Managed locally at Pir Mitha, Jammu. All rights reserved.
        </p>
        
        {/* Interactive Social Row */}
        <div className="flex gap-4 items-center">
          
          {/* Share trigger is copy app link with status checks */}
          <button 
            onClick={handleShare}
            title="Copy shared link"
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-90 cursor-pointer ${
              copied 
                ? 'bg-primary-container/20 text-primary border-primary/40' 
                : 'bg-surface-container/40 border-outline-variant/20 hover:border-primary/50 text-on-surface-variant hover:text-primary'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          </button>
          
          {/* Like button toggles color */}
          <button 
            onClick={handleLike}
            title="Add Library to favorites list"
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-90 cursor-pointer ${
              liked 
                ? 'bg-rose-950/30 text-rose-400 border-rose-800' 
                : 'bg-surface-container/40 border-outline-variant/20 hover:border-rose-400/50 text-on-surface-variant hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-400' : ''}`} />
          </button>
          
          {/* Mail triggers mailto pre-populated mail */}
          <a 
            href="mailto:devasyathakuri@gmail.com?subject=ScholarSpace Library Inquiry&body=Hi coordinator, I would like to inquire about desk bookings."
            title="Send us a letter directly"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container/40 border border-outline-variant/20 hover:border-primary/50 text-on-surface-variant hover:text-primary transition-all active:scale-90"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

    </footer>
  );
}
