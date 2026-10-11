class Slider {
  constructor() {
    this.track = document.querySelector('.slider-track');
    this.originalSlides = [...this.track.querySelectorAll('.slide')];
    this.count = this.originalSlides.length;

    this.track.appendChild(this.originalSlides[0].cloneNode(true));
    this.track.insertBefore(this.originalSlides[this.count - 1].cloneNode(true), this.originalSlides[0]);

    this.slides = [...this.track.querySelectorAll('.slide')];
    this.index = 1;
    this.locked = false;
    this.timer = null;

    this.dotsContainer = document.querySelector('.dots');
    this.dots = [...Array(this.count)].map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.onclick = () => this.goTo(i);
      this.dotsContainer.appendChild(dot);
      return dot;
    });

    document.querySelector('.prev').onclick = () => this.move(-1);
    document.querySelector('.next').onclick = () => this.move(1);
    this.track.addEventListener('transitionend', () => this.settle());

    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => this.stop());
    slider.addEventListener('mouseleave', () => this.start());

    this.render(false);
    this.start();
  }

  start() {
    this.timer = setInterval(() => this.move(1), 4000);
  }

  stop() {
    clearInterval(this.timer);
  }

  move(dir) {
    if (this.locked) return;
    this.locked = true;
    this.index += dir;
    this.render(true);
  }

  goTo(i) {
    if (this.locked) return;
    this.locked = true;
    this.index = i + 1;
    this.render(true);
  }

  render(animate) {
    this.track.style.transition = animate ? '' : 'none';
    this.track.style.transform = `translateX(${-this.index * 100}%)`;
    if (!animate) this.track.offsetHeight;
    const real = (this.index - 1 + this.count) % this.count;
    this.dots.forEach((d, i) => d.classList.toggle('active', i === real));
  }

  settle() {
    if (this.index === 0) {
      this.index = this.count;
      this.render(false);
    } else if (this.index === this.slides.length - 1) {
      this.index = 1;
      this.render(false);
    }
    this.locked = false;
  }
}

new Slider();