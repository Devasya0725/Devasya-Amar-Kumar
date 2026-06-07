import { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, Info } from 'lucide-react';

export default function Gallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-24 bg-surface-dim transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Virtual Tour</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">
              Library Gallery
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
              Take a virtual tour of our premium study zones, quiet cubicles, and physical facilities.
            </p>
          </div>
        </div>

        {/* Gallery grid list using precisely requested layout: aspect-[4/5] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] border border-outline-variant/10 cursor-pointer shadow-lg"
            >
              {/* Image */}
              <img 
                alt={item.title} 
                src={item.imgUrl} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Fade layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-lg text-primary">{item.title}</p>
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Static mobile label overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/70 backdrop-blur-sm border border-outline-variant/20 p-3 rounded-xl flex items-center justify-between md:hidden pointer-events-none">
                <span className="text-xs font-bold text-on-surface">{item.title}</span>
                <span className="text-[10px] text-primary font-medium tracking-wide uppercase">Zoom</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div id="gallery-lightbox" className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={() => setActiveItem(null)}
          />

          <div className="relative glass-card max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 animate-in zoom-in-95 duration-200">
            {/* Image zoom */}
            <div className="aspect-video w-full relative">
              <img 
                src={activeItem.imgUrl} 
                alt={activeItem.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content panel */}
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/15 text-primary border border-primary/25 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Zone Preview
                </span>
                <span className="text-xs text-on-surface-variant shrink-0 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-primary" />
                  Real Photograph
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-on-surface">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
