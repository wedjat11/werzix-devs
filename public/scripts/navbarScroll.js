document.addEventListener('DOMContentLoaded', async () => {
  async function scrollToHashSection() {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      const section = document.getElementById(sectionId);

      if (section) {
        requestAnimationFrame(() => {
          const headerHeight = 120;
          const offset = section.offsetTop - headerHeight;
          window.scrollTo({
            top: offset,
            behavior: 'smooth',
          });

          setTimeout(() => {
            document.body.setAttribute('data-scroll-ready', 'true');
          }, 500);
        });
      } else {
        setTimeout(scrollToHashSection, 100);
      }
    }
  }

  await Promise.all([customElements.whenDefined('navbar-desktop'), customElements.whenDefined('hero-section'), customElements.whenDefined('about-section')]);

  document.body.setAttribute('data-scroll-ready', 'false');

  scrollToHashSection();

  window.addEventListener('hashchange', scrollToHashSection);
});
