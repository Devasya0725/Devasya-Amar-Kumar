import { Seat, Amenity, GalleryItem, Announcement } from './types';

// Seat calculations
export const INITIAL_SEATS: Seat[] = Array.from({ length: 40 }, (_, index) => {
  const seatId = index + 1;
  // 1 to 12 are Premium Zone (as indicated in design system description: Premium Zone contains higher price, superior comfort)
  const isPremium = seatId <= 12;
  
  // Pre-occupied list to make the floor map look lively and real-time
  const occupiedList = [3, 6, 8, 14, 15, 22, 27, 28, 32, 35, 39];
  const isOccupied = occupiedList.includes(seatId);
  const occupiedNames = [
    'Arjun Sharma', 'Priya Kapoor', 'Rohan Verma', 'Anjali Gupta', 
    'Vikram Singh', 'Nehal Mehta', 'Siddharth Roy', 'Ridhima Sen', 
    'Aarav Patel', 'Tanvi Joshi', 'Karan Khanna'
  ];
  const occupiedBy = isOccupied ? occupiedNames[seatId % occupiedNames.length] : null;

  return {
    id: seatId,
    zone: isPremium ? 'Premium' : 'Standard',
    isOccupied,
    occupiedBy,
    pricePerHour: isPremium ? 15 : 10, // ₹15/hr or ₹10/hr
    features: isPremium 
      ? ['Dual-point socket', 'Adjustable LED reading light', 'Elevated book shelf', 'Padded armrest chair']
      : ['Single point socket', 'Standard reading light', 'Basic partitioned shelf', 'Ergonomic study chair']
  };
});

export const AMENITIES: Amenity[] = [
  {
    id: 'wifi',
    title: 'High-Speed Wi-Fi',
    description: 'Seamless connectivity with dual-band 5G fiber optics to keep you connected.',
    iconName: 'Wifi'
  },
  {
    id: 'silence',
    title: 'Well-Disciplined',
    description: 'Strict silent policy enforced for absolute concentration and distraction-free learning.',
    iconName: 'VolumeX'
  },
  {
    id: 'peaceful',
    title: 'Peaceful Environment',
    description: 'Acoustic partitioning and design to minimize sound transmission and external noise.',
    iconName: 'Sparkles'
  },
  {
    id: 'seating',
    title: 'Comfortable Seating',
    description: 'Premium ergonomic chairs designed for 8+ hour support, reducing physical fatigue.',
    iconName: 'Chair'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Premium Cubicles',
    description: 'Individual modular spaces fitted with high-quality task lighting, power outlets, and built-in bookshelves for maximum productivity.',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXdHV5BCm89hxNyr8zk1uxncIZULhfIxbrmzY3upWqxtwaT_E3u4KSKiDGGpxoTI_brUTjt4UJrZdhP1Do-MhCyXvIx7bKeaLeoWjiTYODLrBXHIrUW8nPkn4ZSXmlRCNyrNbkiNWyX-7OqybRq4YiKLru7rGCTu6O6-QnZFzVpM7KLnGKUQC6WVMqLJ95rt4preYB05PiIhXI3alg7NuoUo32KeGEmO0Km_yhdQdRtbRCgp5yfVj1qD3nnAIBBSpQTDhK2-UuaOU1'
  },
  {
    id: 'gallery-2',
    title: 'Focused Environment',
    description: 'Spacious study corridor surrounded by indoor plants, clean drinking water points, and well-lit walkways leading to upper blocks.',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3o-Z_J_9ISdufOMLORMRgrIr4o7ybjtF1FbVyN16aNVz2LjRg1VaXVajRBEPStIHYn4sZbdrFp74zJ6X6lD19aOrLdyJNYgReL4ziAwbM8QSFGCfLE_cBnD6ZihqvWpiafOQacXmKn6T9jepXGv3X7IeWYDzMwp1G92ptCBbkGuzdPFxgJ7Czud6hQMRaMlstNAETRQcu8SN0x1aAcuikggB3cBIPNJXrEnd-qor6WS4HoW7HKM8nvbtLuMoakuYkZg3hhLnhBrdv'
  },
  {
    id: 'gallery-3',
    title: 'Modern Facilities',
    description: 'Double-row cubicle partitions with high-contrast surfaces, custom cooling ventilation, and personal overhead lockers.',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRarIUgRR7WXUEvYTALCpZJF4fuwX-Yt-9qlIGiWjzegmdugq057nxMiOrXjO-w6FI2ezmMYIGQQ9ceo77lYvQhhciBkiBPp_4F0UyCuiJrpFRQ0sYoUVlaH5nGtea6HD9FCmMFICRgHyravsQViARqVPAfmcVLGL3u3WtjVDJsHeTxEOUaIbsVTzyB-hdh6qVWokt4-f1mxPJoOoUHCz_7ZUuFzwQXjC6MVH9peWA0zVsGAS3PsRIHVDp-9xwKp1q4y63K3WvdP-_'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'rules-1',
    title: 'Exam Season Quiet Hours',
    content: 'Please ensure silent mode is enabled on all mobile phones and lap-tops upon entry to the reading room.',
    date: 'June 5, 2026',
    type: 'alert'
  },
  {
    id: 'rules-2',
    title: 'High-Speed Wifi Upgrade',
    content: 'Our Wi-Fi router firmware has been upgraded to dual-frequency 5G fiber lines. Check the notices board for updated details.',
    date: 'May 28, 2026',
    type: 'success'
  },
  {
    id: 'rules-3',
    title: 'Locker Reservations Open',
    content: 'Monthly overhead desk locker bookings are now open for all long-term scholar profiles.',
    date: 'May 15, 2026',
    type: 'info'
  }
];
