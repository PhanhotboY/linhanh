function interval(callback: Function, time: number) {
  let timer: number | null = setInterval(callback, time);

  const intervalHandler = {
    stop: function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      return this;
    },

    start: function () {
      if (!timer) {
        this.stop();
        timer = setInterval(callback, time);
      }
      return this;
    },

    restart: function (newTime = time) {
      time = newTime;
      return this.stop().start();
    },
  };

  return intervalHandler;
}

export default interval;
