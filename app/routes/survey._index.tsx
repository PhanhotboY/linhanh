import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { ClientOnly } from 'remix-utils/client-only';
import SurveyComponent from '~/components/Survey';
import { useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Form Library | SurveyJS + NextJS Quickstart Template' },
    { name: 'description', content: 'SurveyJS Form Library' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const response = await fetch(url.origin + '/data/survey.json');
  const jsonSurvey = await response.json();

  return json({ jsonSurvey });
};

export default function Survey() {
  const { jsonSurvey } = useLoaderData<typeof loader>();

  return (
    <ClientOnly fallback={null}>
      {() => (
        <div className='flex min-h-screen flex-col items-center p-8'>
          <SurveyComponent jsonSurvey={jsonSurvey} />
        </div>
      )}
    </ClientOnly>
  );
}
