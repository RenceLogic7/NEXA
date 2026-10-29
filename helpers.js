/**
 * =====================================
 * NEXA HELPERS
 * =====================================
 *
 * Shared utility functions used
 * throughout the application.
 *
 * Used by:
 * - auth.js
 * - dashboard.js
 * - payment.js
 * - profile.js
 * - pemdas.js
 * - algebra.js
 * - algebra2.js
 * - statistics.js
 * - calculus.js
 * =====================================
 */

const Helpers = {

  // =====================================
  // RANDOM NUMBER
  // =====================================

  rand(min, max) {

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  },



  // =====================================
  // RANDOM ARRAY ITEM
  // =====================================

  randomItem(array) {

    return array[
      Math.floor(Math.random() * array.length)
    ];

  },



  // =====================================
  // CLAMP NUMBER
  // =====================================

  clamp(value, min, max) {

    return Math.min(
      Math.max(value, min),
      max
    );

  },



  // =====================================
  // FORMAT DATE
  // =====================================

  formatDate(date = new Date()) {

    return date.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

  },



  // =====================================
  // FORMAT TIME
  // =====================================

  formatTime(date = new Date()) {

    return date.toLocaleTimeString(
      "en-US"
    );

  },



  // =====================================
  // CAPITALIZE
  // =====================================

  capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase() +
           text.slice(1);

  },



  // =====================================
  // EMAIL VALIDATION
  // =====================================

  isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  },



  // =====================================
  // PASSWORD VALIDATION
  // =====================================

  isStrongPassword(password) {

    return password.length >= 8;

  },



  // =====================================
  // GENERATE ID
  // =====================================

  generateId() {

    return Date.now().toString(36) +
           Math.random().toString(36).substring(2);

  },



  // =====================================
  // PERCENTAGE
  // =====================================

  percentage(score, total) {

    if (total === 0) return 0;

    return Math.round(
      (score / total) * 100
    );

  },



  // =====================================
  // ROUND DECIMAL
  // =====================================

  round(number, decimalPlaces = 2) {

    return Number(
      number.toFixed(decimalPlaces)
    );

  },



  // =====================================
  // SHUFFLE ARRAY
  // =====================================

  shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [copy[i], copy[j]] =
      [copy[j], copy[i]];

    }

    return copy;

  },



  // =====================================
  // DEBOUNCE
  // =====================================

  debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

      clearTimeout(timer);

      timer = setTimeout(() => {

        callback(...args);

      }, delay);

    };

  },



  // =====================================
  // COPY OBJECT
  // =====================================

  clone(object) {

    return JSON.parse(
      JSON.stringify(object)
    );

  },



  // =====================================
  // SLEEP
  // =====================================

  sleep(milliseconds) {

    return new Promise(resolve => {

      setTimeout(resolve, milliseconds);

    });

  },



  // =====================================
  // URL PARAMETERS
  // =====================================

  getQuery(name) {

    const params =
      new URLSearchParams(
        window.location.search
      );

    return params.get(name);

  },



  // =====================================
  // HTML ESCAPE
  // =====================================

  escapeHTML(text) {

    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

};