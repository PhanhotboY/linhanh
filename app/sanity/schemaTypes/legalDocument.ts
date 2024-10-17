import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'legalDocument',
  title: 'Legal Document',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
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
      name: 'content',
      title: 'Content',
      type: 'blockContent', // Using the same blockContent schema
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'version',
      title: 'Version',
      type: 'string',
    },
  ],
});
