export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  category: "Weekly" | "Monthly" | "Youth & Young Adult" | "Special Events";
  description: string;
  location?: string;
  isRecurring?: boolean;
  priority?: number;
}

// All events data
export const allEvents: Event[] = [
  // Weekly Events (highest frequency)
  {
    id: "sunday-service",
    title: "Sunday Service",
    date: "Every Sunday",
    time: "10:00 AM - 12:00 PM",
    image: "/Media/Image/1.JPG",
    category: "Weekly",
    description: "Join us for inspiring worship, powerful preaching, and fellowship with our church family. Experience transformative messages, uplifting music, and genuine community as we gather to honor God and grow together in faith.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 1
  },
  {
    id: "digging-deep",
    title: "Digging Deep",
    date: "Every Tuesday",
    time: "7:00 PM - 8:00 PM",
    image: "/Media/Events/Digging Deep.jpeg",
    category: "Weekly",
    description: "Dive deeper into God's Word with our interactive Bible study. Join us as we explore Scripture, ask meaningful questions, and discover how to apply biblical truths in our everyday lives. Perfect for both new believers and mature Christians seeking spiritual growth.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 2
  },
  {
    id: "faith-clinic",
    title: "Faith Clinic",
    date: "Every Thursday",
    time: "7:00 PM - 8:00 PM",
    image: "/Media/Events/Faith Clinic.jpeg",
    category: "Weekly",
    description: "A powerful hour dedicated to prayer and intercession. Come and strengthen your faith as we pray together for personal needs, families, our church, and our community. Experience the healing power of collective prayer and witness God's faithfulness.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 3
  },
  {
    id: "men-of-impact",
    title: "Men of Impact",
    date: "Every Tuesday",
    time: "7:00 PM - 8:00 PM",
    image: "/Media/Image/2.JPG",
    category: "Weekly",
    description: "A dynamic gathering for men to grow in faith, brotherhood, and purpose. Join us for inspiring discussions, mentorship opportunities, and practical teachings on being godly men in today's world. Build lasting friendships while strengthening your walk with Christ.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 4
  },

  // Special Events (most recent first)
  {
    id: "annual-thanksgiving-2025",
    title: "Annual Thanksgiving",
    date: "2025-10-12",
    time: "10:00 AM - 12:00 PM",
    image: "/Media/Events/Annual Thanksgiving.png",
    category: "Special Events",
    description: "Join us for our special Annual Thanksgiving service as we come together to express gratitude for God's countless blessings throughout the year. This meaningful celebration features testimonies, special music, and a message of thanksgiving that will inspire and encourage your heart.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: false,
    priority: 10
  },
  {
    id: "marriage-weekend-2025",
    title: "Marriage Weekend",
    date: "2025-11-07",
    time: "Friday 7:00 PM - Sunday 4:00 PM",
    image: "/Media/Events/Marriage Weekend.jpeg",
    category: "Special Events",
    description: "A special weekend retreat designed for married couples to strengthen their relationship, grow together in faith, and enjoy quality time with other couples in a beautiful, peaceful setting. Includes workshops, couple's activities, and spiritual enrichment sessions.",
    location: "Retreat Center",
    isRecurring: false,
    priority: 11
  },
  {
    id: "rhb-youth-week-2025",
    title: "RHB Youth Week - Fresh Oil, New Flame",
    date: "2025-09-19",
    time: "Various Times",
    image: "/Media/Events/Fresh Oil, New Flame.jpeg",
    category: "Youth & Young Adult",
    description: "3-Day Youth and Young Adult Program - Fresh Oil, New Flame. An exciting program featuring Friday 10 PM-2 AM: Prayer & Fellowship, Saturday 10 AM-3 PM: Community Outreach & Academic Talk with Barbecue, Sunday 10 AM: Special Youth Sunday Service.",
    location: "50 Market Street, Brantford, ON N3T 2Z5",
    isRecurring: false,
    priority: 12
  },

  // Monthly Events
  {
    id: "monthly-vigil",
    title: "Monthly Vigil",
    date: "Every Last Friday of the Month",
    time: "11:00 PM - 1:00 AM",
    image: "/Media/Events/Vigil.png",
    category: "Monthly",
    description: "A powerful monthly all-night vigil filled with intense prayer, worship, and seeking God's face. Join us for two hours of spiritual warfare, intercession, and communion with the Almighty. Experience breakthrough and divine encounters in His presence.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 5
  },
  {
    id: "good-morning-holy-ghost",
    title: "Good Morning Holy Ghost",
    date: "Every 3rd Saturday of the Month",
    time: "7:00 AM - 8:00 AM",
    image: "/Events/Good morning holy ghost.png",
    category: "Monthly",
    description: "Start your Saturday morning with the Holy Spirit! Join us for an hour of worship, prayer, and fellowship with the Holy Ghost. Experience His presence, receive fresh anointing, and begin your day with spiritual renewal and divine connection.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 6
  }
];

// Helper function to parse dates (handles both ISO dates and recurring events)
export function parseEventDate(event: Event): Date {
  if (event.isRecurring) {
    // For recurring events, use current date for sorting
    return new Date();
  }
  
  // For special events with ISO dates
  if (event.date.includes('-') && event.date.length === 10) {
    return new Date(event.date);
  }
  
  // Fallback for other date formats
  return new Date();
}

// Get upcoming events sorted by priority (most recent special events first, then recurring)
export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  
  // Filter out past events and sort by priority and date
  const upcoming = allEvents
    .filter(event => {
      if (event.isRecurring) return true; // Always show recurring events
      
      const eventDate = parseEventDate(event);
      return eventDate >= now; // Only show future special events
    })
    .sort((a, b) => {
      // First, sort by whether it's a special event (lower priority number = higher importance)
      if (!a.isRecurring && !b.isRecurring) {
        // Both special events - sort by date (closest first)
        const dateA = parseEventDate(a);
        const dateB = parseEventDate(b);
        return dateA.getTime() - dateB.getTime();
      }
      
      if (!a.isRecurring && b.isRecurring) return -1; // Special events first
      if (a.isRecurring && !b.isRecurring) return 1;  // Recurring events second
      
      // Both recurring - sort by priority
      return (a.priority || 0) - (b.priority || 0);
    });
  
  return limit ? upcoming.slice(0, limit) : upcoming;
}

// Get events filtered by category
export function getEventsByCategory(category: string): Event[] {
  if (category === "All") return allEvents;
  return allEvents.filter(event => event.category === category);
}

// Get past events (for special events only)
export function getPastEvents(): Event[] {
  const now = new Date();
  
  return allEvents
    .filter(event => {
      if (event.isRecurring) return false; // Don't include recurring events in past
      
      const eventDate = parseEventDate(event);
      return eventDate < now;
    })
    .sort((a, b) => {
      // Sort past events by date (most recent first)
      const dateA = parseEventDate(a);
      const dateB = parseEventDate(b);
      return dateB.getTime() - dateA.getTime();
    });
}