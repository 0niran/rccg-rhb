import { FaBaby, FaGraduationCap } from "react-icons/fa";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export interface Ministry {
  title: string;
  subtitle?: string;
  icon: any;
  image: string;
  description: string;
  features: string[];
  schedule: string;
  time: string;
  gradient: string;
  bgColor: string;
  darkBgColor: string;
}

export const ministries: Ministry[] = [
  {
    title: "Children Church",
    subtitle: "Ages 18 months - 12 years",
    icon: FaBaby,
    image: "/Media/Image/Kids.jpg",
    description: "A vibrant, safe, and nurturing environment where children discover God's love through age-appropriate worship, interactive lessons, and fun activities that help them grow in faith.",
    features: [
      "Interactive Bible stories and lessons",
      "Creative worship and praise",
      "Fun games and activities",
      "Safe and supervised environment",
      "Age-appropriate spiritual growth"
    ],
    schedule: "Sundays during main service",
    time: "10:00 AM - 12:00 PM",
    gradient: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-900/20"
  },
  {
    title: "Youth & Young Adult Church",
    subtitle: "Ages 13-25",
    icon: FaGraduationCap,
    image: "/Media/Leadership/Youth.jpeg",
    description: "Empowering the next generation through dynamic worship, relevant teachings, and authentic community that helps young people navigate life's challenges with faith and purpose.",
    features: [
      "Contemporary worship and music",
      "Relevant biblical teachings",
      "Leadership development programs",
      "Social events and outreach",
      "Mentorship opportunities"
    ],
    schedule: "Main Sunday Service",
    time: "10:00 AM - 12:00 PM",
    gradient: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    darkBgColor: "dark:bg-orange-900/20"
  },
  {
    title: "Adult Church",
    icon: UserGroupIcon,
    image: "/Media/Leadership/AdultChurch.JPG",
    description: "A mature community focused on deepening faith, building meaningful relationships, and serving God through wisdom, experience, and spiritual maturity in all aspects of life.",
    features: [
      "In-depth Bible study and teaching",
      "Fellowship and community building",
      "Prayer and intercession ministry",
      "Service and outreach opportunities",
      "Spiritual mentoring and discipleship"
    ],
    schedule: "Main Sunday service",
    time: "10:00 AM - 12:00 PM",
    gradient: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    darkBgColor: "dark:bg-amber-900/20"
  }
];