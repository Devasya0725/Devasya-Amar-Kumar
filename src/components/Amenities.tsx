import { AMENITIES } from '../data';
import * as Icons from 'lucide-react';

export default function Amenities() {
  // Dynamic icon helper safely typing Lucide components
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Wifi':
        return <Icons.Wifi className="w-6 h-6 text-primary" />;
      case 'VolumeX':
        return <Icons.VolumeX className="w-6 h-6 text-primary" />;
      case 'Sparkles':
        return <Icons.Sparkles className="w-6 h-6 text-primary" />;
      case 'Chair':
      default:
        return <Icons.Armchair className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <section id="amenities" className="py-24 bg-surface-container-low transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-4">
            World-Class Amenities
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Everything you need to maintain supreme productivity, quiet momentum, and complete physical posture support during your research session blocks.
          </p>
        </div>

        {/* Dynamic Features List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amenity) => (
            <div 
              key={amenity.id}
              className="glass-card p-8 rounded-3xl group hover:border-primary/50 hover:bg-surface-container/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary-container/20 transition-all duration-300">
                {renderIcon(amenity.iconName)}
              </div>
              <h4 className="text-lg font-bold text-on-surface mb-2 tracking-tight">
                {amenity.title}
              </h4>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Styled Study Snapshots Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group overflow-hidden rounded-3xl aspect-video border border-outline-variant/10 relative">
            <img 
              className="w-full h-full object-cover rounded-3xl grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
              alt="A focused close-up of a student studying in a modern, dark-themed library with soft teal lighting." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA72_ip4qncOZfGBBm1i9KYs7KguJqHFB8XXT2nia10CYsZLH6X6MctR_XbKoaf-GG3fm0A1wnB1ajqm-LlisnKEmuCPQPFq5L6x5y4BVSj8UWa7P1nPKbcpbs7cabCAiv8CnIIGlJN2BdPxk2fLhyt0_r3R-0bGFxjTFHDTqxQgILOC5zVPvmR1nRjf6K2IZHgvMzcRHVKdCDSJ7ORgZiQbUCYjaNvgOt_lr9Mdy9vGp17ZSXXcHkC8h-1kx8-iywUangppszYERJB"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-widest font-mono text-primary font-bold">Workspace Focus</span>
              <p className="text-xs text-on-surface-variant mt-1">Acoustic panel partitions with low optical stress warm light setups designed for reading flow.</p>
            </div>
          </div>
          
          <div className="group overflow-hidden rounded-3xl aspect-video border border-outline-variant/10 relative">
            <img 
              className="w-full h-full object-cover rounded-3xl grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
              alt="Wide-angle view of a library's interior, showing individual study cubicles partitioned with elegant gray panels." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0psHVA5ZGSIRAg8nnKkuNUhB5h9gUZKQ__ySuBgGD6Rgob7K6zQIVS0AhE8rzdpTivpWOCxdP9nzAVCQ-lwjkAMX6_1bgPJLUHh9SHyHL2PAEcf0upbOLFO52y4zwAPvokoa995Fhs8-wIdYUroXk3AplRkYY5vbBaMRk1at2NbKe9xumFSej24RUTIFD4dByzKt8l6YQleEgJOI2SgHiQFTrEnuhJqu-U_j6uuZXJ_NE4G8IMsBnHyp3BMJzl8w7QqpZPnq7wTHF"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-widest font-mono text-primary font-bold">Ergonomic Layouts</span>
              <p className="text-xs text-on-surface-variant mt-1">Symmetrical desk groupings divided by premium laminated dividers to maintain total study bubble isolation.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
