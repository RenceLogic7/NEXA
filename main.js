// =====================================
// NEXA API HELPER
// =====================================

const API_BASE_URL = "http://127.0.0.1:5000/api";

window.api = {

    // =====================================
    // GET
    // =====================================

    async get(endpoint) {

        const response = await fetch(API_BASE_URL + endpoint, {

            method: "GET",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message || "Request failed."

            );

        }

        return data;

    },

    // =====================================
    // POST
    // =====================================

    async post(endpoint, body) {

        const response = await fetch(API_BASE_URL + endpoint, {

            method: "POST",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message || "Request failed."

            );

        }

        return data;

    },

    // =====================================
    // PUT
    // =====================================

    async put(endpoint, body) {

        const response = await fetch(API_BASE_URL + endpoint, {

            method: "PUT",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message || "Request failed."

            );

        }

        return data;

    },

    // =====================================
    // DELETE
    // =====================================

    async delete(endpoint) {

        const response = await fetch(API_BASE_URL + endpoint, {

            method: "DELETE",

            credentials: "include",

            headers: {

                "Content-Type": "application/json"

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message || "Request failed."

            );

        }

        return data;

    }

};

// =========================
// NAVIGATION
// =========================

function goTo(path) {

    window.location.href = path;

}

// =========================
// GET SELECTED VALUES
// =========================

function getSettings() {

    return {

        mode:

            document.getElementById("mode")?.value,

        topic:

            document.getElementById("topic")?.value,

        difficulty:

            document.getElementById("difficulty")?.value

    };

}

// =========================
// UI HELPERS
// =========================

function setQuestion(text) {

    const input =

        document.getElementById("questionInput");

    if (input) {

        input.value = text;

    }

}

function getStep() {

    return document

        .getElementById("stepInput")

        ?.value

        .trim();

}

function getAnswer() {

    return document

        .getElementById("answerInput")

        ?.value

        .trim();

}

function clearInputs() {

    const step =

        document.getElementById("stepInput");

    const ans =

        document.getElementById("answerInput");

    if (step) {

        step.value = "";

    }

    if (ans) {

        ans.value = "";

    }

}

// =====================================
// PART 8 — QUIZ LAUNCHER
// =====================================

window.launchQuiz = function (

    subject,

    topic

) {

    // =====================================
    // VALIDATE
    // =====================================

    if (

        !subject ||

        !topic

    ) {

        console.error(

            "launchQuiz(): subject or topic missing."

        );

        return;

    }

    // =====================================
    // BUILD URL
    // =====================================

    const quizURL =

        `quiz.html?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`;

    // =====================================
    // OPEN QUIZ
    // =====================================

    window.location.href = quizURL;

};