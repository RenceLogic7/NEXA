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
  
  const totalQuestionsEl =
  document.getElementById("total-questions");

  const correctAnswersEl =
    document.getElementById("correct-answers");

  const incorrectAnswersEl =
    document.getElementById("incorrect-answers");

  const successRateEl =
    document.getElementById("success-rate");
  
  const mcqOptions =
    document.querySelectorAll(".mcq-option");
  
  const mode =
    document.getElementById("mode");

  const mcqRow =
    document.getElementById("mcq-row");

  const teacherPanel =
    document.getElementById("teacher-panel");

  const dashboardPanel =
    document.getElementById("dashboard-panel");

  const teacherAnswer =
    document.getElementById("teacher-answer");

  const stepRow =
  document.querySelector(".step-row");

  const answerRow =
    document.querySelector(".answer-row");

  const solutionRow =
    document.querySelector(".solution-row");

  stepInput?.addEventListener("keydown", (e) => {

    if (
      e.ctrlKey &&
      e.shiftKey &&
      e.key === "+"
    ) {

      e.preventDefault();

      const start =
        stepInput.selectionStart;

      const end =
        stepInput.selectionEnd;

      const text =
        stepInput.value;

      stepInput.value =
        text.substring(0, start)
        + "^"
        + text.substring(end);

      stepInput.selectionStart =
        stepInput.selectionEnd =
        start + 1;
    }

  });

stepInput?.addEventListener("keydown", (e) => {

  if (
    e.ctrlKey &&
    e.shiftKey &&
    e.key === "+"
  ) {

    e.preventDefault();

    const start =
      stepInput.selectionStart;

    const end =
      stepInput.selectionEnd;

    const text =
      stepInput.value;

    stepInput.value =
      text.substring(0, start)
      + "^"
      + text.substring(end);

    stepInput.selectionStart =
      stepInput.selectionEnd =
      start + 1;
  }

});

  let currentQuestion = "";
  let currentAnswer = "";
  let currentSolutionSteps = [];
  let currentStepExplanations = [];
  let currentStepIndex = 0;
  let acceptedSteps = [];
  let totalQuestions = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let questionRecorded = false;

  mode?.addEventListener("change", () => {

    const selectedMode = mode.value;

    if (mcqRow)
      mcqRow.style.display = "none";

    if (teacherPanel)
      teacherPanel.style.display = "none";

    if (dashboardPanel)
      dashboardPanel.style.display = "none";

    if (stepRow)
      stepRow.style.display = "flex";

    if (answerRow)
      answerRow.style.display = "flex";

    if (solutionRow)
      solutionRow.style.display = "flex";

    switch (selectedMode) {

      case "mcq":

        if (mcqRow)
          mcqRow.style.display = "flex";

        generateMCQ();

        break;

      case "teacher":

        if (teacherPanel)
          teacherPanel.style.display = "block";

        if (stepRow)
          stepRow.style.display = "none";

        if (answerRow)
          answerRow.style.display = "none";

        if (solutionRow)
          solutionRow.style.display = "none";

        if (teacherAnswer) {

          teacherAnswer.innerHTML = `
            <h3>Teacher Solution</h3>
            <p><strong>Question:</strong> ${
              currentQuestion || "No question generated yet."
            }</p>

            <p><strong>Answer:</strong> ${
              currentAnswer || "-"
            }</p>

            <p><strong>Steps:</strong></p>

            <p>${
              currentSolutionSteps.length
                ? currentSolutionSteps
                    .flat()
                    .join("<br>")
                : "-"
            }</p>
          `;
        }

        break;

      case "dashboard":

        if (dashboardPanel)
          dashboardPanel.style.display = "block";

        if (stepRow)
          stepRow.style.display = "none";

        if (answerRow)
          answerRow.style.display = "none";

        if (solutionRow)
          solutionRow.style.display = "none";

        updateDashboard();

        break;
    }

  });

  function updateDashboard() {

    if (totalQuestionsEl)
      totalQuestionsEl.textContent =
        totalQuestions;

    if (correctAnswersEl)
      correctAnswersEl.textContent =
        correctAnswers;

    if (incorrectAnswersEl)
      incorrectAnswersEl.textContent =
        incorrectAnswers;

    const successRate =
      totalQuestions === 0
        ? 0
        : Math.round(
            (correctAnswers /
              totalQuestions) *
              100
          );

    if (successRateEl)
      successRateEl.textContent =
        successRate + "%";
  }

  function rand(min, max) {

    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;

  }

  function normalizeMath(text) {

  return text

    // multiplication
    .replace(/×/g, "*")
    .replace(/x/g, "*")
    .replace(/X/g, "*")

    // division
    .replace(/÷/g, "/")
    .replace(/∕/g, "/")
    .replace(/⁄/g, "/")

    // powers
    .replace(/\^/g, "^")

    // remove spaces
    .replace(/\s+/g, "")

    .trim();

}

