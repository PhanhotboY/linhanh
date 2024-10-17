import { Fragment } from 'react';

import style from './index.module.css';
import { Link } from '@remix-run/react';
import { RiArrowRightDoubleLine } from '@remixicon/react';

export default function BreadCrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Array<{ label: string; link?: string }>;
}) {
  return (
    <div className={style.wrapper}>
      <Link to='/'>Home</Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={index}>
          <RiArrowRightDoubleLine />

          {breadcrumb.link ? (
            <Link key={index} to={breadcrumb.link}>
              {breadcrumb.label}
            </Link>
          ) : (
            <span key={index}>{breadcrumb.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
