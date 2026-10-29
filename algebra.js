document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTS
  // =====================================

  const generateBtn = document.getElementById("generate-btn");
  const goBtn = document.getElementById("go-btn");
  const checkStepBtn = document.getElementById("check-step-btn");
  const nextStepBtn = document.getElementById("next-step-btn");
  const checkAnswerBtn = document.getElementById("check-answer-btn");
  const solutionBtn = document.getElementById("solution-btn");

  const questionInput = document.getElementById("question-input");
  const stepInput = document.getElementById("step-input");
  const answerInput = document.getElementById("answer-input");
  const algebraType = document.getElementById("algebraType");
  const difficulty = document.getElementById("difficulty");
  const mode = document.getElementById("mode");
  const mcqRow = document.getElementById("mcq-row");
  const mcqOptions = document.querySelectorAll(".mcq-option");
  const dashboardPanel = document.getElementById("dashboard-panel");
  const teacherPanel = document.getElementById("teacher-panel");
  const teacherAnswer = document.getElementById("teacher-answer");
  const totalQuestionsEl = document.getElementById("total-questions");
  const correctAnswersEl = document.getElementById("correct-answers");
  const incorrectAnswersEl = document.getElementById("incorrect-answers");
  const successRateEl = document.getElementById("success-rate");
  const stepRow = document.querySelector(".step-row");
  const answerRow = document.querySelector(".answer-row");
  const solutionRow = document.querySelector(".solution-row");
  const feedback = document.getElementById("feedback-panel");
  const studentWorkSteps = document.getElementById("student-work-steps");

  // =====================================
  // STATE
  // =====================================

  let currentQuestion = "";
  let currentAnswer = "";
  let currentSolutionSteps = [];
  let currentStepIndex = 0;
  let acceptedSteps = [];
  let currentStepExplanations = [];
  let totalQuestions = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let questionRecorded = false;
  let useNegativeCoefficient = false;

  // =====================================
  // MODE HANDLER
  // =====================================

  function updateMode() {

    mcqRow?.style && (mcqRow.style.display = "none");

    dashboardPanel.style.display = "none";
    teacherPanel.style.display = "none";

    stepRow.style.display = "flex";
    answerRow.style.display = "flex";
    solutionRow.style.display = "flex";

    const selected = mode.value;

    if (selected === "mcq") {

      if (mcqRow) {
        mcqRow.style.display = "flex";
      }

      stepRow.style.display = "none";
      answerRow.style.display = "none";
      solutionRow.style.display = "none";
    }

    if (selected === "teacher") {

      teacherPanel.style.display = "block";

      teacherAnswer.innerHTML = `
        <h3>Answer</h3>
        <p>${currentAnswer || "Generate a question first"}</p>

        <h3>Solution</h3>
        <p>
          ${
            currentSolutionSteps.length
              ? currentSolutionSteps.join("<br>")
              : "Generate a question first"
          }
        </p>
      `;
    }

    if (selected === "dashboard") {

      dashboardPanel.style.display = "block";

      stepRow.style.display = "none";
      answerRow.style.display = "none";
      solutionRow.style.display = "none";
    }
  }

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
  
  mode?.addEventListener("change", updateMode);

  updateMode();

  // =====================================
  // HELPERS
  // =====================================

  function rand(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
  }

  function flipSign(sign) {

    switch (sign) {

      case "<":
        return ">";

      case ">":
        return "<";

      case "<=":
        return ">=";

      case ">=":
        return "<=";

      default:
        return sign;
    }
  }

  // =====================================
