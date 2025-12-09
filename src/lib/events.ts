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

export const allEvents: Event[] = [
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
    priority: 10
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
    priority: 11
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
    priority: 12
  },
  {
    id: "christmas-carol-2025",
    title: "Christmas Carol: O Little Town of Bethlehem!",
    date: "2025-12-13",
    time: "5:00 PM - 7:30 PM",
    image: "/Media/Image/carol.png",
    category: "Special Events",
    description: "Join us for a heartwarming evening filled with the true spirit of Christmas! Come experience the beauty of Christmas through music, worship, and joyful celebration as we reflect on the birth of our Saviour. Bring your family and friends. It's a night you won't want to miss! Let's make this Christmas truly memorable together!",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: false,
    priority: 1
  },
  {
    id: "youth-teens-christmas-dinner-2025",
    title: "Youth & Teens Christmas Dinner",
    date: "2025-12-20",
    time: "4:00 PM",
    image: "/Media/Image/Teenschristmas.jpeg",
    category: "Youth & Young Adult",
    description: "Join us for a festive evening filled with joy, laughter, and holiday cheer! Our Youth & Teens Christmas Dinner promises an unforgettable experience with music, delicious food, and fun games for everyone. Come together with family and friends to celebrate the season in a warm and welcoming atmosphere. Let's make this Christmas memorable!",
    location: "7 Burnley Ave, Brantford, ON N3R 1T5",
    isRecurring: false,
    priority: 2
  },
  {
    id: "ptp-3-2025",
    title: "End of Year Praises Testimonies and Prayer (PTP 3.0) Event",
    date: "2025-12-26",
    time: "7:00 PM Daily",
    image: "/Media/Image/ptp.jpeg",
    category: "Special Events",
    description: "Get ready for an unforgettable time of worship, testimonies, and powerful prayers at PTP 3.0! Join us as we lift our voices in praise, share testimonies of God's goodness, and pray together for a glorious new season. Dates: December 26 & 27.",
    location: "RCCG Restoration House, Brantford, 7 Burnley Ave, Brantford, ON N3R 1T5, Canada",
    isRecurring: false,
    priority: 3
  },
  {
    id: "24hrs-prayer-chain-2025",
    title: "24hrs Prayer Chain",
    date: "2025-12-30",
    time: "6:00 AM - 6:00 AM (24 hours)",
    image: "/Media/Image/prayerchain.png",
    category: "Special Events",
    description: "Join us for a powerful time in God's presence as we seek Him together in prayer! Starting at 6:00 AM on December 30th, 2025 and continuing until the early hours of December 31st, 2025. Theme: \"The God of All Flesh\" (Jeremiah 32:27). This is more than an event. It's an encounter! Come prepared for a life-changing experience as we dedicate 24 hours to prayer, worship, and intercession. Don't miss it! Invite your family and friends.",
    location: "Church Auditorium, 7 Burnley Avenue, Brantford",
    isRecurring: false,
    priority: 4
  },
  {
    id: "monthly-vigil",
    title: "Monthly Vigil",
    date: "Every Last Friday of the Month",
    time: "11:00 PM - 1:00 AM",
    image: "/Media/Image/December.png",
    category: "Monthly",
    description: "A powerful monthly all-night vigil filled with intense prayer, worship, and seeking God's face. Join us for two hours of spiritual warfare, intercession, and communion with the Almighty. Experience breakthrough and divine encounters in His presence.",
    location: "Church Auditorium, 7 Burnley Ave, Brantford",
    isRecurring: true,
    priority: 20
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
    priority: 21
  }
];

export function parseEventDate(event: Event): Date {
  if (event.isRecurring) {
    return new Date();
  }

  if (event.date.includes('-') && event.date.length === 10) {
    return new Date(event.date);
  }

  return new Date();
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();

  const upcoming = allEvents
    .filter(event => {
      if (event.isRecurring) return true;

      const eventDate = parseEventDate(event);
      return eventDate >= now;
    })
    .sort((a, b) => {
      if (!a.isRecurring && !b.isRecurring) {
        const dateA = parseEventDate(a);
        const dateB = parseEventDate(b);
        return dateA.getTime() - dateB.getTime();
      }

      if (!a.isRecurring && b.isRecurring) return -1;
      if (a.isRecurring && !b.isRecurring) return 1;

      return (a.priority || 0) - (b.priority || 0);
    });

  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getEventsByCategory(category: string): Event[] {
  if (category === "All") return allEvents;
  return allEvents.filter(event => event.category === category);
}

export function getPastEvents(): Event[] {
  const now = new Date();

  return allEvents
    .filter(event => {
      if (event.isRecurring) return false;

      const eventDate = parseEventDate(event);
      return eventDate < now;
    })
    .sort((a, b) => {
      const dateA = parseEventDate(a);
      const dateB = parseEventDate(b);
      return dateB.getTime() - dateA.getTime();
    });
}