import { useState, useEffect } from 'react';

import startSlider, { SliderHandler } from './library/setSlider';
import style from './index.module.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { Image } from '@unpic/react';

export default function Slider({
  wrapper,
  images,
  height,
  col,
  className,
}: {
  wrapper: string;
  images: string[];
  height?: number;
  col: number;
  className?: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDisplayButton, setIsDisplayButton] = useState(true);
  const [isDisabledButtons, setIsDisabledButtons] = useState(false);
  const [slider, setSlider] = useState(null as null | SliderHandler);

  useEffect(() => {
    const carousel = document.querySelector(
      `${wrapper} .${style.wrapper} ul`
    ) as HTMLElement;

    const slider = startSlider(
      carousel!,
      images.length + 2,
      currentSlide,
      4000
    );
    setSlider(slider);
  }, []);

  const goBack = () => {
    setIsDisabledButtons(true);
    slider?.back();
  };

  const goAhead = () => {
    setIsDisabledButtons(true);
    slider?.next();
  };

  const goTo = (position: number) => {
    setIsDisabledButtons(true);
    slider?.moveto(position);

    setTimeout(() => {
      setIsDisabledButtons(false);
    }, 500);
  };

  return (
    <div
      className={`${style.wrapper} col-span-${col} ${className}`}
      style={{ height }}
      onMouseOver={() => setIsDisplayButton(true)}
      onMouseLeave={() => setIsDisplayButton(false)}
      onTransitionEnd={() => {
        setCurrentSlide(slider!.currentSlide);
        setIsDisabledButtons(false);
      }}
    >
      <Carousel images={images} height={height} />
      {isDisplayButton && (
        <div className='container absolute top-1/2 -translate-y-1/2 flex justify-between right-0 left-0'>
          <SliderButton
            direction='back'
            goBack={goBack}
            isDisabledButtons={isDisabledButtons}
          />
          <SliderButton
            direction='next'
            goAhead={goAhead}
            isDisabledButtons={isDisabledButtons}
          />
        </div>
      )}
      <StardustsRow
        amount={images.length}
        currentSlide={currentSlide}
        goTo={goTo}
      />
    </div>
  );
}

const Carousel = ({
  images,
  height,
}: {
  images: string[];
  height?: number;
}) => {
  return (
    <ul
      className='flex'
      style={{
        width: `${(images.length + 2) * 100}%`,
        transform: `translateX(${100 / -(images.length + 2)}%) translateX(0px)`,
      }}
    >
      <SlideImage
        key={images.length}
        image={images.at(-1)}
        width={`${100 / (images.length + 2)}%`}
        height={height}
      />

      {images.map((image, index) => (
        <SlideImage
          key={index}
          image={image}
          width={`${100 / (images.length + 2)}%`}
          height={height}
        />
      ))}

      <SlideImage
        key={-1}
        image={images[0]}
        width={`${100 / (images.length + 2)}%`}
        height={height}
      />
    </ul>
  );
};

const SlideImage = ({
  image,
  width,
  height,
}: {
  image?: string;
  width: string;
  height?: number;
}) => {
  return (
    <li style={{ width }}>
      <a href='#'>
        <Image
          className={`${style.content_image}`}
          src={image || ''}
          loading='lazy'
          layout='fullWidth'
          // cdn='netlify'
        ></Image>
      </a>
    </li>
  );
};

const SliderButton = ({
  direction,
  goBack,
  goAhead,
  isDisabledButtons,
}: {
  direction: string;
  goBack?: any;
  goAhead?: Function;
  isDisabledButtons: boolean;
}) => {
  return (
    <button
      className={`${style.slider_button} ${
        style[`slider_button_${direction}`]
      }`}
      disabled={isDisabledButtons}
      onClick={goBack || goAhead}
    >
      {direction === 'next' ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
    </button>
  );
};

const StardustsRow = ({
  amount,
  currentSlide,
  goTo,
}: {
  amount: number;
  currentSlide: number;
  goTo: Function;
}) => {
  const stardusts = [];
  for (let count = 0; count < amount; count++)
    stardusts.push(
      <Stardust
        key={count}
        isActive={currentSlide === count + 1}
        goTo={goTo}
        position={count + 1}
      />
    );

  return <div className={`${style.stardusts_container}`}>{stardusts}</div>;
};

const Stardust = ({
  isActive,
  goTo,
  position,
}: {
  isActive: boolean;
  goTo: Function;
  position: number;
}) => {
  return (
    <div
      className={`${style.stardust} ${isActive && style['stardust--active']}`}
      onClick={() => goTo(position)}
    ></div>
  );
};
