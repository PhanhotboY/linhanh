import interval from './interval.js';

const setSlider = function (
  element: HTMLElement,
  slideCount: number,
  currentSlide: number,
  slideTime: number
) {
  let n = currentSlide;

  const sliderHandler = {
    currentSlide: n,
    next: function () {
      n++;
      this.handleSlider();

      sliderInterval.restart();
    },

    back: function () {
      n--;
      this.handleSlider();

      sliderInterval.restart();
    },

    moveto: function (position: number) {
      n = position;
      this.handleSlider();

      sliderInterval.restart();
    },

    handleSlider: function () {
      element.style.transform = `translateX(
            -${n * (100 / slideCount)}%
        ) translateX(0px)`;

      if (n > slideCount - 2 || n < 1) {
        n = n > slideCount - 2 ? 1 : slideCount - 2;

        setTimeout(() => {
          element.style.transitionDuration = '0ms';
          element.style.transform = `translateX(-${
            n * (100 / slideCount)
          }%) translateX(0px)`;
        }, 500);
      }
      element.style.transitionDuration = '';

      this.currentSlide = n;
    },
  };

  const sliderInterval = interval(() => {
    n++;
    sliderHandler.handleSlider();
  }, slideTime);

  return sliderHandler;
};

type SliderHandler = ReturnType<typeof setSlider>;

export type { SliderHandler };

export default setSlider;
