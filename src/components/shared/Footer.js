import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Footer extends LitElement {
  static properties = {
    isLanding: {
      type: Boolean,
      attribute: 'is-landing',
      converter: {
        fromAttribute: value => value !== 'false',
        toAttribute: value => value.toString(),
      },
    },
  };

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/public/styles/output.css" />
      <div class="bg-black text-white ">
        <div class="gap-6 flex flex-col px-4 lg:flex-row lg:w-11/12 lg:mx-auto lg:justify-between  lg:items-center">
          <div class="flex flex-col gap-4 pt-20 lg:w-1/3 lg:justify-center lg:pt-0 ">
            <img src="/public/assets/footer/logo.webp" class="object-contain w-[90px]" alt="Best 10 UK Spots logo" title="Best 10 UK Spots logo" />
            <div class="text-3xl font-normal font-Instrument capitalize leading-[34px]">Discover Birmingham’s top gaming casinos</div>
          </div>
          <section class="flex flex-col gap-10 pt-6 lg:flex-row lg:w-1/3 lg:justify-between ">
            <div class="flex gap-5 flex-col">
              <p class="font-medium">Navigation</p>
              <ul class="flex gap-[10px] flex-col text-sm">
                <li><a href="${this.isLanding ? '#hero-section' : 'index.html'}">Home</a></li>
                <li><a href="${this.isLanding ? '#about-section' : 'index.html#about-section'}">About Us</a></li>
                <li><a href="${this.isLanding ? '#why-us-section' : 'index.html#why-us-section'}">Why Us?</a></li>
                <li><a href="${this.isLanding ? '#top-7-section' : 'index.html#top-7-section'}">Top 7</a></li>
                <li><a href="${this.isLanding ? '#faq-section' : 'index.html#faq-section'}">F.A.Q</a></li>
              </ul>
            </div>
            <div class="flex gap-5 flex-col">
              <p class="font-medium">Company</p>

              <ul class="flex gap-[10px]  text-white flex-col text-sm">
                <li>Name: Best 10 UK Spots</li>
                <li>
                  Email Address:
                  <a href="mailto:info@best10ukspots.com">info@best10ukspots.com</a>
                </li>
                <li>
                  Support Email:
                  <a href="mailto:support@best10ukspots.com">support@best10ukspots.com</a>
                </li>
                <li>Address: Pure Offices, Turnberry Park Rd, Morley, Gildersome, Leeds LS27 7LE, United Kingdom</li>
                <li>
                  Phone Number:
                  <a href="tel:+44 113 350 1011">+44 113 350 1011</a>
                </li>
              </ul>
            </div>
          </section>
          <section class="flex flex-col gap-8 pb-4 lg:w-1/5 ">
            <p class="font-medium">Paymet Methods</p>
            <div class="flex flex-row gap-5 flex-wrap w-9/12 [&>img]:object-contain  [&>img]:w-[60px] lg:w-full ">
              <img src="/public/assets/footer/mastercard.webp" alt="MasterCard logo" title="MasterCard logo" />
              <img src="/public/assets/footer/maestro.webp" alt="Maestro logo" title="Maestro logo" />
              <img src="/public/assets/footer/visa.webp" alt="Visa logo" title="Visa logo" />
              <img src="/public/assets/footer/amex.webp" alt="American Express logo" title="American Express logo" />
              <img src="/public/assets/footer/apple.webp" alt="Apple Pay logo" title="Apple Pay logo" />
              <img src="/public/assets/footer/google.webp" alt="Google Pay logo" title="Google Pay logo" />
            </div>
          </section>
        </div>
        <div class=" lg:py-7 lg:w-11/12 lg:mx-auto">
          <hr class="border-[#FFFFFF1A] w-full " />
        </div>

        <div class=" flex flex-col lg:justify-between lg:flex-row-reverse lg:py-4 lg:items-center lg:w-11/12 lg:mx-auto">
          <section class="pt-4">
            <ul class="flex gap-5 flex-col text-sm lg:flex-row">
              <li><a href="terms-and-conditions.html">Terms and Conditions</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="cookie-policy.html">Cookie Policy</a></li>
            </ul>
          </section>
          <div>
            <p class="text-sm ">©2025 Best 10 UK Spots. All rights reserved</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('footer-element', Footer);
