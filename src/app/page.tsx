import { getAllEvents, getUpcomingEvents } from "@/lib/sanity-events";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const allEvents = await getAllEvents();
  const upcomingEvents = getUpcomingEvents(allEvents, 4);
  return <HomeClient upcomingEvents={upcomingEvents} />;
}
