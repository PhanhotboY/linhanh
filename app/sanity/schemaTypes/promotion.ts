import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage', value: 'percentage' },
          { title: 'Fixed Amount', value: 'fixed' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'discountValue',
      title: 'Discount Value',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'validTo',
      title: 'Valid To',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'applicableServices',
      title: 'Applicable Services',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'service' } }],
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
