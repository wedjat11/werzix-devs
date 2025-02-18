import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Hero extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        #hero-section {
          min-height: max-content;
          padding: 0 0 50px 0;
        }
        @media (min-width: 1524px) {
          #hero-section {
            height: calc(80vh);
            min-height: 600px;
          }
        }

        @media (min-width: 1024px) {
          #hero-section {
            height: calc(100vh);
            min-height: 600px;
            padding: 0;
          }
        }
      </style>

      <section id="hero-section" class="flex items-center justify-center">
        <div
          class="mt-[130px] flex h-full w-full flex-col items-center justify-center gap-8 px-4 sm:w-[640px] sm:px-6 md:w-[768px] md:px-8 lg:mt-[80px] lg:w-[1024px] lg:px-10 xl:w-[1280px] 2xl:w-[1300px]"
        >
          <h1 class="text-3xl font-normal md:text-4xl xl:text-5xl">
            <span class="text-purple">Top 7 Casinos in</span>
            <br class="sm:hidden" />
            Birmingham, UK
          </h1>

          <p class="text-center md:w-[600px] md:text-lg lg:w-[800px] xl:w-[600px] xl:text-xl">
            Where the best gaming venues from the West Midlands come together. Explore the thrilling venues this UK city has to offer in one place!
          </p>

          <div class="flex gap-6">
            <a href="#top-7-section" class="gradient rounded-2xl px-4 py-2 text-center font-medium text-white transition-all duration-200 hover:scale-95 md:text-lg lg:px-6 lg:text-xl">
              Explore the venues
            </a>
            <a
              href="/booking.html"
              class="rounded-2xl bg-gradient px-4 py-2 text-center font-medium shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-200 hover:scale-95 md:text-lg lg:px-6 lg:text-xl"
            >
              Book a casino
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-section', Hero);
