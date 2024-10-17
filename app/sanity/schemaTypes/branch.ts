import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    {
      name: 'branchName',
      title: 'Branch Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      description: 'e.g., Mon-Fri: 9am - 6pm',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      description: 'Geographical location for maps',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo', // Assuming you have an SEO schema
    },
  ],
});