// MCQ OPTION GENERATOR
// =====================================

  function generateMCQOptions(type, currentAnswer) {

    let options = [];

    // ==========================
    // EXPRESSIONS & EQUATIONS
    // ==========================

    if (
      type === "expressions" ||
      type === "equations"
    ) {

      const correct =
        Number(currentAnswer);

      options.push(correct);

      while (options.length < 4) {

        const wrong =
          correct + rand(-12, 12);

        if (
          wrong !== correct &&
          !options.includes(wrong)
        ) {
          options.push(wrong);
        }
      }
    }

    // ==========================
    // INEQUALITIES
    // ==========================

    else if (
      type === "inequalities"
    ) {

      options.push(currentAnswer);

      const match =
        currentAnswer.match(
          /^x\s*(<=|>=|<|>)\s*(-?\d+)$/
        );

      if (match) {

        const sign =
          match[1];

        const value =
          Number(match[2]);

        const opposite = {
          "<": ">",
          ">": "<",
          "<=": ">=",
          ">=": "<="
        };

        // Wrong sign

        options.push(
          `x ${opposite[sign]} ${value}`
        );

        // Wrong value

        let wrongValue;

        do {

          wrongValue =
            value + rand(-5, 5);

        } while (
          wrongValue === value
        );

        options.push(
          `x ${sign} ${wrongValue}`
        );

        // Inclusive/exclusive mistake

        let similar = sign;

        if (sign === "<")
          similar = "<=";

        else if (sign === "<=")
          similar = "<";

        else if (sign === ">")
          similar = ">=";

        else if (sign === ">=")
          similar = ">";

        options.push(
          `x ${similar} ${value}`
        );
      }

      while (
        options.length < 4
      ) {

        const signs =
          ["<", ">", "<=", ">="];

        const wrong =
          `x ${
            signs[rand(0, 3)]
          } ${rand(-10, 10)}`;

        if (
          !options.includes(wrong)
        ) {
          options.push(wrong);
        }
      }
    }

    // Shuffle

    options.sort(
      () => Math.random() - 0.5
    );

    return options;
  }

  // =====================================
  // EXPRESSIONS
  // =====================================

  function generateExpression(level) {

    let x, a, b;

    if (level === "simple") {

      x = rand(1, 5);
      a = rand(1, 5);
      b = rand(1, 10);

    } else if (level === "medium") {

      x = rand(2, 10);
      a = rand(2, 12);
      b = rand(-20, 20);

    } else {

      x = rand(5, 15);
      a = rand(5, 20);
      b = rand(-50, 50);

    }

    currentQuestion =
      `Evaluate: ${a}x + ${b} when x = ${x}`;

    currentAnswer = a * x + b;

    currentSolutionSteps = [
      `${a}(${x}) + ${b}`,
      `${a * x} + ${b}`,
      `${currentAnswer}`
    ];

    currentStepIndex = 0;

    currentStepExplanations = [
    "Substitute the value of x into the expression.",
    "Perform the multiplication first.",
    "Perform the addition or subtraction to obtain the final answer."
    ];
  }

  // =====================================
  // EQUATIONS
  // =====================================

  function generateEquation(level) {

  let x;

  currentSolutionSteps = [];
  currentStepExplanations = [];

  if (level === "simple") {

    x = rand(2, 12);

    const a = rand(2, 9);
    const b = rand(1, 15);

    const rhs = a * x + b;

    currentQuestion =
      `Solve: ${a}x + ${b} = ${rhs}`;

    currentAnswer = x;

    currentSolutionSteps = [
      `${a}x = ${rhs - b}`,
      `x = ${x}`
    ];

    currentStepExplanations = [
      `Subtract ${b} from both sides.`,
      `Divide both sides by ${a}.`
    ];
  }

  else if (level === "medium") {

    x = rand(2, 12);

    const a = rand(2, 8);
    const b = rand(1, 10);

    const rhs = a * (x - b);

    currentQuestion =
      `Solve: ${a}(x - ${b}) = ${rhs}`;

    currentAnswer = x;

    currentSolutionSteps = [
      `x - ${b} = ${rhs / a}`,
      `x = ${x}`
    ];

    currentStepExplanations = [
      `Divide both sides by ${a}.`,
      `Add ${b} to both sides.`
    ];
  }

  else if (level === "hard") {

    x = rand(2, 12);

    const a = rand(2, 6);
    const b = rand(1, 8);
    const c = rand(1, 10);

    const rhs =
      a * (2 * x - b) + c;

    currentQuestion =
      `Solve: ${a}(2x - ${b}) + ${c} = ${rhs}`;

    currentAnswer = x;

    currentSolutionSteps = [
      `${a}(2x - ${b}) = ${rhs - c}`,
      `2x - ${b} = ${(rhs - c) / a}`,
      `2x = ${((rhs - c) / a) + b}`,
      `x = ${x}`
    ];

    currentStepExplanations = [
      `Subtract ${c} from both sides.`,
      `Divide both sides by ${a}.`,
      `Add ${b} to both sides.`,
      `Divide both sides by 2.`
    ];
  }

  currentStepIndex = 0;
}

  // =====================================
  // INEQUALITIES
  // =====================================

  function generateInequality(level) {

    let x;

    currentSolutionSteps = [];
    currentStepExplanations = [];

    const signs = ["<", ">", "<=", ">="];

    const sign =
      signs[rand(0, signs.length - 1)];

    if (level === "simple") {

      x = rand(-10, 10);

      let a;

      a = rand(2, 9);
      if (useNegativeCoefficient) {
          a = -a;
      }
      useNegativeCoefficient = !useNegativeCoefficient;

      const b = rand(1, 20);

      const rhs = a * x + b;

      const finalSign =
        a < 0
          ? flipSign(sign)
          : sign;

      currentQuestion =
        `Solve: ${a}x + ${b} ${sign} ${rhs}`;

      currentAnswer =
        `x ${finalSign} ${x}`;

      currentSolutionSteps = [
        `${a}x ${sign} ${rhs - b}`,
        `x ${finalSign} ${x}`
      ];

      currentStepExplanations = [
        `Subtract ${b} from both sides.`,
        a < 0
          ? `Divide by ${a}. Since it is negative, reverse the inequality sign.`
          : `Divide both sides by ${a}.`
      ];
    }

    else if (level === "medium") {

      x = rand(-10, 10);

      let a;
      
      a = rand(2, 8);
      if (useNegativeCoefficient) {
          a = -a;
      }
      useNegativeCoefficient = !useNegativeCoefficient;

      const b = rand(2, 10);

      const rhs =
        a * (x - b);

      const finalSign =
        a < 0
          ? flipSign(sign)
          : sign;

      currentQuestion =
        `Solve: ${a}(x - ${b}) ${sign} ${rhs}`;

      currentAnswer =
        `x ${finalSign} ${x}`;

      currentSolutionSteps = [
        `x - ${b} ${finalSign} ${rhs / a}`,
        `x ${finalSign} ${x}`
      ];

      currentStepExplanations = [
        a < 0
          ? `Divide by ${a}. Since it is negative, reverse the inequality sign.`
          : `Divide both sides by ${a}.`,
        `Add ${b} to both sides.`
      ];
    }

    else {

      x = rand(-10, 10);

      let a;

      a = rand(2, 5);
      if (useNegativeCoefficient) {
          a = -a;
      }
      useNegativeCoefficient = !useNegativeCoefficient;

      const b = rand(1, 8);
      const c = rand(1, 10);

      const rhs =
        a * (2 * x - b) + c;

      const finalSign =
        a < 0
          ? flipSign(sign)
          : sign;

      currentQuestion =
        `Solve: ${a}(2x - ${b}) + ${c} ${sign} ${rhs}`;

      currentAnswer =
        `x ${finalSign} ${x}`;

      currentSolutionSteps = [
        `${a}(2x - ${b}) ${sign} ${rhs - c}`,
        `2x - ${b} ${finalSign} ${(rhs - c) / a}`,
        `2x ${finalSign} ${((rhs - c) / a) + b}`,
        `x ${finalSign} ${x}`
      ];

      currentStepExplanations = [
        `Subtract ${c} from both sides.`,
        a < 0
          ? `Divide by ${a}. Since it is negative, reverse the inequality sign.`
          : `Divide both sides by ${a}.`,
        `Add ${b} to both sides.`,
        `Divide both sides by 2.`
      ];
    }

    currentStepIndex = 0;
  }

  // =====================================
  // GENERATE BUTTON
  // =====================================

  generateBtn?.addEventListener("click", () => {

    const type = algebraType.value;
    const level = difficulty.value;
    questionRecorded = false;

    if (type === "expressions") {
      generateExpression(level);
    }

    if (type === "equations") {
      generateEquation(level);
    }

    if (type === "inequalities") {
      generateInequality(level);
    }

    currentStepIndex = 0;
    acceptedSteps = [];
    studentWorkSteps.innerHTML = "";

    questionInput.value = currentQuestion;

    if (mode.value === "mcq") {

      const options =
        generateMCQOptions(
          type,
          currentAnswer
        );

      document
        .querySelectorAll(".mcq-option")
        .forEach((btn, index) => {

          btn.textContent =
            String(options[index]);

          btn.dataset.value =
            String(options[index]);
        });

    }

    stepInput.value = "";
    answerInput.value = "";
    stepInput.disabled = false;
    checkStepBtn.disabled = false;
    nextStepBtn.disabled = false;

    feedback.innerHTML =
      "Question generated. Click GO to begin.";
    updateMode();

    teacherAnswer.innerHTML = `
      <h3>Answer</h3>
      <p>${currentAnswer}</p>

      <h3>Solution</h3>
      <p>${currentSolutionSteps.join("<br>")}</p>
    `;
  });

  // =====================================
  // GO
  // =====================================

  goBtn?.addEventListener("click", () => {

    feedback.innerHTML =
      "Enter your first solution step.";

    stepInput.focus();
  });

  // =====================================
  // STEP VALIDATION
  // =====================================

  checkStepBtn?.addEventListener("click", () => {

  const studentStep =
    stepInput.value
      .trim()
      .replace(/\s+/g, "");

  const expectedStep =
    currentSolutionSteps[currentStepIndex]
      .trim()
      .replace(/\s+/g, "");

  const nextStep =
    currentSolutionSteps[currentStepIndex + 1]
      ?.trim()
      .replace(/\s+/g, "");

  if (
    studentStep === expectedStep ||
    studentStep === nextStep
  ) {

    feedback.innerHTML =
      "✅ Excellent! Correct step.";

    acceptedSteps.push(stepInput.value);

    studentWorkSteps.innerHTML += `
      <div class="work-step">
        <strong>Step ${acceptedSteps.length}</strong><br>
        ${stepInput.value}
      </div>
    `;

    if (
      currentStepIndex >=
      currentSolutionSteps.length - 1
    ) {

      feedback.innerHTML =
        "🎉 Excellent! Final step reached. Solution completed successfully.";

      checkStepBtn.disabled = true;
      nextStepBtn.disabled = true;
      stepInput.disabled = true;

      return;
    }

    currentStepIndex++;

  } else {

    feedback.innerHTML =
      "❌ Incorrect step. Try again.";

  }

});

  // =====================================
  // NEXT STEP
  // =====================================

  nextStepBtn?.addEventListener("click", () => {
  stepInput.value = "";
  feedback.innerHTML =
    "Enter the next step.";
  stepInput.focus();
  });

  // =====================================
  // ANSWER VALIDATION
  // =====================================

  checkAnswerBtn?.addEventListener("click", () => {

  const studentAnswer =
    answerInput.value.trim();
  
  totalQuestions++;

  if (
    studentAnswer ===
    String(currentAnswer)
  ) {

    feedback.innerHTML =
      "🎉 Excellent! You are correct!";
    correctAnswers++;
    updateDashboard();

  } else {

    feedback.innerHTML =
      `❌ Incorrect. Correct answer: ${currentAnswer}`;
    incorrectAnswers++;
    updateDashboard();

  }

});

mcqOptions.forEach(btn => {

  btn.addEventListener("click", () => {

    if (!questionRecorded) {

      totalQuestions++;
      questionRecorded = true;

      if (
        btn.dataset.value ===
        String(currentAnswer)
      ) {

        correctAnswers++;

        feedback.innerHTML =
          "🎉 Correct!";

      } else {

        incorrectAnswers++;

        feedback.innerHTML =
          `❌ Incorrect. Correct answer: ${currentAnswer}`;
      }

      updateDashboard();

    }

  });

});

  // =====================================
  // SHOW FULL SOLUTION
  // =====================================

  solutionBtn?.addEventListener("click", () => {

  let solutionHTML = `
    <h3>Full Solution</h3>
  `;

  currentSolutionSteps.forEach((step, index) => {

    solutionHTML += `
      <p>
        <strong>Step ${index + 1}:</strong>
        ${step}
      </p>
      <p>
        ${currentStepExplanations[index]}
      </p>
      <hr>
    `;

  });

  feedback.innerHTML = solutionHTML;

});

});
