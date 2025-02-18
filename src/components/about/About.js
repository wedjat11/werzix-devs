import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class About extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section id="about-section" class="flex items-center justify-center">
        <div class="w-full px-4 sm:w-[640px] sm:px-6 md:w-[768px] md:px-8 lg:w-[1024px] lg:px-10 xl:w-[1280px] 2xl:w-[1300px]">
          <div class="flex flex-col gap-4 rounded-xl border-[1px] border-[#0F0F0F1A] p-6 lg:p-8">
            <h2 class="text-lg font-medium xl:text-2xl">At Best 10 UK Spots we have meticulously curated a selection of the top casino venues in Birmingham</h2>

            <p class="text-base font-normal lg:text-lg xl:text-xl xl:leading-relaxed">
              Providing you with a comprehensive array of its services, amenities and details available in one single place. The comprehensive range of gaming venues in this Midlands town is testament
              to its thriving entertainment scene.
            </p>

            <p class="text-base font-normal lg:text-lg xl:text-xl xl:leading-relaxed">
              Birmingham’s diverse gaming establishments cater to every casino enthusiast and guest, with a broad selection of live classic games. Whether local or visitor from afar, don’t miss the
              great live casino games on offer throughout our specialized platform.
            </p>

            <p class="text-base font-normal lg:text-lg xl:text-xl xl:leading-relaxed">
              London has its fair share of luxury casinos. There are boutique resorts all over the capital city, from Leicester Square to Piccadilly, where film stars are often seen, and which has
              earned its reputation in popular culture for several cameos and mentions in film and other media outlets. However, London is not the only city in the United Kingdom to offer a mix of
              exclusive gaming entertainment with opulent decadence.
            </p>

            <p class="text-base font-normal lg:text-lg xl:text-xl xl:leading-relaxed">
              There are simply just not enough words to describe the hidden gem that Birmingham is within the casino scene. Not only positioning itself as the second largest UK town for gaming
              entertainment, but also, low key, leading its way worldwide. We have noticed this trend and decided to provide you with the ultimate hub to guide you through the thrilling casinos
              Birmingham has to offer.
            </p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('about-section', About);
