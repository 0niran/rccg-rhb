// Site Configuration
export const SITE_CONFIG = {
  name: "Restoration House Brantford",
  description: "A vibrant community of faith committed to spiritual growth, worship, and service in Brantford, Ontario",
  url: "https://rccgbrantford.com",
  ogImage: "/Media/RHB Logos/RCCG Restoration House Brantford-White.svg",
  keywords: [
    "church brantford",
    "RCCG",
    "Restoration House",
    "christian church",
    "worship",
    "community",
    "faith",
    "sunday service",
    "brantford ontario",
    "church ministries"
  ],
  author: "Restoration House Brantford"
} as const;

// Contact Information
export const CONTACT_INFO = {
  phone: "(519) 304-3600",
  email: "hello@rccgbrantford.com",
  address: {
    main: "7 Burnley Ave, Brantford, ON N3T 1T5",
    youth: "50 Market Street, Brantford, ON N3T 2Z5"
  }
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/rccgbrantford",
  instagram: "https://instagram.com/rccgbrantford", 
  youtube: "https://youtube.com/@rccgbrantford",
  twitter: "https://twitter.com/rccgbrantford"
} as const;

// Service Times
export const SERVICE_TIMES = {
  sunday: "10:00 AM - 12:00 PM",
  diggingDeep: "Tue 7:00 PM - 8:00 PM", 
  faithClinic: "Thu 7:00 PM - 8:00 PM"
} as const;

// External Links
export const EXTERNAL_LINKS = {
  promiseLand: "https://rhbpromiseland.com/",
  rideSharing: "https://forms.gle/kRa2fFayvNpGCNLCA"
} as const;

// Image Paths
export const IMAGES = {
  logo: "/Media/RHB Logos/RCCG Restoration House Brantford-White.svg",
  heroSlideshow: [
    "/Media/Image/1.JPG?v=2024",
    "/Media/Image/2.JPG?v=2024", 
    "/Media/Image/3.JPG?v=2024",
    "/Media/Image/4.JPG?v=2024",
    "/Media/Image/5.JPG?v=2024",
    "/Media/Image/6.JPG?v=2024",
    "/Media/Image/7.JPG?v=2024"
  ],
  leadership: {
    pastor: "/Media/Leadership/Pst Seyi.png",
    youth: "/Media/Leadership/Youth.jpeg"
  },
  ministries: {
    children: "/Media/Image/Kids.jpg",
    youth: "/Media/Leadership/Youth.jpeg",
    adults: "/Media/Journey So Far.jpg"
  }
} as const;