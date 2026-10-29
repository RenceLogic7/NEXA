// =====================================
// NEXA Topics
// topics.js
// Part 1 – Core Topics
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const subjectTitle = document.getElementById("subject-title");
    const topicsGrid = document.getElementById("topics-grid");

    // =====================================
    // CURRENT SUBJECT
    // =====================================

    let currentSubject = "";

    // =====================================
    // TOPICS DATABASE
    // (Temporary until backend is connected)
    // =====================================

    const topicsMap = {

        pemdas: [

            { title: "Introduction", file: "intro" },
            { title: "Brackets", file: "brackets" },
            { title: "Exponents", file: "exponents" },
            { title: "Multiply & Divide", file: "operations" },
            { title: "Add & Subtract", file: "operations" }
        ],

        algebra: [

            { title: "Expressions", file: "expressions" },
            { title: "Equations", file: "equations" },
            { title: "Inequalities", file: "inequalities" }

        ],

        algebra2: [

            { title: "Indices", file: "indices" },
            { title: "Logarithms", file: "logarithms" },
            { title: "Standard Form", file: "standard-form" },
            { title: "Decimal Places", file: "decimal-places" }

        ],

        statistics: [

            { title: "Mean", file: "mean" },
            { title: "Median", file: "median" },
            { title: "Mode", file: "mode" },
            { title: "Probability", file: "probability" }

        ],

        calculus: [

            { title: "Limits", file: "limits" },
            { title: "Differentiation", file: "differentiation" },
            { title: "Integration", file: "integration" }

        ]

    };

    // =====================================
    // LOAD SUBJECT
    // =====================================

    function loadSubject() {

        const params = new URLSearchParams(window.location.search);

        currentSubject = params.get("subject");

        // =====================================
        // NO SUBJECT SELECTED
        // =====================================

        if (!currentSubject) {

            subjectTitle.textContent = "Choose a Subject";

            if (topicsGrid) {

                topicsGrid.innerHTML = "";

                const subjects = [

                    {
                        title: "PEMDAS",
                        file: "pemdas",
                        description: "Order of operations & arithmetic logic"
                    },

                    {
                        title: "Algebra",
                        file: "algebra",
                        description: "Expressions, equations & inequalities"
                    },

                    {
                        title: "Algebra 2",
                        file: "algebra2",
                        description: "Logs, indices & advanced concepts"
                    },

                    {
                        title: "Statistics",
                        file: "statistics",
                        description: "Data, averages & probability"
                    },

                    {
                        title: "Calculus",
                        file: "calculus",
                        description: "Limits, derivatives & integrals"
                    }

                ];

                subjects.forEach(subject => {

                    const card = document.createElement("div");

                    card.className = "card";

                    card.innerHTML = `

                        <h3>${subject.title}</h3>

                        <p>${subject.description}</p>

                        <button class="btn">

                            View Topics

                        </button>

                    `;

                    card.addEventListener("click", () => {

                        goTo(`topics.html?subject=${subject.file}`);

                    });

                    topicsGrid.appendChild(card);

                });

            }

            return false;

        }

        // =====================================
        // SUBJECT SELECTED
        // =====================================

        const subjectNames = {

            pemdas: "PEMDAS",
            algebra: "Algebra",
            algebra2: "Algebra 2",
            statistics: "Statistics",
            calculus: "Calculus"

        };

        subjectTitle.textContent =
            `${subjectNames[currentSubject] || currentSubject} Topics`;

        return true;

    }

    // =====================================
    // LOAD TOPICS
    // =====================================

    function loadTopics() {

        if (!topicsGrid) return;

        topicsGrid.innerHTML = "";

        const topics = topicsMap[currentSubject];

        if (!topics || topics.length === 0) {

            topicsGrid.innerHTML = `
                <div class="card">
                    No topics available.
                </div>
            `;

            return;

        }

    
// =====================================
// RENDER TOPICS
// =====================================

    topics.forEach(topic => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <h3>${topic.title}</h3>

            <div class="card-buttons">

                <button class="btn open-topic">

                    Open Topic

                </button>

                <button
                    class="btn quiz-btn"
                    data-subject="${currentSubject}"
                    data-topic="${topic.file}">

                    Take Quiz

                </button>

            </div>

        `;

        // -----------------------------
        // Open Lesson
        // -----------------------------

        card.querySelector(".open-topic")
            .addEventListener("click", () => {

                goTo(`lessons/${currentSubject}/${topic.file}.html`);

            });

        // -----------------------------
        // Launch Quiz
        // -----------------------------

        card.querySelector(".quiz-btn")
            .addEventListener("click", () => {

                launchQuiz(

                    currentSubject,

                    topic.file

                );

            });
        topicsGrid.appendChild(card);

    });

}


    // =====================================
    // INITIALIZE
    // =====================================

    function initialize() {

        const validSubject = loadSubject();

        if (!validSubject) return;

        loadTopics();

    }


    initialize();

});