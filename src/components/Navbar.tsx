import React, { useState } from 'react';
import { Menu, X, User, LogOut, CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  onChangeProfile: (profile: UserProfile) => void;
  onScrollTo: (sectionId: string) => void;
}

export default function Navbar({ user, onChangeProfile, onScrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeProfile({
      name: username || 'Scholar',
      email: email || 'student@scholarspace.edu',
      phone: phone || '9149777486',
      isLoggedIn: true
    });
    setShowProfileModal(false);
  };

  const handleLogout = () => {
    onChangeProfile({
      name: '',
      email: '',
      phone: '',
      isLoggedIn: false
    });
    setUsername('');
    setEmail('');
    setPhone('');
    setShowProfileModal(false);
  };

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Booking', id: 'booking' },
    { label: 'Location', id: 'location' }
  ];

  return (
    <>
      <nav id="navbar" className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 transition-all duration-300">
        <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            id="nav-brand" 
            className="flex items-center gap-2 cursor-pointer font-bold duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
              <Shield className="w-5 h-5 text-primary" />
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-primary">
              ScholarSpace
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onScrollTo(item.id)}
                className="text-on-surface-variant hover:text-on-surface font-semibold text-sm tracking-wide cursor-pointer transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            
            {user.isLoggedIn ? (
              <button
                id="btn-profile-trigger"
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-5 py-2 rounded-full font-semibold text-sm hover:bg-primary/20 active:scale-95 transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>Hi, {user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                id="btn-login-trigger"
                onClick={() => setShowProfileModal(true)}
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-semibold text-sm hover:brightness-110 active:scale-95 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            id="btn-mobile-menu"
            className="md:hidden text-primary p-1 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div id="nav-mobile-drawer" className="md:hidden absolute top-[100%] left-0 w-full bg-surface-container border-b border-outline-variant/40 py-6 px-6 space-y-4 shadow-xl">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-mobile-${item.id}`}
                  onClick={() => {
                    onScrollTo(item.id);
                    setIsOpen(false);
                  }}
                  className="text-left text-on-surface-variant hover:text-on-surface font-semibold text-base py-2 border-b border-outline-variant/10 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              {user.isLoggedIn ? (
                <div className="pt-2 flex flex-col gap-3">
                  <div className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <span>Logged In: {user.name}</span>
                  </div>
                  <button
                    id="btn-profile-mobile"
                    onClick={() => {
                      setShowProfileModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-center bg-primary/10 border border-primary/30 text-primary py-3 rounded-xl font-semibold text-sm"
                  >
                    View Account
                  </button>
                </div>
              ) : (
                <button
                  id="btn-login-mobile"
                  onClick={() => {
                    setShowProfileModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold text-sm hover:brightness-110 active:scale-95 transition-all text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Account Info/Login Modal */}
      {showProfileModal && (
        <div id="modal-profile" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowProfileModal(false)}
          />
          
          {/* Content */}
          <div className="relative glass-card w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span>{user.isLoggedIn ? 'Your Scholar Account' : 'Student Sign In'}</span>
              </h3>
              <button 
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant/30"
                onClick={() => setShowProfileModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {user.isLoggedIn ? (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-on-surface-variant">Full Name</span>
                    <span className="text-sm font-semibold text-on-surface">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-on-surface-variant">Email Address</span>
                    <span className="text-sm font-medium text-on-surface">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-on-surface-variant">Phone Number</span>
                    <span className="text-sm font-medium text-on-surface">{user.phone || '9149777486'}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2 bg-on-error-container/20 hover:bg-on-error-container/40 text-red-400 py-3 rounded-xl font-semibold text-sm border border-red-900/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-semibold text-sm hover:brightness-110"
                  >
                    Continue Studying
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Sign in with your basic student information to track your bookings, receive instant check-in schedules, and request standard lockers.
                </p>

                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant font-medium">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., Devasya Thakuri"
                    className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., student@scholarspace.edu"
                    className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant font-medium">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., 9149777486"
                    className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 rounded-xl font-semibold text-sm hover:brightness-110 active:scale-95 transition-all mt-4"
                >
                  Register / Sign In
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
