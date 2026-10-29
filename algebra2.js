document.addEventListener("DOMContentLoaded", () => {

  const generateBtn =
    document.getElementById("generate-btn");

  const goBtn =
    document.getElementById("go-btn");

  const checkStepBtn =
    document.getElementById("check-step-btn");

  const nextStepBtn =
    document.getElementById("next-step-btn");

  const checkAnswerBtn =
    document.getElementById("check-answer-btn");

  const solutionBtn =
    document.getElementById("solution-btn");

  const questionInput =
    document.getElementById("question-input");

  const stepInput =
    document.getElementById("step-input");

  const answerInput =
    document.getElementById("answer-input");

  const feedback =
    document.getElementById("feedback-panel");

  const studentWorkSteps =
    document.getElementById("student-work-steps");
  
  const mode =
  document.getElementById("mode");

  const mcqRow =
    document.getElementById("mcq-row");

  const mcqOptions =
    document.querySelectorAll(".mcq-option");

  const dashboardPanel =
    document.getElementById("dashboard-panel");

  const teacherPanel =
    document.getElementById("teacher-panel");

  const teacherAnswer =
    document.getElementById("teacher-answer");

  const totalQuestionsEl =
    document.getElementById("total-questions");

  const correctAnswersEl =
    document.getElementById("correct-answers");

  const incorrectAnswersEl =
    document.getElementById("incorrect-answers");

  const successRateEl =
    document.getElementById("success-rate");

  const stepRow =
    document.querySelector(".step-row");

  const answerRow =
    document.querySelector(".answer-row");

  const solutionRow =
    document.querySelector(".solution-row");

  let currentAnswer = "";
  let currentSolution = [];
  let currentExplanation = [];
  let currentStepIndex = 0;
  let totalQuestions = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let questionRecorded = false;

  function updateDashboard() {

    totalQuestionsEl.textContent =
      totalQuestions;

    correctAnswersEl.textContent =
      correctAnswers;

    incorrectAnswersEl.textContent =
      incorrectAnswers;

    const rate =
      totalQuestions === 0
        ? 0
        : Math.round(
            (correctAnswers /
              totalQuestions) * 100
          );

    successRateEl.textContent =
      `${rate}%`;
  }

  function updateMode() {

    if (mcqRow)
      mcqRow.style.display = "none";

    dashboardPanel.style.display =
      "none";

    teacherPanel.style.display =
      "none";

    stepRow.style.display =
      "flex";

    answerRow.style.display =
      "flex";

    solutionRow.style.display =
      "flex";

    const selected =
      mode.value;

    if (selected === "mcq") {

      mcqRow.style.display =
        "flex";

      stepRow.style.display =
        "none";

      answerRow.style.display =
        "none";

      solutionRow.style.display =
        "none";
    }

    if (selected === "teacher") {

      teacherPanel.style.display =
        "block";

      teacherAnswer.innerHTML = `
        <h3>Answer</h3>
        <p>${currentAnswer || "Generate a question first"}</p>

        <h3>Solution</h3>
        <p>
          ${
            currentSolution.length
              ? currentSolution.join("<br>")
              : "Generate a question first"
          }
        </p>
      `;
    }

    if (selected === "dashboard") {

      dashboardPanel.style.display =
        "block";

      stepRow.style.display =
        "none";

      answerRow.style.display =
        "none";

      solutionRow.style.display =
        "none";

      updateDashboard();
    }
  }

  mode?.addEventListener(
    "change",
    updateMode
  );

updateMode();
  
  generateBtn?.addEventListener("click", () => {

    const topic =
      document.getElementById("topic").value;
    
     const difficulty =
      document.getElementById("difficulty").value;

    studentWorkSteps.innerHTML = "";
    stepInput.value = "";
    answerInput.value = "";

    currentStepIndex = 0;
    questionRecorded = false;

    stepInput.disabled = false;
    checkStepBtn.disabled = false;
    nextStepBtn.disabled = false;

    switch (topic) {

      case "indices": {

        let questions = [];

        if (difficulty === "simple") {

          questions = [

            {
              q: "2^3 × 2^2",
              a: "32",
              s: ["2^(3+2)", "2^5", "32"]
            },

            {
              q: "3^2 × 3^3",
              a: "243",
              s: ["3^(2+3)", "3^5", "243"]
            },

            {
              q: "5^2 × 5^1",
              a: "125",
              s: ["5^(2+1)", "5^3", "125"]
            },

            {
              q: "2^4 × 2^3",
              a: "128",
              s: ["2^(4+3)", "2^7", "128"]
            },

            {
              q: "4^2 × 4^3",
              a: "1024",
              s: ["4^(2+3)", "4^5", "1024"]
            },

            {
              q: "3^4 × 3^2",
              a: "729",
              s: ["3^(4+2)", "3^6", "729"]
            },

            {
              q: "5^1 × 5^4",
              a: "3125",
              s: ["5^(1+4)", "5^5", "3125"]
            },

            {
              q: "2^5 × 2^1",
              a: "64",
              s: ["2^(5+1)", "2^6", "64"]
            },

            {
              q: "6^2 × 6^2",
              a: "1296",
              s: ["6^(2+2)", "6^4", "1296"]
            },

            {
              q: "7^2 × 7^1",
              a: "343",
              s: ["7^(2+1)", "7^3", "343"]
            }

          ];

        }

        else if (difficulty === "medium") {

          questions = [

            {
              q: "5^4 ÷ 5^2",
              a: "25",
              s: ["5^(4-2)", "5^2", "25"]
            },

            {
              q: "2^6 ÷ 2^3",
              a: "8",
              s: ["2^(6-3)", "2^3", "8"]
            },

            {
              q: "7^5 ÷ 7^4",
              a: "7",
              s: ["7^(5-4)", "7^1", "7"]
            },

            {
              q: "3^7 ÷ 3^4",
              a: "27",
              s: ["3^(7-4)", "3^3", "27"]
            },

            {
              q: "4^6 ÷ 4^3",
              a: "64",
              s: ["4^(6-3)", "4^3", "64"]
            },

            {
              q: "6^5 ÷ 6^2",
              a: "216",
              s: ["6^(5-2)", "6^3", "216"]
            },

            {
              q: "8^4 ÷ 8^2",
              a: "64",
              s: ["8^(4-2)", "8^2", "64"]
            },

            {
              q: "9^5 ÷ 9^3",
              a: "81",
              s: ["9^(5-3)", "9^2", "81"]
            },

            {
              q: "10^6 ÷ 10^4",
              a: "100",
              s: ["10^(6-4)", "10^2", "100"]
            },

            {
              q: "12^5 ÷ 12^2",
              a: "1728",
              s: ["12^(5-2)", "12^3", "1728"]
            }

          ];

        }

        else {

          questions = [

            {
              q: "(2^3 × 2^4) ÷ 2^2",
              a: "32",
              s: [
                "2^(3+4) ÷ 2^2",
                "2^7 ÷ 2^2",
                "2^(7-2)",
                "2^5",
                "32"
              ]
            },

            {
              q: "(3^5 × 3^2) ÷ 3^4",
              a: "27",
              s: [
                "3^(5+2) ÷ 3^4",
                "3^7 ÷ 3^4",
                "3^(7-4)",
                "3^3",
                "27"
              ]
            },

            {
              q: "(5^4 × 5^3) ÷ 5^5",
              a: "25",
              s: [
                "5^(4+3) ÷ 5^5",
                "5^7 ÷ 5^5",
                "5^(7-5)",
                "5^2",
                "25"
              ]
            },

            {
              q: "(4^6 × 4^2) ÷ 4^5",
              a: "64",
              s: [
                "4^(6+2) ÷ 4^5",
                "4^8 ÷ 4^5",
                "4^(8-5)",
                "4^3",
                "64"
              ]
            },

            {
              q: "(6^5 × 6^4) ÷ 6^6",
              a: "216",
              s: [
                "6^(5+4) ÷ 6^6",
                "6^9 ÷ 6^6",
                "6^(9-6)",
                "6^3",
                "216"
              ]
            },

            {
              q: "(7^3 × 7^5) ÷ 7^4",
              a: "2401",
              s: [
                "7^(3+5) ÷ 7^4",
                "7^8 ÷ 7^4",
                "7^(8-4)",
                "7^4",
                "2401"
              ]
            },

            {
              q: "(8^4 × 8^3) ÷ 8^5",
              a: "64",
              s: [
                "8^(4+3) ÷ 8^5",
                "8^7 ÷ 8^5",
                "8^(7-5)",
                "8^2",
                "64"
              ]
            },

            {
              q: "(9^5 × 9^2) ÷ 9^4",
              a: "729",
              s: [
                "9^(5+2) ÷ 9^4",
                "9^7 ÷ 9^4",
                "9^(7-4)",
                "9^3",
                "729"
              ]
            },

            {
              q: "(10^4 × 10^5) ÷ 10^6",
              a: "1000",
              s: [
                "10^(4+5) ÷ 10^6",
                "10^9 ÷ 10^6",
                "10^(9-6)",
                "10^3",
                "1000"
              ]
            },

            {
              q: "(12^3 × 12^4) ÷ 12^5",
              a: "144",
              s: [
                "12^(3+4) ÷ 12^5",
                "12^7 ÷ 12^5",
                "12^(7-5)",
                "12^2",
                "144"
              ]
            }

          ];

        }

        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];

        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }
      case "indicial": {

        questions = [

          {
            q: "2^x = 8",
            a: "3",
            s: [
              "8 = 2^3",
              "x = 3"
            ]
          },

          {
            q: "3^x = 27",
            a: "3",
            s: [
              "27 = 3^3",
              "x = 3"
            ]
          },

          {
            q: "5^x = 125",
            a: "3",
            s: [
              "125 = 5^3",
              "x = 3"
            ]
          },

          {
            q: "2^x = 16",
            a: "4",
            s: [
              "16 = 2^4",
              "x = 4"
            ]
          },

          {
            q: "3^x = 81",
            a: "4",
            s: [
              "81 = 3^4",
              "x = 4"
            ]
          },

          {
            q: "4^x = 64",
            a: "3",
            s: [
              "64 = 4^3",
              "x = 3"
            ]
          },

          {
            q: "5^x = 625",
            a: "4",
            s: [
              "625 = 5^4",
              "x = 4"
            ]
          },

          {
            q: "6^x = 216",
            a: "3",
            s: [
              "216 = 6^3",
              "x = 3"
            ]
          },

          {
            q: "7^x = 49",
            a: "2",
            s: [
              "49 = 7^2",
              "x = 2"
            ]
          },

          {
            q: "10^x = 1000",
            a: "3",
            s: [
              "1000 = 10^3",
              "x = 3"
            ]
          }

        ];

        questions = [

          {
            q: "2^(2x) = 64",
            a: "3",
            s: [
              "64 = 2^6",
              "2x = 6",
              "x = 3"
            ]
          },

          {
            q: "3^(x+2) = 243",
            a: "3",
            s: [
              "243 = 3^5",
              "x + 2 = 5",
              "x = 3"
            ]
          },

          {
            q: "5^(x-1) = 625",
            a: "5",
            s: [
              "625 = 5^4",
              "x - 1 = 4",
              "x = 5"
            ]
          },

          {
            q: "4^(2x) = 4096",
            a: "3",
            s: [
              "4096 = 4^6",
              "2x = 6",
              "x = 3"
            ]
          },

          {
            q: "2^(x-2) = 32",
            a: "7",
            s: [
              "32 = 2^5",
              "x - 2 = 5",
              "x = 7"
            ]
          },

          {
            q: "3^(2x) = 729",
            a: "3",
            s: [
              "729 = 3^6",
              "2x = 6",
              "x = 3"
            ]
          },

          {
            q: "5^(x+1) = 15625",
            a: "5",
            s: [
              "15625 = 5^6",
              "x + 1 = 6",
              "x = 5"
            ]
          },

          {
            q: "2^(x+3) = 128",
            a: "4",
            s: [
              "128 = 2^7",
              "x + 3 = 7",
              "x = 4"
            ]
          },

          {
            q: "7^(x-1) = 343",
            a: "4",
            s: [
              "343 = 7^3",
              "x - 1 = 3",
              "x = 4"
            ]
          },

          {
            q: "10^(x-2) = 1000",
            a: "5",
            s: [
              "1000 = 10^3",
              "x - 2 = 3",
              "x = 5"
            ]
          }

        ];

        questions = [

          {
            q: "2^(3x) = 512",
            a: "3",
            s: [
              "512 = 2^9",
              "3x = 9",
              "x = 3"
            ]
          },

          {
            q: "3^(2x+1) = 2187",
            a: "3",
            s: [
              "2187 = 3^7",
              "2x + 1 = 7",
              "2x = 6",
              "x = 3"
            ]
          },

          {
            q: "5^(2x-1) = 3125",
            a: "3",
            s: [
              "3125 = 5^5",
              "2x - 1 = 5",
              "2x = 6",
              "x = 3"
            ]
          },

          {
            q: "2^(x+4) = 1024",
            a: "6",
            s: [
              "1024 = 2^10",
              "x + 4 = 10",
              "x = 6"
            ]
          },

          {
            q: "7^(2x) = 2401",
            a: "2",
            s: [
              "2401 = 7^4",
              "2x = 4",
              "x = 2"
            ]
          },

          {
            q: "4^(x-3) = 256",
            a: "7",
            s: [
              "256 = 4^4",
              "x - 3 = 4",
              "x = 7"
            ]
          },

          {
            q: "3^(x+5) = 6561",
            a: "3",
            s: [
              "6561 = 3^8",
              "x + 5 = 8",
              "x = 3"
            ]
          },

          {
            q: "2^(2x-2) = 64",
            a: "4",
            s: [
              "64 = 2^6",
              "2x - 2 = 6",
              "2x = 8",
              "x = 4"
            ]
          },

          {
            q: "5^(x+2) = 78125",
            a: "5",
            s: [
              "78125 = 5^7",
              "x + 2 = 7",
              "x = 5"
            ]
          },

          {
            q: "10^(3x-2) = 10000000",
            a: "3",
            s: [
              "10000000 = 10^7",
              "3x - 2 = 7",
              "3x = 9",
              "x = 3"
            ]
          }

        ];

        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];

        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }

      case "logarithms": {

        questions = [

          {
            q: "log₁₀(10)",
            a: "1",
            s: [
              "10^1 = 10",
              "1"
            ]
          },

          {
            q: "log₁₀(100)",
            a: "2",
            s: [
              "10^2 = 100",
              "2"
            ]
          },

          {
            q: "log₁₀(1000)",
            a: "3",
            s: [
              "10^3 = 1000",
              "3"
            ]
          },

          {
            q: "log₂(8)",
            a: "3",
            s: [
              "2^3 = 8",
              "3"
            ]
          },

          {
            q: "log₂(16)",
            a: "4",
            s: [
              "2^4 = 16",
              "4"
            ]
          },

          {
            q: "log₂(32)",
            a: "5",
            s: [
              "2^5 = 32",
              "5"
            ]
          },

          {
            q: "log₃(9)",
            a: "2",
            s: [
              "3^2 = 9",
              "2"
            ]
          },

          {
            q: "log₃(27)",
            a: "3",
            s: [
              "3^3 = 27",
              "3"
            ]
          },

          {
            q: "log₅(25)",
            a: "2",
            s: [
              "5^2 = 25",
              "2"
            ]
          },

          {
            q: "log₅(125)",
            a: "3",
            s: [
              "5^3 = 125",
              "3"
            ]
          }

        ];

         questions = [

          {
            q: "log₂(64)",
            a: "6",
            s: [
              "2^6 = 64",
              "6"
            ]
          },

          {
            q: "log₂(128)",
            a: "7",
            s: [
              "2^7 = 128",
              "7"
            ]
          },

          {
            q: "log₃(81)",
            a: "4",
            s: [
              "3^4 = 81",
              "4"
            ]
          },

          {
            q: "log₃(243)",
            a: "5",
            s: [
              "3^5 = 243",
              "5"
            ]
          },

          {
            q: "log₄(64)",
            a: "3",
            s: [
              "4^3 = 64",
              "3"
            ]
          },

          {
            q: "log₄(256)",
            a: "4",
            s: [
              "4^4 = 256",
              "4"
            ]
          },

          {
            q: "log₅(625)",
            a: "4",
            s: [
              "5^4 = 625",
              "4"
            ]
          },

          {
            q: "log₆(216)",
            a: "3",
            s: [
              "6^3 = 216",
              "3"
            ]
          },

          {
            q: "log₇(343)",
            a: "3",
            s: [
              "7^3 = 343",
              "3"
            ]
          },

          {
            q: "log₁₀(100000)",
            a: "5",
            s: [
              "10^5 = 100000",
              "5"
            ]
          }

        ];

        questions = [

          {
            q: "log₂8 + log₂4",
            a: "5",
            s: [
              "log₂(8 × 4)",
              "log₂32",
              "5"
            ]
          },

          {
            q: "log₃27 + log₃9",
            a: "5",
            s: [
              "log₃(27 × 9)",
              "log₃243",
              "5"
            ]
          },

          {
            q: "log₅125 - log₅5",
            a: "2",
            s: [
              "log₅(125 ÷ 5)",
              "log₅25",
              "2"
            ]
          },

          {
            q: "log₂64 - log₂8",
            a: "3",
            s: [
              "log₂(64 ÷ 8)",
              "log₂8",
              "3"
            ]
          },

          {
            q: "2log₂4",
            a: "4",
            s: [
              "2 × log₂4",
              "2 × 2",
              "4"
            ]
          },

          {
            q: "3log₃3",
            a: "3",
            s: [
              "3 × log₃3",
              "3 × 1",
              "3"
            ]
          },

          {
            q: "log₄16 + log₄64",
            a: "5",
            s: [
              "log₄(16 × 64)",
              "log₄1024",
              "5"
            ]
          },

          {
            q: "log₅625 - log₅25",
            a: "2",
            s: [
              "log₅(625 ÷ 25)",
              "log₅25",
              "2"
            ]
          },

          {
            q: "log₁₀1000 + log₁₀100",
            a: "5",
            s: [
              "log₁₀(1000 × 100)",
              "log₁₀100000",
              "5"
            ]
          },

          {
            q: "log₂16 + log₂2",
            a: "5",
            s: [
              "log₂(16 × 2)",
              "log₂32",
              "5"
            ]
          }

        ];

        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];
        
        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }

      case "log-equations": {

        questions = [

          {
            q: "log₂(x) = 3",
            a: "8",
            s: [
              "x = 2^3",
              "x = 8"
            ]
          },

          {
            q: "log₃(x) = 4",
            a: "81",
            s: [
              "x = 3^4",
              "x = 81"
            ]
          },

          {
            q: "log₅(x) = 3",
            a: "125",
            s: [
              "x = 5^3",
              "x = 125"
            ]
          },

          {
            q: "log₁₀(x) = 2",
            a: "100",
            s: [
              "x = 10^2",
              "x = 100"
            ]
          },

          {
            q: "log₄(x) = 3",
            a: "64",
            s: [
              "x = 4^3",
              "x = 64"
            ]
          },

          {
            q: "log₆(x) = 2",
            a: "36",
            s: [
              "x = 6^2",
              "x = 36"
            ]
          },

          {
            q: "log₇(x) = 2",
            a: "49",
            s: [
              "x = 7^2",
              "x = 49"
            ]
          },

          {
            q: "log₈(x) = 2",
            a: "64",
            s: [
              "x = 8^2",
              "x = 64"
            ]
          },

          {
            q: "log₉(x) = 2",
            a: "81",
            s: [
              "x = 9^2",
              "x = 81"
            ]
          },

          {
            q: "log₁₀(x) = 5",
            a: "100000",
            s: [
              "x = 10^5",
              "x = 100000"
            ]
          }

        ];

        questions = [

          {
            q: "log₂(x) = 6",
            a: "64",
            s: [
              "x = 2^6",
              "x = 64"
            ]
          },

          {
            q: "log₃(x) = 5",
            a: "243",
            s: [
              "x = 3^5",
              "x = 243"
            ]
          },

          {
            q: "log₄(x) = 4",
            a: "256",
            s: [
              "x = 4^4",
              "x = 256"
            ]
          },

          {
            q: "log₅(x) = 4",
            a: "625",
            s: [
              "x = 5^4",
              "x = 625"
            ]
          },

          {
            q: "log₆(x) = 3",
            a: "216",
            s: [
              "x = 6^3",
              "x = 216"
            ]
          },

          {
            q: "log₇(x) = 3",
            a: "343",
            s: [
              "x = 7^3",
              "x = 343"
            ]
          },

          {
            q: "log₈(x) = 3",
            a: "512",
            s: [
              "x = 8^3",
              "x = 512"
            ]
          },

          {
            q: "log₉(x) = 3",
            a: "729",
            s: [
              "x = 9^3",
              "x = 729"
            ]
          },

          {
            q: "log₁₀(x) = 6",
            a: "1000000",
            s: [
              "x = 10^6",
              "x = 1000000"
            ]
          },

          {
            q: "log₁₂(x) = 3",
            a: "1728",
            s: [
              "x = 12^3",
              "x = 1728"
            ]
          }

        ];

        questions = [

          {
            q: "log₂(x) + log₂(4) = 5",
            a: "8",
            s: [
              "log₂(4x) = 5",
              "4x = 2^5",
              "4x = 32",
              "x = 8"
            ]
          },

          {
            q: "log₃(x) + log₃(9) = 5",
            a: "27",
            s: [
              "log₃(9x) = 5",
              "9x = 3^5",
              "9x = 243",
              "x = 27"
            ]
          },

          {
            q: "log₅(x) - log₅(5) = 2",
            a: "125",
            s: [
              "log₅(x/5) = 2",
              "x/5 = 5^2",
              "x/5 = 25",
              "x = 125"
            ]
          },

          {
            q: "log₂(x) - log₂(8) = 3",
            a: "64",
            s: [
              "log₂(x/8) = 3",
              "x/8 = 2^3",
              "x/8 = 8",
              "x = 64"
            ]
          },

          {
            q: "2log₂(x) = 6",
            a: "8",
            s: [
              "log₂(x) = 3",
              "x = 2^3",
              "x = 8"
            ]
          },

          {
            q: "3log₃(x) = 9",
            a: "27",
            s: [
              "log₃(x) = 3",
              "x = 3^3",
              "x = 27"
            ]
          },

          {
            q: "log₄(x) + log₄(16) = 4",
            a: "16",
            s: [
              "log₄(16x) = 4",
              "16x = 4^4",
              "16x = 256",
              "x = 16"
            ]
          },

          {
            q: "log₁₀(x) - log₁₀(100) = 3",
            a: "100000",
            s: [
              "log₁₀(x/100) = 3",
              "x/100 = 10^3",
              "x/100 = 1000",
              "x = 100000"
            ]
          },

          {
            q: "2log₅(x) = 4",
            a: "25",
            s: [
              "log₅(x) = 2",
              "x = 5^2",
              "x = 25"
            ]
          },

          {
            q: "log₇(x) + log₇(7) = 4",
            a: "343",
            s: [
              "log₇(7x) = 4",
              "7x = 7^4",
              "7x = 2401",
              "x = 343"
            ]
          }

        ];

        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];

        
        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }

      case "standard-form": {

        const questions = [

          {
            q: "Write 30 in standard form.",
            a: "3 × 10^1",
            explanation: [
              "Move the decimal point 1 place left."
            ],
            s: [
              "3 × 10^1"
            ]
          },

          {
            q: "Write 500 in standard form.",
            a: "5 × 10^2",
            explanation: [
              "Move the decimal point 2 places left."
            ],
            s: [
              "5 × 10^2"
            ]
          },

          {
            q: "Write 4200 in standard form.",
            a: "4.2 × 10^3",
            explanation: [
              "Move the decimal point 3 places left."
            ],
            s: [
              "4.2 × 10^3"
            ]
          },

          {
            q: "Write 70000 in standard form.",
            a: "7 × 10^4",
            explanation: [
              "Move the decimal point 4 places left."
            ],
            s: [
              "7 × 10^4"
            ]
          },

          {
            q: "Write 960000 in standard form.",
            a: "9.6 × 10^5",
            explanation: [
              "Move the decimal point 5 places left."
            ],
            s: [
              "9.6 × 10^5"
            ]
          },

          {
            q: "Write 0.8 in standard form.",
            a: "8 × 10^-1",
            explanation: [
              "Move the decimal point 1 place right."
            ],
            s: [
              "8 × 10^-1"
            ]
          },

          {
            q: "Write 0.05 in standard form.",
            a: "5 × 10^-2",
            explanation: [
              "Move the decimal point 2 places right."
            ],
            s: [
              "5 × 10^-2"
            ]
          },

          {
            q: "Write 0.004 in standard form.",
            a: "4 × 10^-3",
            explanation: [
              "Move the decimal point 3 places right."
            ],
            s: [
              "4 × 10^-3"
            ]
          },

          {
            q: "Write 0.0007 in standard form.",
            a: "7 × 10^-4",
            explanation: [
              "Move the decimal point 4 places right."
            ],
            s: [
              "7 × 10^-4"
            ]
          },

          {
            q: "Write 0.00009 in standard form.",
            a: "9 × 10^-5",
            explanation: [
              "Move the decimal point 5 places right."
            ],
            s: [
              "9 × 10^-5"
            ]
          },

          {
            q: "Write 64 in standard form.",
            a: "6.4 × 10^1",
            explanation: [
              "Move the decimal point 1 place left."
            ],
            s: [
              "6.4 × 10^1"
            ]
          },

          {
            q: "Write 810 in standard form.",
            a: "8.1 × 10^2",
            explanation: [
              "Move the decimal point 2 places left."
            ],
            s: [
              "8.1 × 10^2"
            ]
          },

          {
            q: "Write 0.36 in standard form.",
            a: "3.6 × 10^-1",
            explanation: [
              "Move the decimal point 1 place right."
            ],
            s: [
              "3.6 × 10^-1"
            ]
          },

          {
            q: "Write 0.012 in standard form.",
            a: "1.2 × 10^-2",
            explanation: [
              "Move the decimal point 2 places right."
            ],
            s: [
              "1.2 × 10^-2"
            ]
          },

          {
            q: "Write 0.00045 in standard form.",
            a: "4.5 × 10^-4",
            explanation: [
              "Move the decimal point 4 places right."
            ],
            s: [
              "4.5 × 10^-4"
            ]
          }

        ];

        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];

        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }

      case "sig-fig": {

        const questions = [

          {
            q: "Round 47 to 1 significant figure.",
            a: "50",
            explanation: [
              "The first significant figure is 4.",
              "The next digit is 7, so round up."
            ],
            s: [
              "50"
            ]
          },

          {
            q: "Round 284 to 2 significant figures.",
            a: "280",
            explanation: [
              "Keep 28.",
              "The next digit is 4, so do not round up."
            ],
            s: [
              "280"
            ]
          },

          {
            q: "Round 6738 to 3 significant figures.",
            a: "6740",
            explanation: [
              "Keep 673.",
              "The next digit is 8, so round up."
            ],
            s: [
              "6740"
            ]
          },

          {
            q: "Round 9056 to 2 significant figures.",
            a: "9100",
            explanation: [
              "Keep 90.",
              "The next digit is 5, so round up."
            ],
            s: [
              "9100"
            ]
          },

          {
            q: "Round 81243 to 4 significant figures.",
            a: "81240",
            explanation: [
              "Keep 8124.",
              "The next digit is 3, so do not round up."
            ],
            s: [
              "81240"
            ]
          },

          {
            q: "Round 3.456 to 2 significant figures.",
            a: "3.5",
            explanation: [
              "Keep 3.4.",
              "The next digit is 5, so round up."
            ],
            s: [
              "3.5"
            ]
          },

          {
            q: "Round 8.734 to 3 significant figures.",
            a: "8.73",
            explanation: [
              "Keep 8.73.",
              "The next digit is 4, so do not round up."
            ],
            s: [
              "8.73"
            ]
          },

          {
            q: "Round 0.05678 to 2 significant figures.",
            a: "0.057",
            explanation: [
              "Ignore leading zeros.",
              "Keep 56.",
              "The next digit is 7, so round up."
            ],
            s: [
              "0.057"
            ]
          },

          {
            q: "Round 0.004321 to 2 significant figures.",
            a: "0.0043",
            explanation: [
              "Ignore leading zeros.",
              "Keep 43.",
              "The next digit is 2, so do not round up."
            ],
            s: [
              "0.0043"
            ]
          },

          {
            q: "Round 0.08756 to 3 significant figures.",
            a: "0.0876",
            explanation: [
              "Ignore leading zeros.",
              "Keep 875.",
              "The next digit is 6, so round up."
            ],
            s: [
              "0.0876"
            ]
          },

          {
            q: "Round 15.93 to 3 significant figures.",
            a: "15.9",
            explanation: [
              "Keep 15.9.",
              "The next digit is 3, so do not round up."
            ],
            s: [
              "15.9"
            ]
          },

          {
            q: "Round 62.48 to 3 significant figures.",
            a: "62.5",
            explanation: [
              "Keep 62.4.",
              "The next digit is 8, so round up."
            ],
            s: [
              "62.5"
            ]
          },

          {
            q: "Round 0.7098 to 2 significant figures.",
            a: "0.71",
            explanation: [
              "Ignore leading zeros.",
              "Keep 70.",
              "The next digit is 9, so round up."
            ],
            s: [
              "0.71"
            ]
          },

          {
            q: "Round 1205 to 3 significant figures.",
            a: "1210",
            explanation: [
              "Keep 120.",
              "The next digit is 5, so round up."
            ],
            s: [
              "1210"
            ]
          },

          {
            q: "Round 9999 to 2 significant figures.",
            a: "10000",
            explanation: [
              "Keep 99.",
              "The next digit is 9, so round up."
            ],
            s: [
              "10000"
            ]
          }

        ];
        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];

        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }

      case "decimal-places": {

        const questions = [

          {
            q: "Round 3.4567 to 2 decimal places.",
            a: "3.46",
            explanation: [
              "Keep 3.45.",
              "The next digit is 6, so round up."
            ],
            s: [
              "3.46"
            ]
          },

          {
            q: "Round 8.7342 to 3 decimal places.",
            a: "8.734",
            explanation: [
              "Keep 8.734.",
              "The next digit is 2, so do not round up."
            ],
            s: [
              "8.734"
            ]
          },

          {
            q: "Round 5.6789 to 1 decimal place.",
            a: "5.7",
            explanation: [
              "Keep 5.6.",
              "The next digit is 7, so round up."
            ],
            s: [
              "5.7"
            ]
          },

          {
            q: "Round 12.3456 to 2 decimal places.",
            a: "12.35",
            explanation: [
              "Keep 12.34.",
              "The next digit is 5, so round up."
            ],
            s: [
              "12.35"
            ]
          },

          {
            q: "Round 0.6784 to 3 decimal places.",
            a: "0.678",
            explanation: [
              "Keep 0.678.",
              "The next digit is 4, so do not round up."
            ],
            s: [
              "0.678"
            ]
          },

          {
            q: "Round 0.4568 to 2 decimal places.",
            a: "0.46",
            explanation: [
              "Keep 0.45.",
              "The next digit is 6, so round up."
            ],
            s: [
              "0.46"
            ]
          },

          {
            q: "Round 15.999 to 2 decimal places.",
            a: "16.00",
            explanation: [
              "Keep 15.99.",
              "The next digit is 9, so round up."
            ],
            s: [
              "16.00"
            ]
          },

          {
            q: "Round 9.2341 to 3 decimal places.",
            a: "9.234",
            explanation: [
              "Keep 9.234.",
              "The next digit is 1, so do not round up."
            ],
            s: [
              "9.234"
            ]
          },

          {
            q: "Round 0.00567 to 4 decimal places.",
            a: "0.0057",
            explanation: [
              "Keep 0.0056.",
              "The next digit is 7, so round up."
            ],
            s: [
              "0.0057"
            ]
          },

          {
            q: "Round 24.1268 to 3 decimal places.",
            a: "24.127",
            explanation: [
              "Keep 24.126.",
              "The next digit is 8, so round up."
            ],
            s: [
              "24.127"
            ]
          },

          {
            q: "Round 1.4444 to 2 decimal places.",
            a: "1.44",
            explanation: [
              "Keep 1.44.",
              "The next digit is 4, so do not round up."
            ],
            s: [
              "1.44"
            ]
          },

          {
            q: "Round 73.2851 to 2 decimal places.",
            a: "73.29",
            explanation: [
              "Keep 73.28.",
              "The next digit is 5, so round up."
            ],
            s: [
              "73.29"
            ]
          },

          {
            q: "Round 0.9994 to 3 decimal places.",
            a: "0.999",
            explanation: [
              "Keep 0.999.",
              "The next digit is 4, so do not round up."
            ],
            s: [
              "0.999"
            ]
          },

          {
            q: "Round 45.1008 to 3 decimal places.",
            a: "45.101",
            explanation: [
              "Keep 45.100.",
              "The next digit is 8, so round up."
            ],
            s: [
              "45.101"
            ]
          },

          {
            q: "Round 7.5001 to 3 decimal places.",
            a: "7.500",
            explanation: [
              "Keep 7.500.",
              "The next digit is 1, so do not round up."
            ],
            s: [
              "7.500"
            ]
          }

        ];

        const pick =
          questions[
            Math.floor(
              Math.random() *
              questions.length
            )
          ];

        questionInput.value = pick.q;
        currentAnswer = pick.a;
        currentSolution = pick.s;
        currentExplanation = pick.explanation || [];

        break;
      }
    }

    feedback.innerHTML =
      "Question generated. Click GO.";

    if (mode.value === "mcq") {

      let options = [];

      // ============================
      // STANDARD FORM
      // ============================

      if (topic === "standard-form") {

        const answer = currentAnswer;

        const match = answer.match(
          /^([\d.]+)\s*×\s*10\^(-?\d+)$/
        );

        if (match) {

          const coefficient = match[1];
          const exponent = Number(match[2]);

          options = [

            answer,

            `${coefficient} × 10^${exponent + 1}`,

            `${coefficient} × 10^${exponent - 1}`,

            `${Number(coefficient) * 10} × 10^${exponent - 1}`

          ];

        }

      }

      // ============================
      // ALL OTHER TOPICS
      // ============================

      else {

        const correct = Number(currentAnswer);

        options = [

          correct,

          correct + 2,

          correct - 2,

          correct + 5

        ];

      }

      options.sort(() => Math.random() - 0.5);

      mcqOptions.forEach((btn, index) => {

        btn.textContent = options[index];
        btn.dataset.answer = String(options[index]);

      });

    }
