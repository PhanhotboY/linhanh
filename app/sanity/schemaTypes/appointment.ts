import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'appointment',
  title: 'Appointment',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'clientEmail',
      title: 'Client Email',
      type: 'email',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'clientPhone',
      title: 'Client Phone',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'appointmentDate',
      title: 'Appointment Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'specialist',
      title: 'Specialist',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
  ],
});