function generateMCQ() {

  const correct =
    Number(currentAnswer);

  const options = [
    correct
  ];

  while (
    options.length < 4
  ) {

    const wrong =
      correct +
      rand(-20, 20);

    if (
      !options.includes(wrong)
      && wrong !== correct
    ) {
      options.push(wrong);
    }
  }

  options.sort(
    () => Math.random() - 0.5
  );

  mcqOptions.forEach(
    (btn, index) => {

      btn.textContent =
        options[index];

      btn.onclick = () => {

        if (!questionRecorded) {

          totalQuestions++;
          questionRecorded = true;

          if (
            Number(btn.textContent)
            === correct
          ) {

            feedback.innerHTML =
              "🎉 Correct MCQ Answer!";
            correctAnswers++;

          } else {

            feedback.innerHTML =
              `❌ Incorrect. Correct answer is ${correct}`;
            incorrectAnswers++;
          }

          updateDashboard();
        }

      };

    }
  );

}

function generatePemdas() {

  const difficulty =
    document.getElementById("difficulty").value;

  const a = rand(2, 12);
  const b = rand(2, 12);
  const c = rand(2, 12);
  const d = rand(2, 12);
  const e = rand(2, 12);

  currentSolutionSteps = [];
  currentStepExplanations = [];

  // =====================================
  // SIMPLE
  // =====================================

  if (difficulty === "simple") {

    const choice = rand(1, 4);

    switch (choice) {

      case 1: {

        const mult = b * c;

        currentQuestion =
          `${a} + ${b} × ${c}`;

        currentAnswer =
          a + mult;

        currentSolutionSteps = [
          [`${a} + ${mult}`],
          [`${currentAnswer}`]
        ];

        break;
      }

      case 2: {

        const mult = a * b;

        currentQuestion =
          `${a} × ${b} + ${c}`;

        currentAnswer =
          mult + c;

        currentSolutionSteps = [
          [`${mult} + ${c}`],
          [`${currentAnswer}`]
        ];

        break;
      }

      case 3: {

        const mult = b * c;

        currentQuestion =
          `${a} - ${b} × ${c}`;

        currentAnswer =
          a - mult;

        currentSolutionSteps = [
          [`${a} - ${mult}`],
          [`${currentAnswer}`]
        ];

        break;
      }

      case 4: {

        const mult = a * b;

        currentQuestion =
          `${a} × ${b} - ${c}`;

        currentAnswer =
          mult - c;

        currentSolutionSteps = [
          [`${mult} - ${c}`],
          [`${currentAnswer}`]
        ];

        break;
      }
    }

    currentStepExplanations = [
      "Perform multiplication first.",
      "Complete the remaining operation."
    ];
  }

  // =====================================
  // MEDIUM
  // =====================================

  else if (difficulty === "medium") {

    const bracket = b + c;

    currentQuestion =
      `${a} × (${b} + ${c})`;

    currentAnswer =
      a * bracket;

    currentSolutionSteps = [
      [`${a} × ${bracket}`],
      [`${currentAnswer}`]
    ];

    currentStepExplanations = [
      "Evaluate the bracket.",
      "Multiply."
    ];
  }

  // =====================================
  // COMPLEX
  // =====================================

  else if (difficulty === "complex") {

    const patterns = [

      () => {
        const bracket = c - d;
        const power = b ** 2;

        currentQuestion =
          `${a} + ${b}^2 × (${c} - ${d})`;

        currentAnswer =
          a + power * bracket;

        currentSolutionSteps = [
          [
            `${a} + ${b}^2 × ${bracket}`,
            `${a} + ${power} × (${c} - ${d})`
          ],
          [
            `${a} + ${power} × ${bracket}`
          ],
          [
            `${a} + ${power * bracket}`
          ],
          [
            `${currentAnswer}`
          ]
        ];

        currentStepExplanations = [
          "Evaluate bracket or exponent.",
          "Evaluate remaining exponent or bracket.",
          "Multiply.",
          "Add."
        ];
      },

      () => {
        const bracket = a + b;
        const power = c ** 2;

        currentQuestion =
          `(${a} + ${b}) × ${c}^2`;

        currentAnswer =
          bracket * power;

        currentSolutionSteps = [
          [
            `${bracket} × ${c}^2`,
            `(${a} + ${b}) × ${power}`
          ],
          [
            `${bracket} × ${power}`
          ],
          [
            `${currentAnswer}`
          ]
        ];

        currentStepExplanations = [
          "Evaluate bracket or exponent.",
          "Evaluate remaining exponent or bracket.",
          "Multiply."
        ];
      }

    ];

    patterns[rand(0, patterns.length - 1)]();
  }

  // =====================================
  // HARD
  // =====================================

  else if (difficulty === "hard") {

    const patterns = [

      () => {

        const power = c ** 2;
        const bracket = d - e;

        currentQuestion =
          `${a} + ${b} × ${c}^2 ÷ (${d} - ${e})`;

        currentAnswer =
          a + (b * power) / bracket;

        currentSolutionSteps = [
          [
            `${a} + ${b} × ${c}^2 ÷ ${bracket}`,
            `${a} + ${b} × ${power} ÷ (${d} - ${e})`
          ],
          [
            `${a} + ${b} × ${power} ÷ ${bracket}`
          ],
          [
            `${a} + ${b * power} ÷ ${bracket}`
          ],
          [
            `${a} + ${(b * power) / bracket}`
          ],
          [
            `${currentAnswer}`
          ]
        ];

        currentStepExplanations = [
          "Evaluate bracket or exponent.",
          "Evaluate remaining exponent or bracket.",
          "Multiply.",
          "Divide.",
          "Add."
        ];
      },

      () => {

        const bracket = a + b;
        const power = c ** 2;

        currentQuestion =
          `(${a} + ${b}) × ${c}^2 ÷ ${d}`;

        currentAnswer =
          (bracket * power) / d;

        currentSolutionSteps = [
          [
            `${bracket} × ${c}^2 ÷ ${d}`,
            `(${a} + ${b}) × ${power} ÷ ${d}`
          ],
          [
            `${bracket} × ${power} ÷ ${d}`
          ],
          [
            `${bracket * power} ÷ ${d}`
          ],
          [
            `${currentAnswer}`
          ]
        ];

        currentStepExplanations = [
          "Evaluate bracket or exponent.",
          "Evaluate remaining exponent or bracket.",
          "Multiply.",
          "Divide."
        ];
      }

    ];

    patterns[rand(0, patterns.length - 1)]();
  }

  currentStepIndex = 0;
}

  generateBtn?.addEventListener("click", () => {

    generatePemdas();
    questionRecorded = false;

    questionInput.value =
      currentQuestion;
    
    if (
      document.getElementById("mode").value
      === "mcq"
    ) {

      generateMCQ();

    }

    stepInput.value = "";
    answerInput.value = "";

    currentStepIndex = 0;

    acceptedSteps = [];

    studentWorkSteps.innerHTML = "";

    stepInput.disabled = false;
    checkStepBtn.disabled = false;
    nextStepBtn.disabled = false;

    feedback.innerHTML =
      "Question generated. Click GO.";

  });

  goBtn?.addEventListener("click", () => {

    feedback.innerHTML =
      "Enter your first step.";

    stepInput.focus();

  });

  checkStepBtn?.addEventListener("click", () => {

    const studentStep =
      normalizeMath(stepInput.value);

  const validSteps =
    currentSolutionSteps[currentStepIndex];

  if (
    validSteps.some(
      step =>
        normalizeMath(step) === studentStep
    )
  ) {
      acceptedSteps.push(
        currentSolutionSteps[
          currentStepIndex
        ]
      );

      studentWorkSteps.innerHTML += `
        <div class="work-step">
          <strong>Step ${acceptedSteps.length}</strong><br>
          ${currentSolutionSteps[currentStepIndex]}
        </div>
      `;

      if (
        currentStepIndex ===
        currentSolutionSteps.length - 1
      ) {

        feedback.innerHTML =
          "🎉 Excellent! Final step reached.";

        checkStepBtn.disabled = true;
        nextStepBtn.disabled = true;
        stepInput.disabled = true;

        return;
      }

      currentStepIndex++;

      feedback.innerHTML =
        "✅ Excellent! Correct step.";

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

      const studentAnswer =
        answerInput.value.trim();

      if (!questionRecorded) {

        totalQuestions++;
        questionRecorded = true;

        if (
          studentAnswer ===
          String(currentAnswer)
        ) {

          correctAnswers++;

          feedback.innerHTML =
            "🎉 Excellent! You are correct!";

        } else {

          incorrectAnswers++;

          feedback.innerHTML =
            `❌ Incorrect. Correct answer: ${currentAnswer}`;
        }

        updateDashboard();

      }

  });

  solutionBtn?.addEventListener("click", () => {

    let html =
      "<h3>Full Solution</h3>";

    currentSolutionSteps.forEach(
      (step, index) => {

        html += `
          <p>
            <strong>Step ${index + 1}</strong><br>
            ${step}
          </p>

          <p>
            ${currentStepExplanations[index]}
          </p>

          <hr>
        `;

      }
    );

    feedback.innerHTML = html;

  });

  mode?.dispatchEvent(
    new Event("change")
  );

});
