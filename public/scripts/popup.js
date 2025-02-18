const cookieManager = {
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  },

  getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length);
      }
    }
    return null;
  },
};

const modalManager = {
  modals: {
    ageVerification: { cookieName: '[change_DOMAIN]_age', expirationDays: 2 },
    cookiesModal: { cookieName: '[change_DOMAIN]_cookies', expirationDays: 3 },
  },

  init() {
    for (const modalId in this.modals) {
      const { cookieName } = this.modals[modalId];

      if (cookieManager.getCookie(cookieName) !== 'true') {
        this.showModal(modalId);
      }
    }
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.style.display = 'none';
    }
  },

  verifyModal(modalId, isAccepted, redirectUrl = null) {
    const modalConfig = this.modals[modalId];
    if (!modalConfig) return;

    const { cookieName, expirationDays } = modalConfig;

    if (isAccepted) {
      cookieManager.setCookie(cookieName, 'true', expirationDays);
      this.hideModal(modalId);
    } else {
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      this.hideModal(modalId);
    }
  },
};

window.onload = function () {
  modalManager.init();
};
