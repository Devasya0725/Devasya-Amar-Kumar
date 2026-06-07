export interface Seat {
  id: number;
  zone: 'Premium' | 'Standard';
  isOccupied: boolean;
  occupiedBy: string | null;
  pricePerHour: number;
  features: string[];
}

export type BookingDuration = '1 Hour' | '4 Hours' | 'Full Day';

export interface Booking {
  id: string;
  seatId: number;
  duration: BookingDuration;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed';
  pricePaid: number;
  seatZone: 'Premium' | 'Standard';
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatarUrl?: string;
  phone?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'success' | 'alert';
}
