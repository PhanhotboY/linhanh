import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.max(60),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (Rule: Rule) => Rule.max(160),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'twitterCardImage',
      title: 'Twitter Card Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
});
