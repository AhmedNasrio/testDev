/**
 * Shop The Look Section Component
 * 
 * Handles product popup functionality for image hotspots
 */

export class ShopTheLook extends HTMLElement {
  constructor() {
    super();
    this.sectionId = this.getAttribute('data-section-id');
    this.handleHotspotClick = this.handleHotspotClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    this.initHotspots();
  }

  disconnectedCallback() {
    this.destroyHotspots();
  }

  toggleHotspotListeners(action) {
    const hotspotTriggers = this.querySelectorAll('.shop-the-look__hotspot-trigger');

    hotspotTriggers.forEach(trigger => {
      trigger[action]('click', this.handleHotspotClick);
    });

    document[action]('click', this.handleOutsideClick);
  }

  initHotspots() {
    this.toggleHotspotListeners('addEventListener');
  }

  destroyHotspots() {
    this.toggleHotspotListeners('removeEventListener');
  }

  handleHotspotClick(event) {
    event.stopPropagation();
    const trigger = event.currentTarget;
    const hotspot = trigger.closest('.shop-the-look__hotspot');
    const isActive = hotspot.classList.contains('is-active');

    // Close all other popups first
    this.closeAllPopups();

    // Toggle current popup
    if (!isActive) {
      hotspot.classList.add('is-active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  handleOutsideClick(event) {
    const isInsideHotspot = event.target.closest('.shop-the-look__hotspot');
    const isInsidePopup = event.target.closest('.shop-the-look__hotspot-popup');
    if (!isInsideHotspot && !isInsidePopup) {
      this.closeAllPopups();
    }
  }

  closePopup(hotspot) {
    if (hotspot) {
      hotspot.classList.remove('is-active');
      const trigger = hotspot.querySelector('.shop-the-look__hotspot-trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    }
  }

  closeAllPopups() {
    const activeHotspots = this.querySelectorAll('.shop-the-look__hotspot.is-active');
    activeHotspots.forEach(hotspot => this.closePopup(hotspot));
  }
}

if (!customElements.get('shop-the-look')) {
  customElements.define('shop-the-look', ShopTheLook);
}

