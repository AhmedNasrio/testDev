class ProductHighlights extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.sectionId = this.getAttribute('data-section-id');
  }

  connectedCallback() {
    this.swiperInit();
  }

  disconnectedCallback() {
    this.swiperDestroy();
  }

  swiperInit() {
    if (!window.Swiper || !this.sectionId) {
      console.error('Swiper library not loaded or section ID missing');
      return;
    }

    const swiperEl = this.querySelector('.swiper');
    if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) {
      return;
    }

    try {
      this.swiper = new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: swiperEl.querySelector('.product-highlights__arrow--next'),
          prevEl: swiperEl.querySelector('.product-highlights__arrow--prev'),
        },
        pagination: {
          el: swiperEl.querySelector('.product-highlights__pagination'),
          clickable: true,
          enabled: true, // Enabled by default for product-highlights
        },
      });
    } catch (error) {
      console.error('Error initializing Product Highlights Swiper:', error);
    }
  }

  swiperDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

if (!customElements.get('product-highlights')) {
  customElements.define('product-highlights', ProductHighlights);
}

