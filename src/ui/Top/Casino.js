import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Casino extends LitElement {
  static properties = {
    casinoID: { type: String },
    casinoInfo: { type: Object },
    currentMainImage: { type: Number },
    gridImages: { type: Array },
  };

  constructor() {
    super();
    this.casinoID = '';
    this.casinoInfo = null;
    this.currentMainImage = 0;
    this.gridImages = [1, 2, 3, 4];
  }

  createRenderRoot() {
    return this;
  }

  async firstUpdated() {
    this.casinoInfo = await this.fetchCasinos();
    this.requestUpdate();
  }

  _handleImageClick(event) {
    const thumbnailImg = event.target.closest('.thumbnail-img');
    if (!thumbnailImg) return;

    const gridPosition = parseInt(thumbnailImg.dataset.position, 10);
    this._swapImages(gridPosition);
  }

  _swapImages(gridPosition) {
    const newGridImages = [...this.gridImages];
    const oldMainIndex = this.currentMainImage;
    const clickedImageIndex = newGridImages[gridPosition];

    this.currentMainImage = clickedImageIndex;
    this.gridImages = newGridImages.map(index => (index === clickedImageIndex ? oldMainIndex : index));
  }

  async fetchCasinos() {
    try {
      const response = await fetch('/data/casinos.json');
      const data = await response.json();
      return data.find(casino => casino.casinoInfo.id === this.casinoID);
    } catch (error) {
      console.error('Error fetching casinos:', error);
      return null;
    }
  }

  render() {
    console.log(this.casinoInfo);
    if (this.casinoInfo === null) {
      return html`
        <section id="casino-choices-section" class="flex items-center justify-center">
          <div class="w-full px-4 sm:w-[640px] sm:px-6 md:w-[768px] md:px-8 lg:w-[1024px] lg:px-10 xl:w-[1280px] 2xl:w-[1300px]">
            <h2 class="text-red-600 xl:text-lg">Error fetching casino data. Please try again later.</h2>
          </div>
        </section>
      `;
    }

    return html`
      <article class="flex flex-col gap-6" id="${this.casinoInfo.casinoInfo.id}">
        <section class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <div class="flex flex-col gap-1 lg:flex-row lg:gap-2">
              <h2 class="font-medium lg:text-lg xl:text-xl">${this.casinoInfo.index}. ${this.casinoInfo.casinoInfo.title}</h2>
              <h3 class="font-semibold text-purple lg:text-lg xl:text-xl">${this.casinoInfo.casinoInfo.name}</h3>
            </div>
            <h4 class="text-sm xl:text-base">
              <span class="italic">Per person</span>
              :  Starting at
              <span>£${this.casinoInfo.casinoInfo.pricing.starting}</span>
              , and u to £2697
            </h4>
          </div>

          <p class="lg:text-lg">${this.casinoInfo.casinoInfo.descriptions.mainDescription}</p>

          <p class="lg:text-lg">${this.casinoInfo.casinoInfo.descriptions.secondaryDescription}</p>
        </section>

        <section class="flex flex-col lg:flex-row">
          <div class="flex lg:w-3/12 lg:flex-col">
            <div class="w-4/12 border-[1px] border-[#0F0F0F0D] bg-[#EFEAF6] px-4 pb-16 pt-4 lg:w-full lg:pb-4">
              <h5>Best for</h5>
            </div>

            <div class="w-8/12 border-[1px] border-[#0F0F0F0D] px-4 pb-16 pt-4 lg:w-full lg:flex-1 lg:p-4">
              <p>${this.casinoInfo.casinoInfo.bestFor}</p>
            </div>
          </div>

          <div class="flex lg:w-3/12 lg:flex-col">
            <div class="w-4/12 border-[1px] border-[#0F0F0F0D] bg-[#EFEAF6] px-4 pb-16 pt-4 lg:w-full lg:pb-4">
              <h5>Standout Features</h5>
            </div>

            <div class="w-8/12 border-[1px] border-[#0F0F0F0D] px-4 pb-16 pt-4 lg:w-full lg:flex-1 lg:pb-4">
              <p>${this.casinoInfo.casinoInfo.standOut}</p>
            </div>
          </div>

          <div class="flex lg:w-6/12 lg:flex-col">
            <div class="w-4/12 border-[1px] border-[#0F0F0F0D] bg-[#EFEAF6] px-4 pb-16 pt-4 lg:w-full lg:p-4">
              <h5>Features</h5>
            </div>

            <div class="w-8/12 border-[1px] border-[#0F0F0F0D] px-4 pb-16 pt-4 lg:w-full lg:pb-4">
              <ul class="ml-5 list-disc space-y-1 font-light">
                ${this.casinoInfo.casinoInfo.features.map(feature => {
                  return html`
                    <li>${feature}</li>
                  `;
                })}
              </ul>
            </div>
          </div>
        </section>

        <section class="casino-gallery mb-4 flex w-full flex-col gap-4 lg:h-max lg:flex-row" @click="${this._handleImageClick}">
          <div class="main-image w-full lg:max-h-[550px] lg:w-7/12">
            <img
              src=${this.casinoInfo.gallery[this.currentMainImage].image}
              alt="${this.casinoInfo.gallery[0].metadata}"
              title="${this.casinoInfo.gallery[0].metadata}"
              class="fade-in image-transition h-full max-h-[250px] w-full rounded-lg object-cover lg:min-h-full"
            />
          </div>

          <div class="flex h-full w-full gap-4 lg:w-5/12 lg:flex-wrap lg:justify-between">
            ${this.gridImages.map(
              (index, position) => html`
                <div class="aspect-square h-full w-full lg:h-[45%] lg:w-[47%] xl:w-[48%]">
                  <img
                    src=${this.casinoInfo.gallery[index].image}
                    alt="${this.casinoInfo.gallery[index].metadata || `Casino image ${index + 1}`}"
                    title="${this.casinoInfo.gallery[index].metadata || `Casino image ${index + 1}`}"
                    data-position="${position}"
                    class="thumbnail-img fade-in image-transition h-full w-full rounded-lg object-cover transition-all duration-150 hover:scale-95 hover:cursor-pointer"
                  />
                </div>
              `
            )}
          </div>
        </section>

        <section class="flex w-full justify-center lg:justify-start">
          <a
            class="gradient w-full max-w-[400px] rounded-full px-4 py-2 text-center font-medium text-white transition-all duration-200 hover:scale-95 sm:max-w-[300px] lg:text-lg"
            href="booking.html?casino-id=${this.casinoInfo.casinoInfo.id}&casino-name=${this.casinoInfo.casinoInfo.name}"
          >
            ${this.casinoInfo.ctaButton}
          </a>
        </section>
      </article>
    `;
  }
}

customElements.define('casino-element', Casino);
