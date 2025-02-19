import { createClient } from '@sanity/client';

import { apiVersion, dataset, projectId } from '~/sanity/projectDetails';

export const viewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.VITE_SANITY_READ_TOKEN,
});
