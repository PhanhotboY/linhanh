import { RiArrowUpSLine } from '@remixicon/react';
import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        document.querySelector('.scroll-to-top')?.classList.remove('hidden');
      } else {
        document.querySelector('.scroll-to-top')?.classList.add('hidden');
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className='scroll-to-top z-40 bg-white rounded-full hidden fixed bottom-24 right-8 p-2.5 border shadow-xl hover:shadow-inner'
      style={{
        borderColor: 'var(--sub1-color)',
      }}
      onClick={scrollToTop}
    >
      <RiArrowUpSLine
        className='text-2xl text-gray-500'
        style={{ fill: 'var(--sub1-color' }}
      />
    </button>
  );
}
