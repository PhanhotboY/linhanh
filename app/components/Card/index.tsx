import { Image } from '@unpic/react';

import style from './index.module.css';
import RiButton from '../RiButton';

export default function Card({
  image,
  button,
  title,
  className,
  children,
  isHighlight,
}: {
  image: string;
  button?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
  isHighlight?: boolean;
}) {
  return (
    <article
      className={`${style.card} ${
        isHighlight ? style.highlight : ''
      } ${className} max-lg:w-[320px]`}
    >
      <Image
        className={`${style.content_image}`}
        src={image}
        loading='lazy'
        layout='fullWidth'
        // cdn='netlify'
      />
      <div className='flex-grow h-'>
        {title && <h3 className={style.title}>{title}</h3>}

        {children && <div className={`${style.content}`}>{children}</div>}
      </div>

      {button && (
        <RiButton className='mx-5 mt-5 uppercase' href={'/'}>
          {button}
        </RiButton>
      )}
    </article>
  );
}
