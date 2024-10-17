import { useState } from 'react';
import { Image } from '@unpic/react';

import style from './index.module.css';
import RiButton from '../RiButton';
import { RiCloseLargeLine } from '@remixicon/react';

export default function MasterDetail({
  data,
}: {
  data: Array<{
    banner: string;
    isHot: boolean;
    tab: string;
    details: {
      content: {
        title: string;
        description: string[];
      }[];
      images: string[];
      alt: string;
    };
  }>;
}) {
  const [tab, setTab] = useState(data[0].tab);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    setTab(target.getAttribute('aria-label')!);

    // show
    const details = document.querySelector(`.${style.details}`);
    details?.classList.remove('max-lg:hidden');

    details?.classList.add('max-lg:z-40');
  };

  const hideDetailPopup = () => {
    const details = document.querySelector(`.${style.details}`);
    details?.classList.add('max-lg:hidden');
    details?.classList.remove('max-lg:z-40');
  };

  const details = data.find((d) => d.tab === tab)?.details;

  return (
    <div className='wrapper grid-cols-12 gap-x-8'>
      <nav className='col-span-12 lg:col-span-5'>
        <ul className={`${style.menu}`}>
          {data.map((master, i) => (
            <li className='max-lg:mx-5' key={i}>
              <a
                href={`#${master.tab}`}
                className={`${master.tab === tab ? style.active : ''} ${
                  master.isHot ? style.hot : ''
                } max-lg:my-0`}
                style={{
                  background: `url(${master.banner}) center / contain no-repeat`,
                }}
                aria-label={master.tab}
                onClick={handleClick}
              ></a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`${style.details} z-20 col-span-7 overflow-hidden max-lg:hidden max-lg:fixed max-lg:inset-0 max-lg:h-screen flex items-center justify-center`}
      >
        <div className='overlay opacity-100' onClick={hideDetailPopup}>
          <RiCloseLargeLine
            className='absolute top-8 right-8 text-white opacity-80'
            size={24}
          ></RiCloseLargeLine>
        </div>

        {details ? (
          <Details details={details} />
        ) : (
          <p>Click on a tab to view details</p>
        )}
      </div>
    </div>
  );
}

const Details = ({
  details,
}: {
  details: {
    content: {
      title: string;
      description: string[];
    }[];
    images: string[];
    alt: string;
  };
}) => {
  return (
    <article className='p-8 z-10 max-lg:bg-white rounded-2xl'>
      <div className='flex'>
        <section className='flex-grow'>
          {details.content.map((content, i) => (
            <div key={i}>
              <h3>{content.title}</h3>

              <ul>
                {Array.isArray(content.description) ? (
                  content.description.map((desc, i) => <li key={i}>{desc}</li>)
                ) : (
                  <li>{content.description}</li>
                )}
              </ul>
            </div>
          ))}
        </section>

        <section className='w-1/3'>
          {details.images.map((image, i) => (
            <Image
              key={i}
              className='mb-8'
              src={image}
              alt={details.alt}
              layout='fullWidth'
            />
          ))}
        </section>
      </div>

      <RiButton className='m-auto uppercase px-10 w-fit max-lg:mt-5' href={'/'}>
        Đăng ký ngay
      </RiButton>
    </article>
  );
};
