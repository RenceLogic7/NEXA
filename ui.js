/**
 * =====================================
 * NEXA UI HELPERS
 * =====================================
 *
 * Shared UI functions used throughout
 * the application.
 *
 * Used by:
 * - auth.js
 * - dashboard.js
 * - payment.js
 * - profile.js
 * - calculus.js
 * - algebra.js
 * - statistics.js
 * =====================================
 */

const UI = {

  // =====================================
  // LOADING
  // =====================================

  showLoading(button, text = "Loading...") {

    if (!button) return;

    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = text;

  },

  hideLoading(button) {

    if (!button) return;

    button.disabled = false;

    if (button.dataset.originalText) {
      button.innerHTML = button.dataset.originalText;
    }

  },



  // =====================================
  // ALERTS
  // =====================================

  success(message) {
    alert(message);
  },

  error(message) {
    alert(message);
  },

  info(message) {
    alert(message);
  },



  // =====================================
  // SHOW / HIDE
  // =====================================

  show(element) {

    if (typeof element === "string") {
      element = document.getElementById(element);
    }

    if (element) {
      element.style.display = "";
    }

  },

  hide(element) {

    if (typeof element === "string") {
      element = document.getElementById(element);
    }

    if (element) {
      element.style.display = "none";
    }

  },



  // =====================================
  // ENABLE / DISABLE
  // =====================================

  enable(element) {

    if (typeof element === "string") {
      element = document.getElementById(element);
    }

    if (element) {
      element.disabled = false;
    }

  },

  disable(element) {

    if (typeof element === "string") {
      element = document.getElementById(element);
    }

    if (element) {
      element.disabled = true;
    }

  },



  // =====================================
  // INPUT HELPERS
  // =====================================

  clearInput(id) {

    const input = document.getElementById(id);

    if (input) {
      input.value = "";
    }

  },

  clearForm(formId) {

    const form = document.getElementById(formId);

    if (form) {
      form.reset();
    }

  },



  // =====================================
  // TEXT
  // =====================================

  setText(id, text) {

    const element = document.getElementById(id);

    if (element) {
      element.textContent = text;
    }

  },

  setHTML(id, html) {

    const element = document.getElementById(id);

    if (element) {
      element.innerHTML = html;
    }

  },



  // =====================================
  // MODALS
  // =====================================

  openModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
      modal.style.display = "flex";
    }

  },

  closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {
      modal.style.display = "none";
    }

  },



  // =====================================
  // ACTIVE BUTTON
  // =====================================

  setActiveButton(buttons, activeButton) {

    buttons.forEach(btn => {
      btn.classList.remove("active");
    });

    activeButton.classList.add("active");

  },



  // =====================================
  // PAGE NAVIGATION
  // =====================================

  goTo(page) {

    window.location.href = page;

  },



  // =====================================
  // CONFIRMATION
  // =====================================

  confirm(message) {

    return window.confirm(message);

  },



  // =====================================
  // SCROLL
  // =====================================

  scrollTop() {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  },



  // =====================================
  // COPY TEXT
  // =====================================

  copy(text) {

    navigator.clipboard.writeText(text);

  }

};