import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique identifier for the event',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Date of the event (e.g. "Every Sunday" or "2025-11-07")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Time of the event (e.g. "10:00 AM - 12:00 PM")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      description: 'Upload an image for this event',
      options: {
        hotspot: true, // Enables cropping
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'imageFallback',
      title: 'Image Path (Legacy)',
      type: 'string',
      description: 'Fallback for existing image paths - will be phased out',
      hidden: true
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration/Info Link',
      type: 'url',
      description: 'Link to registration page or more information about this event',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      name: 'linkText',
      title: 'Link Button Text',
      type: 'string',
      description: 'Text for the registration/info button (e.g., "Register Now", "Learn More", "Get Tickets")',
      initialValue: 'Learn More'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Weekly', value: 'Weekly'},
          {title: 'Monthly', value: 'Monthly'},
          {title: 'Youth & Young Adult', value: 'Youth & Young Adult'},
          {title: 'Special Events', value: 'Special Events'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional custom location (defaults to church address if not provided)'
    }),
    defineField({
      name: 'isRecurring',
      title: 'Is Recurring',
      type: 'boolean',
      description: 'Whether this is a recurring event (weekly/monthly)',
      initialValue: false
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Display priority (lower numbers appear first)',
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      description: 'description'
    },
    prepare(selection) {
      const {title, subtitle, description} = selection
      return {
        title: title,
        subtitle: subtitle,
        description: description
      }
    }
  }
})