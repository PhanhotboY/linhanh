import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
} from '@remix-run/react';
import React, { Suspense, useEffect } from 'react';
import type {
  ErrorResponse,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';

import { themePreferenceCookie } from '~/cookies';
import { getBodyClassNames } from '~/lib/getBodyClassNames';
import { themePreference } from '~/types/themePreference';
import style from './styles/index.css?url';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export const links: LinksFunction = () => [
  // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  // {
  //   rel: 'preconnect',
  //   href: 'https://fonts.gstatic.com',
  //   crossOrigin: 'anonymous',
  // },
  // {
  //   rel: 'stylesheet',
  //   href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  // },
  { rel: 'preconnect', href: 'https://cdn.sanity.io' },
  {
    rel: 'stylesheet',
    href: style,
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie');
  const cookieValue = (await themePreferenceCookie.parse(cookieHeader)) || {};
  const theme = themePreference.parse(cookieValue.themePreference) || 'light';
  const bodyClassNames = getBodyClassNames(theme);

  return json({
    theme,
    bodyClassNames,
    ENV: {
      VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID!,
      VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET!,
      VITE_SANITY_API_VERSION: import.meta.env.VITE_SANITY_API_VERSION!,
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // @ts-ignore
    window.replainSettings = { id: '7bc757a6-9ce2-4ca8-a264-31ff6412c82f' };
    (function (u) {
      var s = document.createElement('script');
      s.async = true;
      s.src = u;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode?.insertBefore(s, x);
    })('https://widget.replain.cc/dist/client.js');
  }, []);

  return (
    <html lang='en' translate='no'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { theme, ENV } = useLoaderData<typeof loader>();
  const location = useLocation();

  return location.pathname.match(/^\/studio/) ? (
    <main className='h-screen'>
      <Suspense>
        <Outlet />
      </Suspense>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)}`,
        }}
      />
    </main>
  ) : (
    <>
      <Header />

      <main
        className='grid gap-y-6 max-lg:w-screen overflow-hidden'
        style={{ paddingTop: 'var(--header-height)' }}
      >
        <Suspense fallback={<div>I am spinninggg</div>}>
          <Outlet context={{ theme }} />
        </Suspense>
      </main>

      <ScrollToTop />
      <Footer />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);
  return (
    <div>
      <h1>Oh no, an error occurred!</h1>
      <pre>{error.data || (error as any).message}</pre>
    </div>
  );
}
