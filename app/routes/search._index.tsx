import { useLoaderData, useLocation } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';

import { getBlogs } from '~/services/blog.service';
import BreadCrumbs from '~/components/BreadScrumb';

export const loader = ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  // return getBlogs({ query });
  return json({ query });
};

export default function Query() {
  const { query } = useLoaderData<typeof loader>();

  return (
    <>
      <BreadCrumbs breadcrumbs={[{ label: `Results for ${query}` }]} />
    </>
  );
}
