// =========================
// HOMEPAGE LOGIC
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const subjectCards = document.querySelectorAll(".card[data-subject]");

    subjectCards.forEach(card => {

        card.addEventListener("click", () => {

            const subject = card.dataset.subject;

            goTo(`topics.html?subject=${subject}`);

        });

    });

});


// =========================
// OPTIONAL: MODAL HANDLING
// =========================
function openModal(type) {
  alert(type === "about" 
    ? "NEXA is a math learning platform."
    : "Guide coming soon.");
}