updateMode();

  });

  goBtn?.addEventListener("click", () => {

    feedback.innerHTML =
      "Enter your working.";

    stepInput.focus();

  });

  checkStepBtn?.addEventListener("click", () => {

    const normalize = str =>
      String(str)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[×x*]/g, "*")
        .replace(/[÷/]/g, "/")
        .replace(/[−–—]/g, "-")
        .replace(/\{/g, "(")
        .replace(/\}/g, ")")
        .replace(/\[/g, "(")
        .replace(/\]/g, ")");
    
        const studentStep =
      normalize(stepInput.value);

    const expectedStep =
      normalize(
        currentSolution[currentStepIndex]
      );
    
    if (studentStep === expectedStep) {

      studentWorkSteps.innerHTML += `
        <div class="work-step">
          <strong>Step ${currentStepIndex + 1}</strong><br>
          ${currentSolution[currentStepIndex]}
        </div>
      `;

      currentStepIndex++;

      if (
        currentStepIndex >=
        currentSolution.length
      ) {

        feedback.innerHTML =
          "🎉 Excellent! Final step reached.";

        checkStepBtn.disabled = true;
        nextStepBtn.disabled = true;
        stepInput.disabled = true;

        return;
      }

      feedback.innerHTML =
        "✅ Excelent! Your step is correct.";

    } else {

      feedback.innerHTML =
        "❌ Incorrect step. Try again.";

    }

  });

  nextStepBtn?.addEventListener("click", () => {

  stepInput.value = "";

  feedback.innerHTML =
    "Enter the next step.";

  stepInput.focus();

});

  checkAnswerBtn?.addEventListener("click", () => {

    if (!questionRecorded) {

      totalQuestions++;

      questionRecorded = true;
    }
    
    if (
      answerInput.value.trim() ===
      currentAnswer
    ) {

      feedback.innerHTML =
        "🎉 Excellent! Your final answer is correct!";
      correctAnswers++;
      updateDashboard();

    } else {

      feedback.innerHTML =
        `❌ Correct answer: ${currentAnswer}`;
      incorrectAnswers++;
      updateDashboard();
      
    }

  });

  solutionBtn?.addEventListener("click", () => {

    let html = "<h3>Full Solution</h3>";

    let step = 1;

    currentExplanation.forEach(exp => {

      html += `
        <p>
          <strong>Step ${step++}</strong><br>
          ${exp}
        </p>
      `;

    });

    currentSolution.forEach(sol => {

      html += `
        <p>
          <strong>Step ${step++}</strong><br>
          ${sol}
        </p>
      `;

    });

    feedback.innerHTML = html;

  });

  mcqOptions.forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        if (!questionRecorded) {

          totalQuestions++;

          questionRecorded = true;
}
        if (
          btn.dataset.answer ===
          String(currentAnswer)
        ) {

          correctAnswers++;

          feedback.innerHTML =
            "🎉 Correct!";

        } else {

          incorrectAnswers++;

          feedback.innerHTML =
            `❌ Correct answer: ${currentAnswer}`;
        }

        updateDashboard();
      }
    );

  });

});





