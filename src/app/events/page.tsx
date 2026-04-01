import { getAllEvents } from "@/lib/sanity-events";
import EventsClient from "@/components/EventsClient";

export default async function Events() {
  const events = await getAllEvents();
  return <EventsClient events={events} />;
}
