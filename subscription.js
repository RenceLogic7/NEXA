// =====================================
// NEXA Subscription
// subscription.js
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const currentPlan = document.getElementById("currentPlan");
    const planStatus = document.getElementById("planStatus");
    const renewalDate = document.getElementById("renewalDate");

    const monthlyPrice = document.getElementById("monthlyPrice");
    const annualPrice = document.getElementById("annualPrice");

    const monthlySubscribe = document.getElementById("monthlySubscribe");
    const annualSubscribe = document.getElementById("annualSubscribe");

    const addPaymentMethod = document.getElementById("addPaymentMethod");

    const renewSubscription = document.getElementById("renewSubscription");
    const cancelSubscription = document.getElementById("cancelSubscription");

    const billingHistory = document.getElementById("billingHistory");

    // =====================================
    // DEFAULT SUBSCRIPTION
    // (Temporary until backend is connected)
    // =====================================

    const subscription = {

        plan: localStorage.getItem("nexaPlan") || "Free",

        status: localStorage.getItem("nexaSubscriptionStatus") || "Active",

        renewalDate:
            localStorage.getItem("nexaRenewalDate") || "—",

        monthlyPrice: "$9.99",

        annualPrice: "$89.99"

    };

    // =====================================
    // LOAD SUBSCRIPTION
    // =====================================

    function loadSubscription() {

        if (currentPlan) {

            currentPlan.textContent = subscription.plan;

        }

        if (planStatus) {

            planStatus.textContent = subscription.status;

        }

        if (renewalDate) {

            renewalDate.textContent = subscription.renewalDate;

        }

    }

    // =====================================
    // LOAD PRICES
    // =====================================

    function loadPrices() {

        if (monthlyPrice) {

            monthlyPrice.textContent = subscription.monthlyPrice;

        }

        if (annualPrice) {

            annualPrice.textContent = subscription.annualPrice;

        }

    }

        // =====================================
    // SAVE SUBSCRIPTION
    // =====================================

    function saveSubscription() {

        localStorage.setItem("nexaPlan", subscription.plan);

        localStorage.setItem(
            "nexaSubscriptionStatus",
            subscription.status
        );

        localStorage.setItem(
            "nexaRenewalDate",
            subscription.renewalDate
        );

    }

    // =====================================
    // MONTHLY SUBSCRIPTION
    // =====================================

    function subscribeMonthly() {

        subscription.plan = "Premium Monthly";

        subscription.status = "Active";

        subscription.renewalDate = "30 Days";

        saveSubscription();
        savePayment("Premium Monthly", subscription.monthlyPrice);

        loadSubscription();

        alert(
            "Monthly subscription selected.\n\nPayment integration will be connected next."
        );

        // Later
        // window.location.href = "payment.html";

    }

    // =====================================
    // ANNUAL SUBSCRIPTION
    // =====================================

    function subscribeAnnual() {

        subscription.plan = "Premium Annual";

        subscription.status = "Active";

        subscription.renewalDate = "1 Year";

        saveSubscription();
        savePayment("Premium Annual", subscription.annualPrice);

        loadSubscription();

        alert(
            "Annual subscription selected.\n\nPayment integration will be connected next."
        );

        // Later
        // window.location.href = "payment.html";

    }

    // =====================================
    // RENEW SUBSCRIPTION
    // =====================================

    function renewPlan() {

        if (subscription.plan === "Free") {

            alert(
                "You are currently using the Free plan."
            );

            return;

        }

        alert(
            "Renewal will be available after payment integration."
        );

    }

    // =====================================
    // CANCEL SUBSCRIPTION
    // =====================================

    function cancelPlan() {

        const confirmCancel = confirm(

            "Are you sure you want to cancel your subscription?"

        );

        if (!confirmCancel) return;

        subscription.plan = "Free";

        subscription.status = "Cancelled";

        subscription.renewalDate = "—";

        saveSubscription();

        loadSubscription();

        alert("Subscription cancelled.");

    }

    // =====================================
    // PAYMENT METHOD
    // =====================================

    function addCard() {

        alert(

            "Payment methods will be available after Paystack and Flutterwave integration."

        );

    }

    // =====================================
    // EVENTS
    // =====================================

    if (monthlySubscribe) {

        monthlySubscribe.addEventListener(

            "click",

            subscribeMonthly

        );

    }

    if (annualSubscribe) {

        annualSubscribe.addEventListener(

            "click",

            subscribeAnnual

        );

    }

    if (renewSubscription) {

        renewSubscription.addEventListener(

            "click",

            renewPlan

        );

    }

    if (cancelSubscription) {

        cancelSubscription.addEventListener(

            "click",

            cancelPlan

        );

    }

    if (addPaymentMethod) {

        addPaymentMethod.addEventListener(

            "click",

            addCard

        );

    }

        // =====================================
    // BILLING HISTORY
    // =====================================

    function loadBillingHistory() {

        if (!billingHistory) return;

        const payments = JSON.parse(

            localStorage.getItem("nexaBillingHistory") || "[]"

        );

        renderBillingHistory(payments);

    }

    // =====================================
    // RENDER BILLING TABLE
    // =====================================

    function renderBillingHistory(payments) {

        if (!billingHistory) return;

        if (payments.length === 0) {

            billingHistory.innerHTML = `

                <tr>

                    <td colspan="5">

                        No payments yet.

                    </td>

                </tr>

            `;

            return;

        }

        billingHistory.innerHTML = "";

        payments.forEach(payment => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${payment.date}</td>

                <td>${payment.plan}</td>

                <td>${payment.amount}</td>

                <td>${payment.status}</td>

                <td>

                    <button class="btn">

                        Receipt

                    </button>

                </td>

            `;

            billingHistory.appendChild(row);

        });

    }

    // =====================================
    // ADD PAYMENT
    // (Temporary until backend)
    // =====================================

    function savePayment(plan, amount) {

        const payments = JSON.parse(

            localStorage.getItem("nexaBillingHistory") || "[]"

        );

        payments.unshift({

            date: new Date().toLocaleDateString(),

            plan,

            amount,

            status: "Successful"

        });

        localStorage.setItem(

            "nexaBillingHistory",

            JSON.stringify(payments)

        );

    }

    // =====================================
    // BACKEND READY
    // =====================================

    /*
        Later these functions will become:

        GET    /api/payments/history

        POST   /api/payments/initialize

        POST   /api/payments/verify

        instead of using localStorage.

        Only this section will change.
        The rest of subscription.js can remain exactly
        the same.
    */

    // =====================================
    // INITIALIZE
    // =====================================

    loadSubscription();
    loadPrices();
    loadBillingHistory();

});