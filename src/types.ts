export type TransportType = 'MINI-BUS' | 'FERRY' | 'WALK' | 'REST' | 'NONE';

export interface TimelineEvent {
  id: string;
  time: string;
  place: string;
  activity: string;
  duration?: string;
  transport?: TransportType;
  transportLabel?: string;
  mapUrl?: string;
  mapButtonType?: 'OPEN IN GOOGLE MAPS' | 'GET DIRECTIONS';
  upNextPlace?: string;
  importantNotes?: string[];
  isEstimated?: boolean;
  specialType?: 'standard' | 'road-trip' | 'island-experience' | 'sunrise' | 'homeward-journey' | 'transition';
  groupDetails?: string; // e.g. "17 people · 15 adults + 2 kids · 5 rooms"
  ticketInfo?: string; // e.g. "₹100 Special Entrance Amman + Swamy"
  plannedDishes?: string[]; // e.g. for The Curry or Sea View
  shoppingCategories?: string[]; // for Sannathi Street
  photoUrl?: string;
  photoCaption?: string;
  roadTripData?: {
    from: string;
    to: string;
    duration: string;
    estimatedArrival: string;
    badge?: string;
  };
}

export interface ItineraryDay {
  day: number;
  dayNumberFormatted: string; // "DAY 01"
  date: string; // "October 1, 2026"
  routeSummary: string; // "BANGALORE → MADURAI"
  theme: string; // "NIGHT JOURNEY"
  description: string;
  heroImage: string;
  events: TimelineEvent[];
}

export interface CityStop {
  id: string;
  name: string;
  dayNumber: number;
  dates: string;
  highlight: string;
  distanceFromPrev?: string;
  driveTimeFromPrev?: string;
  targetId: string;
}
