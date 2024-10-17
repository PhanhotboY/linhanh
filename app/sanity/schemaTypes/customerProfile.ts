import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'customerProfile',
  title: 'Customer Profile',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'appointmentHistory',
      title: 'Appointment History',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'appointment' } }],
    },
    {
      name: 'preferences',
      title: 'Preferences',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'loyaltyPoints',
      title: 'Loyalty Points',
      type: 'number',
      initialValue: 0,
    },
  ],
});
