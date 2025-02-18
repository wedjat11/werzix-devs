import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Constants
const SECTIONS = {
  HERO: 'hero-section',
  ABOUT: 'about-section',
  SERVICES: 'services-section',
  GAMES: 'games-section',
};

const HEADER_HEIGHT = 80;
const INTERSECTION_OPTIONS = {
  root: null,
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0,
};

export class NavbarMobile extends LitElement {
  static properties = {
    isLanding: {
      type: Boolean,
      attribute: 'is-landing',
      converter: {
        fromAttribute: value => value !== 'false',
        toAttribute: value => value.toString(),
      },
    },
    isMenuOpen: { type: Boolean, state: true },
    activeSection: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .menu-transition {
      transform: translateX(var(--menu-position, -100%));
      transition: transform 0.3s ease-in-out;
    }

    .menu-open {
      --menu-position: 0;
    }

    .menu-item {
      opacity: 0;
      transform: translateX(-30px);
      transition:
        opacity 0.4s ease-in-out,
        transform 0.4s ease-in-out;
    }

    .menu-open .menu-item {
      opacity: 1;
      transform: translateX(0);
    }

    .active {
      font-weight: bold;
      color: #db2955;
    }
  `;

  constructor() {
    super();
    this.isMenuOpen = false;
    this.activeSection = '';
    this.observers = new Map();
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeNavigation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObservers();
  }

  initializeNavigation() {
    this.handleInitialHash();
    if (this.isLanding) {
      this.setupIntersectionObservers();
    }
  }

  handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
      this.activeSection = hash.slice(1);
      if (this.isLanding) {
        setTimeout(() => this.scrollToSection(this.activeSection), 100);
      }
    }
  }

  setupIntersectionObservers() {
    Object.values(SECTIONS).forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section && !this.observers.has(sectionId)) {
        const observer = this.createSectionObserver(sectionId);
        observer.observe(section);
        this.observers.set(sectionId, observer);
      }
    });
  }

  createSectionObserver(sectionId) {
    return new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = sectionId;
          this.requestUpdate();
        }
      });
    }, INTERSECTION_OPTIONS);
  }

  cleanupObservers() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.offsetTop - HEADER_HEIGHT;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  handleNavClick(e, sectionId) {
    e.preventDefault();
    this.closeMenu();

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  renderNavItems() {
    return Object.values(SECTIONS).map(
      (sectionId, index) => html`
        <li class="menu-item w-full" style="transition-delay: ${index * 0.1}s">
          <a
            href="${this.getNavItemHref(sectionId)}"
            class="${this.activeSection === sectionId ? 'active' : ''} flex w-full items-center justify-center text-center text-lg capitalize text-black"
            @click="${e => this.handleNavClick(e, sectionId)}"
          >
            ${sectionId.replace('-section', '').replace('hero', 'home')}
          </a>
        </li>
      `
    );
  }

  render() {
    return html`
      <link rel="stylesheet" href="/public/styles/output.css" />

      <header class="bg-gray/85 fixed z-50 flex w-full items-center justify-center py-5 backdrop-blur-lg md:hidden">
        <div class="w-full px-4 sm:w-[640px] sm:px-6 md:w-full md:px-8">
          <nav class="relative flex h-[80px] w-full justify-between rounded-md bg-white px-4">
            <div class="flex items-center gap-4 text-lg">
              <a class="flex items-center gap-2" href="${this.getNavItemHref(SECTIONS.HERO)}" @click="${e => this.handleNavClick(e, SECTIONS.HERO)}">
                <img class="w-[45px] object-contain" src="/public/assets/navbar/logo.png" alt="[change_NAME] logo" title="[change_NAME]" />
              </a>
            </div>
            <button class="flex items-center justify-center" @click="${this.toggleMenu}" aria-label="Toggle menu">
              <img src="/public/assets/navbar/menu-icon.png" class="size-10 object-contain" alt="Menu icon" />
            </button>
          </nav>

          <div class="menu-transition ${this.isMenuOpen ? 'menu-open' : ''} absolute left-0 right-0 top-0 z-50 flex h-screen w-full flex-col justify-center gap-12 bg-white px-8 text-black shadow-md">
            <button @click="${this.toggleMenu}" class="fixed right-0 top-0 m-4" aria-label="Close menu">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0ibTcuNzU3IDE2LjI0M2w4LjQ4Ni04LjQ4Nm0wIDguNDg2TDcuNzU3IDcuNzU3TTIyIDEyYzAgNS41MjMtNC40NzcgMTAtMTAgMTBTMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAiLz48L3N2Zz4="
                class="size-8 object-contain"
                alt="Close menu"
              />
            </button>
            <ul class="flex w-full flex-col gap-10">
              ${this.renderNavItems()}
            </ul>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('navbar-mobile', NavbarMobile);
