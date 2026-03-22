import {groq} from 'next-sanity'

export const eventsQuery = groq`*[_type == "event"] | order(priority asc) {
  _id,
  id,
  title,
  date,
  time,
  image {
    asset->{
      _id,
      url
    },
    hotspot,
    crop
  },
  imageFallback,
  category,
  description,
  location,
  isRecurring,
  priority,
  registrationUrl,
  linkText
}`