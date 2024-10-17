import { Studio } from 'sanity';
import { ClientOnly } from 'remix-utils/client-only';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import config from '../../sanity.config';

export const meta: MetaFunction = () => [
  { title: 'Sanity Studio' },
  { name: 'robots', content: 'noindex' },
];

// Add CSS links
// export const links: LinksFunction = () => {
//   return [
//     {
//       rel: 'stylesheet',
//       href: 'https://cdn.sanity.io/studio/latest/studio.css',
//     },
//   ];
// };

export default function StudioPage() {
  console.log('Studio');
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => (
        <Studio
          config={config}
          // To enable guests view-only access to your Studio,
          // uncomment this line!
          // unstable_noAuthBoundary
        />
      )}
    </ClientOnly>
  );
}
