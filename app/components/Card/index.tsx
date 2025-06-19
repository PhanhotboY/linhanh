import { Image } from '@unpic/react';
import { motion } from 'framer-motion';

import style from './index.module.css';
import RiButton from '../RiButton';
import { scaleIn } from '~/lib/animations';

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
    <motion.article
      className={`${style.card} ${
        isHighlight ? style.highlight : ''
      } ${className} max-lg:w-[320px]`}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
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