import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

const SECTIONS = ['hero-section', 'about-section', 'services-section', 'games-section', 'contact-us-section'];
const HEADER_HEIGHT = 120;

export class NavbarDesktop extends LitElement {
  static properties = {
    isLanding: {
      type: Boolean,
      attribute: 'is-landing',
      converter: {
        fromAttribute: value => value !== 'false',
        toAttribute: value => value.toString(),
      },
    },
    activeSection: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .active {
      color: #153131;
      font-weight: bolder;
    }

    .nav-item {
      position: relative;
    }

    .nav-item::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: #153131;
      transition: width 0.3s ease-in-out;
    }

    .nav-item.active::after {
      width: 100%;
    }
  `;

  constructor() {
    super();
    this.activeSection = '';
    this.observers = new Map();
    this.scrollTimeout = null;
    this.isScrolling = false;
    this.isProgrammaticScroll = false;
  }

  firstUpdated() {
    const hash = window.location.hash;
    if (hash) {
      this.activeSection = hash.slice(1);
      if (this.isLanding) {
        setTimeout(() => {
          this.scrollToSection(this.activeSection);
        }, 100);
      }
    }

    if (this.isLanding) {
      this.setupIntersectionObservers();
      this.setupScrollListener();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup();
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  setupScrollListener() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  handleScroll() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.isScrolling = true;
    this.scrollTimeout = setTimeout(() => this.onScrollEnd(), 150);
  }

  onScrollEnd() {
    this.isScrolling = false;
    const mostVisibleSection = this.getMostVisibleSection();

    if (mostVisibleSection && mostVisibleSection !== this.activeSection) {
      this.activeSection = mostVisibleSection;
      this.requestUpdate();

      if (!this.isProgrammaticScroll) {
        history.replaceState(null, null, `#${mostVisibleSection}`);
      }
    }
  }

  getMostVisibleSection() {
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const viewportMiddle = scrollPosition + viewportHeight / 2;

    let mostVisibleSection = null;
    let closestDistance = Infinity;

    SECTIONS.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollPosition;
      const sectionMiddle = sectionTop + rect.height / 2;
      const distance = Math.abs(viewportMiddle - sectionMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        mostVisibleSection = sectionId;
      }
    });

    return mostVisibleSection;
  }

  setupIntersectionObservers() {
    const options = {
      root: null,
      rootMargin: '-10% 0px -85% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
    };

    SECTIONS.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section && !this.observers.has(sectionId)) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.isScrolling) {
              if (entry.intersectionRatio > 0.25) {
                this.activeSection = sectionId;
                this.requestUpdate();
              }
            }
          });
        }, options);

        observer.observe(section);
        this.observers.set(sectionId, observer);
      }
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      this.isProgrammaticScroll = true;
      const offset = section.offsetTop - HEADER_HEIGHT;

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.isProgrammaticScroll = false;
      }, 1000);
    }
  }

  handleNavClick(e, sectionId) {
    e.preventDefault();

    if (!this.isLanding) {
      window.location.href = `/index.html#${sectionId}`;
      return;
    }

    this.activeSection = sectionId;
    this.scrollToSection(sectionId);
    history.pushState(null, null, `#${sectionId}`);
  }

  getNavItemHref(sectionId) {
    return this.isLanding ? `#${sectionId}` : `/index.html#${sectionId}`;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/public/styles/output.css" />
      <link rel="stylesheet" href="/public/styles/globals.css" />

      <header class="bg-gray/85 fixed z-50 hidden w-full items-center justify-center py-5 text-black backdrop-blur-md md:inline-flex">
        <div class="w-full px-4 sm:w-[640px] sm:px-6 md:w-full md:px-8 lg:w-[1024px] lg:px-4 xl:w-[1150px] 2xl:w-[1400px]">
          <nav class="flex h-[80px] w-full items-center justify-between rounded-md bg-white px-5 shadow-lg">
            <div class="flex flex-grow-0 items-center">
              <div class="flex items-center gap-2 text-lg font-normal">
                <a href="${this.getNavItemHref('hero-section')}" @click="${e => this.handleNavClick(e, 'hero-section')}">
                  <img id="navbar-logo" class="size-12 shrink-0 object-contain" src="/public/assets/navbar/logo.png" alt="[change_NAME] logo" title="[change_NAME]" />
                </a>
              </div>
            </div>

            <div class="flex-grow-1">
              <div class="font-normal">
                <ul id="nav-items" class="flex justify-center gap-10 xl:gap-20">
                  <li class="nav-item ${this.activeSection === 'hero-section' ? 'active' : ''} transition-all duration-200" id-nav="hero-section">
                    <a href="${this.getNavItemHref('hero-section')}" @click="${e => this.handleNavClick(e, 'hero-section')}">Home</a>
                  </li>
                  <li class="nav-item ${this.activeSection === 'about-section' ? 'active' : ''} transition-all duration-200" id-nav="about-section">
                    <a href="${this.getNavItemHref('about-section')}" @click="${e => this.handleNavClick(e, 'about-section')}">About Us</a>
                  </li>
                  <li class="nav-item ${this.activeSection === 'services-section' ? 'active' : ''} transition-all duration-200" id-nav="services-section">
                    <a href="${this.getNavItemHref('services-section')}" @click="${e => this.handleNavClick(e, 'services-section')}">Services</a>
                  </li>
                  <li class="nav-item ${this.activeSection === 'games-section' ? 'active' : ''} transition-all duration-200" id-nav="games-section">
                    <a href="${this.getNavItemHref('games-section')}" @click="${e => this.handleNavClick(e, 'games-section')}">Games</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex-grow-0">
              <a
                href="${this.getNavItemHref('contact-us-section')}"
                @click="${e => this.handleNavClick(e, 'contact-us-section')}"
                class="bg-red hidden rounded-md px-5 py-2.5 text-white transition-all duration-200 hover:scale-105 lg:block"
              >
                <span class="font-light">Contact Us</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('navbar-desktop', NavbarDesktop);
