// =====================================
// NEXA Payment
// payment.js
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTS
  // =====================================

  const planName = document.getElementById("plan-name");
  const planPrice = document.getElementById("plan-price");

  const payBtn = document.getElementById("pay-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  const paymentMessage = document.getElementById("payment-message");

  // =====================================
  // PLAN PRICES
  // =====================================

  const prices = {
    Free: "$0",
    Monthly: "$9.99",
    Yearly: "$79.99"
  };

  // =====================================
  // LOAD PLAN
  // =====================================

  function loadPlan() {

    const plan = localStorage.getItem("nexaPlan");

    if (!plan) {

      if (paymentMessage) {
        paymentMessage.textContent =
          "No subscription plan selected.";
      }

      if (payBtn) {
        payBtn.disabled = true;
      }

      return;
    }

    if (planName) {
      planName.textContent = plan;
    }

    if (planPrice) {
      planPrice.textContent = prices[plan] || "-";
    }

  }

  // =====================================
  // SIMULATE PAYMENT
  // =====================================

  function processPayment() {

    if (paymentMessage) {
      paymentMessage.textContent = "Processing payment...";
    }

    if (payBtn) {
      payBtn.disabled = true;
    }

    setTimeout(() => {

      // Simulate success (90%)
      const success = Math.random() < 0.9;

      if (success) {

        localStorage.setItem(
          "nexaSubscriptionStatus",
          "active"
        );

        window.location.href =
          "payment-success.html";

      } else {

        window.location.href =
          "payment-failed.html";

      }

    }, 2000);

  }

  // =====================================
  // CANCEL
  // =====================================

  function cancelPayment() {

    window.location.href =
      "subscription.html";

  }

  // =====================================
  // EVENTS
  // =====================================

  if (payBtn) {

    payBtn.addEventListener(
      "click",
      processPayment
    );

  }

  if (cancelBtn) {

    cancelBtn.addEventListener(
      "click",
      cancelPayment
    );

  }

  // =====================================
  // INITIALIZE
  // =====================================

  loadPlan();

});