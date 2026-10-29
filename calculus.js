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
  const topic = document.getElementById("topic");
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

  // =========================
  // HELPERS
  // =========================

  /**
   * Random integer generator
   */
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Normalize steps so MCQ / step checker matches correctly
   * Removes spacing + standardizes symbols
   */
  function normalizeStep(step) {
    return String(step)
      .replace(/\s+/g, "")
      .replace(/−/g, "-")
      .replace(/–/g, "-")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/^dy\/dx=/i, "")   // Ignore a leading "dy/dx="
      .toLowerCase();
  }

  /**
   * Flip inequality signs (useful for future inequalities module)
   */
  function flipSign(sign) {
    switch (sign) {
      case "<": return ">";
      case ">": return "<";
      case "<=": return ">=";
      case ">=": return "<=";
      default: return sign;
    }
  }

  /**
   * Power rule (differentiation)
   * y = ax^n → dy/dx = a*n x^(n-1)
   */
  function buildPowerRuleSteps(coefficient, exponent) {

    const newCoefficient = coefficient * exponent;
    const newExponent = exponent - 1;

    const steps = [];
    const explanations = [];

    // Step 1
    steps.push(
      `dy/dx = ${coefficient}(${exponent})x^(${exponent}-1)`
    );

    explanations.push(
      "Multiply the coefficient by the exponent and subtract one from the exponent."
    );

    // Step 2
    steps.push(
      `dy/dx = ${newCoefficient}x^${newExponent}`
    );

    explanations.push(
      "Simplify the multiplication."
    );

    // Step 3 (only when exponent becomes 1)
    if (newExponent === 1) {

      steps.push(
        `dy/dx = ${newCoefficient}x`
      );

      explanations.push(
        "Since x¹ = x, simplify the expression."
      );

    }

    // Step 4 (only when exponent becomes 0)
    else if (newExponent === 0) {

      steps.push(
        `dy/dx = ${newCoefficient}`
      );

      explanations.push(
        "Since x⁰ = 1, simplify the expression."
      );

    }

    return {
      answer: steps[steps.length - 1],
      steps,
      explanations
    };

  }

// =====================================
// BUILD INTEGRATION STEPS
// =====================================

function buildIntegrationSteps(coefficient, exponent) {

    // -----------------------------------
    // Special case: ∫x^-1 dx
    // -----------------------------------

    if (exponent === -1) {

      const sign =
        coefficient === 1
          ? ""
          : coefficient === -1
            ? "-"
            : coefficient;

      return {

        answer:
          `${sign}ln|x| + C`,

        steps: [

          `∫ ${coefficient}x^(-1) dx`,

          `= ${sign}ln|x| + C`

        ],

        explanations: [

          "Use the special rule ∫x⁻¹ dx = ln|x|.",

          "Add the constant of integration."

        ]

      };

    }

    // -----------------------------------
    // Ordinary power rule
    // -----------------------------------

    const newExponent =
      exponent + 1;

    const numerator =
      `${coefficient}x^${newExponent}`;

    const denominator =
      `${newExponent}`;

    const answer =
      `(${numerator})/${denominator} + C`;

    return {

      answer,

      steps: [

        `∫ ${coefficient}x^${exponent} dx`,

        `= (${coefficient}x^(${exponent}+1))/(${exponent}+1)`,

        `= (${coefficient}x^${newExponent})/${newExponent}`,

        answer

      ],

      explanations: [

        "Increase the exponent by one.",

        "Apply the power rule for integration.",

        "Simplify the exponent.",

        "Add the constant of integration."

      ]

    };

  }

  function expandPower(base, exponent) {

    if (exponent <= 1) {
      return `${base}`;
    }

    return Array(exponent)
      .fill(base)
      .join(" × ");

  }

  /**
   * Build limit solution steps
   */
  function buildLimitSteps(limitValue, expression, steps, answer) {

    return {

      answer,

      steps,

      explanations: [

        "Substitute the limit value.",

        ...steps.slice(1).map((_, i) => {

          if (i === 0)
            return "Evaluate powers.";

          if (i === steps.length - 2)
            return "Obtain the final answer.";

          return "Simplify the expression.";

        })

      ]

    };

  }

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
// LIMITS
// =====================================

  function generateLimits(level) {

    let a;

    // =====================================
    // SIMPLE
    // =====================================

    if (level === "simple") {

      const type = rand(1, 3);

      switch (type) {

        // -----------------------------
        // lim(x→a)(x²)
        // -----------------------------
        case 1: {

          a = rand(2, 5);

          currentQuestion =
            `Evaluate: lim(x→${a})(x²)`;

          const answer = a * a;

          const result = buildLimitSteps(

            a,

            "x²",

            [
              `${a}^2`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

        // -----------------------------
        // lim(x→a)(x³)
        // -----------------------------
        case 2: {

          a = rand(2, 4);

          const cube = a ** 3;

          currentQuestion =
            `Evaluate: lim(x→${a})(x³)`;

          const result = buildLimitSteps(

            a,

            "x³",

            [
              `${a}^3`,
              `${cube}`
            ],

            `${cube}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

        // -----------------------------
        // lim(x→a)(5x)
        // -----------------------------
        case 3: {

          a = rand(2, 8);

          const answer = 5 * a;

          currentQuestion =
            `Evaluate: lim(x→${a})(5x)`;

          const result = buildLimitSteps(

            a,

            "5x",

            [
              `5(${a})`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

      }
    }

    // =====================================
    // MEDIUM
    // =====================================

    else if (level === "medium") {

      const type = rand(1, 3);

      switch (type) {

        // -----------------------------
        // lim(x→a)(x² + 3)
        // -----------------------------
        case 1: {

          a = rand(2, 5);

          const square = a * a;
          const answer = square + 3;

          currentQuestion =
            `Evaluate: lim(x→${a})(x² + 3)`;

          const result = buildLimitSteps(

            a,

            "x² + 3",

            [
              `${a}^2 + 3`,
              `${square} + 3`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

        // -----------------------------
        // lim(x→a)(2x² + 5)
        // -----------------------------
        case 2: {

          a = rand(2, 5);

          const square = a * a;
          const twice = 2 * square;
          const answer = twice + 5;

          currentQuestion =
            `Evaluate: lim(x→${a})(2x² + 5)`;

          const result = buildLimitSteps(

            a,

            "2x² + 5",

            [
              `2(${a})^2 + 5`,
              `2(${square}) + 5`,
              `${twice} + 5`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

        // -----------------------------
        // lim(x→a)(x³ + x)
        // -----------------------------
        case 3: {

          a = rand(2, 4);

          const cube = a ** 3;
          const answer = cube + a;

          currentQuestion =
            `Evaluate: lim(x→${a})(x³ + x)`;

          const result = buildLimitSteps(

            a,

            "x³ + x",

            [
              `${a}^3 + ${a}`,
              `${cube} + ${a}`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

      }
    }

    // =====================================
    // HARD
    // =====================================

    else {

      const type = rand(1, 3);

      switch (type) {

        // -----------------------------
        // lim(x→a)(2x⁴ + 3x² - 5)
        // -----------------------------
        case 1: {

          a = rand(2, 4);

          const x4 = a ** 4;
          const x2 = a ** 2;

          const first = 2 * x4;
          const second = 3 * x2;

          const third = first - second;
          const answer = first + second - 5;

          currentQuestion =
            `Evaluate: lim(x→${a})(2x⁴ + 3x² - 5)`;

          const result = buildLimitSteps(

            a,

            "2x⁴ + 3x² - 5",

            [
              `2(${a})^4 + 3(${a})^2 - 5`,
              `2(${x4}) + 3(${x2}) - 5`,
              `${first} + ${second} - 5`,
              `${first + second} - 5`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

        // -----------------------------
        // lim(x→a)(x⁴ + 2x³ - x)
        // -----------------------------
        case 2: {

          a = rand(2, 4);

          const x4 = a ** 4;
          const x3 = a ** 3;

          const twoCube = 2 * x3;
          const answer = x4 + twoCube - a;

          currentQuestion =
            `Evaluate: lim(x→${a})(x⁴ + 2x³ - x)`;

          const result = buildLimitSteps(

            a,

            "x⁴ + 2x³ - x",

            [
              `${a}^4 + 2(${a})^3 - ${a}`,
              `${x4} + 2(${x3}) - ${a}`,
              `${x4} + ${twoCube} - ${a}`,
              `${x4 + twoCube} - ${a}`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

        // -----------------------------
        // lim(x→a)(5x³ - 4x² + 6)
        // -----------------------------
        case 3: {

          a = rand(2, 5);

          const x3 = a ** 3;
          const x2 = a ** 2;

          const first = 5 * x3;
          const second = 4 * x2;

          const answer = first - second + 6;

          currentQuestion =
            `Evaluate: lim(x→${a})(5x³ - 4x² + 6)`;

          const result = buildLimitSteps(

            a,

            "5x³ - 4x² + 6",

            [
              `5(${a})^3 - 4(${a})^2 + 6`,
              `5(${x3}) - 4(${x2}) + 6`,
              `${first} - ${second} + 6`,
              `${first - second} + 6`,
              `${answer}`
            ],

            `${answer}`

          );

          currentAnswer = result.answer;
          currentSolutionSteps = result.steps;
          currentStepExplanations = result.explanations;

          break;
        }

      }
    }

    currentStepIndex = 0;

  }

// =====================================
// DIFFERENTIATION (SIMPLIFIED STRUCTURE)
// =====================================

  function generateDifferentiation(level) {

    let coefficient;
    let exponent;
    let m, n;

    // =====================================
    // SIMPLE
    // =====================================
    if (level === "simple") {

      const type = rand(1, 5);

      switch (type) {

        // -----------------------------
        // y = x^n
        // -----------------------------
        case 1: {

          coefficient = 1;
          exponent = rand(2, 6);

          currentQuestion =
            `Differentiate: y = x^${exponent}`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = ax^n
        // -----------------------------
        case 2: {

          coefficient = rand(2, 8);
          exponent = rand(2, 6);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^${exponent}`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = -ax^n
        // -----------------------------
        case 3: {

          coefficient = -rand(2, 8);
          exponent = rand(2, 6);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^${exponent}`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = ax^(-n)
        // -----------------------------
        case 4: {

          coefficient = rand(2, 8);
          exponent = -rand(2, 5);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^(${exponent})`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = ax
        // -----------------------------
        case 5: {

          coefficient = rand(2, 12);
          exponent = 1;

          currentQuestion =
            `Differentiate: y = ${coefficient}x`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

      }

    }

// =====================================
// MEDIUM
// =====================================
    else if (level === "medium") {

      const type = rand(1, 5);

      switch (type) {

        // -----------------------------
        // y = ax^n
        // -----------------------------
        case 1: {

          coefficient = rand(6, 10);
          exponent = rand(6, 8);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^${exponent}`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = -ax^n
        // -----------------------------
        case 2: {

          coefficient = -rand(5, 9);
          exponent = rand(6, 8);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^${exponent}`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = ax^(-n)
        // -----------------------------
        case 3: {

          coefficient = rand(5, 10);
          exponent = -rand(3, 5);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^(${exponent})`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = -ax^(-n)
        // -----------------------------
        case 4: {

          coefficient = -rand(4, 8);
          exponent = -rand(3, 5);

          currentQuestion =
            `Differentiate: y = ${coefficient}x^(${exponent})`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

        // -----------------------------
        // y = ax
        // -----------------------------
        case 5: {

          coefficient = rand(10, 15);
          exponent = 1;

          currentQuestion =
            `Differentiate: y = ${coefficient}x`;

          const result =
            buildPowerRuleSteps(
              coefficient,
              exponent
            );

          currentAnswer =
            result.answer;

          currentSolutionSteps =
            result.steps;

          currentStepExplanations =
            result.explanations;

          break;
        }

      }

    }
    

   // =====================================
// HARD
// =====================================
    else {

      const type = rand(1, 5);

      switch (type) {

        // -----------------------------
        // y = x^m(x^n)
        // -----------------------------
        case 1: {

          m = rand(2, 5);
          n = rand(2, 5);

          const totalExponent = m + n;

          currentQuestion =
            `Differentiate: y = x^${m}(x^${n})`;

          currentAnswer =
            `dy/dx = ${totalExponent}x^${totalExponent - 1}`;

          currentSolutionSteps = [
            `y = x^${totalExponent}`,
            `dy/dx = ${totalExponent}x^(${totalExponent}-1)`,
            currentAnswer
          ];

          currentStepExplanations = [
            "Add the exponents using the law of indices.",
            "Apply the power rule.",
            "Simplify the exponent."
          ];

          break;
        }

        // -----------------------------
        // y = x^m/x^n
        // -----------------------------
        case 2: {

          m = rand(5, 8);
          n = rand(2, 4);

          const totalExponent = m - n;

          currentQuestion =
            `Differentiate: y = x^${m}/x^${n}`;

          currentAnswer =
            `dy/dx = ${totalExponent}x^${totalExponent - 1}`;

          currentSolutionSteps = [
            `y = x^${totalExponent}`,
            `dy/dx = ${totalExponent}x^(${totalExponent}-1)`,
            currentAnswer
          ];

          currentStepExplanations = [
            "Subtract the exponents using the law of indices.",
            "Apply the power rule.",
            "Simplify the exponent."
          ];

          break;
        }

        // -----------------------------
        // y = 4x² + 7x⁵
        // -----------------------------
        case 3: {

          currentQuestion =
            "Differentiate: y = 4x^2 + 7x^5";

          currentAnswer =
            "dy/dx = 8x + 35x^4";

          currentSolutionSteps = [
            "dy/dx = 4(2)x^(2-1) + 7(5)x^(5-1)",
            "dy/dx = 8x^1 + 35x^4",
            "dy/dx = 8x + 35x^4"
          ];

          currentStepExplanations = [
            "Apply the power rule to each term.",
            "Multiply the coefficients.",
            "Simplify x¹ to x."
          ];

          break;
        }

        // -----------------------------
        // y = -6x² + 7x⁴
        // -----------------------------
        case 4: {

          currentQuestion =
            "Differentiate: y = -6x^2 + 7x^4";

          currentAnswer =
            "dy/dx = -12x + 28x^3";

          currentSolutionSteps = [
            "dy/dx = -6(2)x^(2-1) + 7(4)x^(4-1)",
            "dy/dx = -12x^1 + 28x^3",
            "dy/dx = -12x + 28x^3"
          ];

          currentStepExplanations = [
            "Apply the power rule to each term.",
            "Multiply the coefficients.",
            "Simplify x¹ to x."
          ];

          break;
        }

        // -----------------------------
        // y = 5x² − 3x⁴
        // -----------------------------
        case 5: {

          currentQuestion =
            "Differentiate: y = 5x^2 - 3x^4";

          currentAnswer =
            "dy/dx = 10x - 12x^3";

          currentSolutionSteps = [
            "dy/dx = 5(2)x^(2-1) - 3(4)x^(4-1)",
            "dy/dx = 10x^1 - 12x^3",
            "dy/dx = 10x - 12x^3"
          ];

          currentStepExplanations = [
            "Apply the power rule to each term.",
            "Multiply the coefficients.",
            "Simplify x¹ to x."
          ];

          break;
        }

      }

    }

    currentStepIndex = 0;
  }

// =====================================
// INTEGRATION
// =====================================

  function generateIntegration(level) {

    let type;
    let coefficient;
    let exponent;
    let a, b;

// =====================================
// SIMPLE
// =====================================

    if (level === "simple") {

      type = rand(1, 5);

      switch (type) {

        // -----------------------------
        // ∫ x^n dx
        // -----------------------------
        case 1:

          coefficient = 1;
          exponent = rand(2, 6);

          currentQuestion =
            `Integrate: ∫ x^${exponent} dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ ax^n dx
        // -----------------------------
        case 2:

          coefficient = rand(2, 8);
          exponent = rand(2, 6);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^${exponent} dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ -ax^n dx
        // -----------------------------
        case 3:

          coefficient = -rand(2, 8);
          exponent = rand(2, 6);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^${exponent} dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ ax^(-n) dx
        // -----------------------------
        case 4:

          coefficient = rand(2, 8);
          exponent = -rand(2, 5);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^(${exponent}) dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ ax dx
        // -----------------------------
        case 5:

          coefficient = rand(2, 12);
          exponent = 1;

          currentQuestion =
            `Integrate: ∫ ${coefficient}x dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

      }

    }

// =====================================
// MEDIUM
// =====================================

    else if (level === "medium") {

      type = rand(1, 5);

      switch (type) {

        // -----------------------------
        // ∫ ax^n dx
        // -----------------------------
        case 1:

          coefficient = rand(6, 10);
          exponent = rand(6, 8);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^${exponent} dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ -ax^n dx
        // -----------------------------
        case 2:

          coefficient = -rand(5, 9);
          exponent = rand(6, 8);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^${exponent} dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ ax^(-n) dx
        // -----------------------------
        case 3:

          coefficient = rand(5, 10);
          exponent = -rand(3, 5);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^(${exponent}) dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ -ax^(-n) dx
        // -----------------------------
        case 4:

          coefficient = -rand(4, 8);
          exponent = -rand(3, 5);

          currentQuestion =
            `Integrate: ∫ ${coefficient}x^(${exponent}) dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

        // -----------------------------
        // ∫ ax dx
        // -----------------------------
        case 5:

          coefficient = rand(10, 15);
          exponent = 1;

          currentQuestion =
            `Integrate: ∫ ${coefficient}x dx`;

          {
            const result =
              buildIntegrationSteps(
                coefficient,
                exponent
              );

            currentAnswer =
              result.answer;

            currentSolutionSteps =
              result.steps;

            currentStepExplanations =
              result.explanations;
          }

        break;

      }

    }

// =====================================
// HARD
// =====================================

    else {

      type = rand(1, 5);

      switch (type) {

        // -----------------------------
        // ∫ (4x² + 7x⁵) dx
        // -----------------------------
        case 1:

          a = 4;
          b = 7;

          currentQuestion =
            `Integrate: ∫ (${a}x^2 + ${b}x^5) dx`;

          currentAnswer =
            `${a}x^3/3 + ${b}x^6/6 + C`;

          currentSolutionSteps = [
            `= ∫ ${a}x^2 dx + ∫ ${b}x^5 dx`,
            `= ${a}x^3/3 + ${b}x^6/6`,
            `${a}x^3/3 + ${b}x^6/6 + C`
          ];

          currentStepExplanations = [
            "Split the integral into two separate integrals.",
            "Integrate each term using the power rule.",
            "Add the constant of integration."
          ];

        break;

        // -----------------------------
        // ∫ (-6x² + 7x⁴) dx
        // -----------------------------
        case 2:

          a = -6;
          b = 7;

          currentQuestion =
            `Integrate: ∫ (${a}x^2 + ${b}x^4) dx`;

          currentAnswer =
            `${a}x^3/3 + ${b}x^5/5 + C`;

          currentSolutionSteps = [
            `= ∫ ${a}x^2 dx + ∫ ${b}x^4 dx`,
            `= ${a}x^3/3 + ${b}x^5/5`,
            `${a}x^3/3 + ${b}x^5/5 + C`
          ];

          currentStepExplanations = [
            "Split the integral.",
            "Integrate each term.",
            "Add the constant of integration."
          ];

        break;

        // -----------------------------
        // ∫ (5x² − 3x⁴) dx
        // -----------------------------
        case 3:

          a = 5;
          b = -3;

          currentQuestion =
            `Integrate: ∫ (${a}x^2 - ${Math.abs(b)}x^4) dx`;

          currentAnswer =
            `${a}x^3/3 - ${Math.abs(b)}x^5/5 + C`;

          currentSolutionSteps = [
            `= ∫ ${a}x^2 dx - ∫ ${Math.abs(b)}x^4 dx`,
            `= ${a}x^3/3 - ${Math.abs(b)}x^5/5`,
            `${a}x^3/3 - ${Math.abs(b)}x^5/5 + C`
          ];

          currentStepExplanations = [
            "Split the integral.",
            "Integrate each term.",
            "Add the constant of integration."
          ];

        break;

        // -----------------------------
        // ∫ (8x⁶ + 2x³) dx
        // -----------------------------
        case 4:

          a = 8;
          b = 2;

          currentQuestion =
            `Integrate: ∫ (${a}x^6 + ${b}x^3) dx`;

          currentAnswer =
            `${a}x^7/7 + ${b}x^4/4 + C`;

          currentSolutionSteps = [
            `= ∫ ${a}x^6 dx + ∫ ${b}x^3 dx`,
            `= ${a}x^7/7 + ${b}x^4/4`,
            `${a}x^7/7 + ${b}x^4/4 + C`
          ];

          currentStepExplanations = [
            "Split the integral.",
            "Integrate each term.",
            "Add the constant of integration."
          ];

        break;

        // -----------------------------
        // ∫ (-5x⁵ − 4x²) dx
        // -----------------------------
        case 5:

          a = -5;
          b = -4;

          currentQuestion =
            `Integrate: ∫ (${a}x^5 - ${Math.abs(b)}x^2) dx`;

          currentAnswer =
            `${a}x^6/6 - ${Math.abs(b)}x^3/3 + C`;

          currentSolutionSteps = [
            `= ∫ ${a}x^5 dx - ∫ ${Math.abs(b)}x^2 dx`,
            `= ${a}x^6/6 - ${Math.abs(b)}x^3/3`,
            `${a}x^6/6 - ${Math.abs(b)}x^3/3 + C`
          ];

          currentStepExplanations = [
            "Split the integral.",
            "Integrate each term.",
            "Add the constant of integration."
          ];

        break;

      }

    }

    currentStepIndex = 0;
  }

  // =====================================
  // GENERATE BUTTON
  // =====================================

  generateBtn?.addEventListener("click", () => {

    const type = topic.value;
    const level = difficulty.value;
    questionRecorded = false;

    if (type === "limits") {
      generateLimits(level);
    }

    if (type === "differentiation") {
      generateDifferentiation(level);
    }

    if (type === "integration") {
      generateIntegration(level);
    }

    currentStepIndex = 0;
    acceptedSteps = [];
    studentWorkSteps.innerHTML = "";

    questionInput.value = currentQuestion;

    if (mode.value === "mcq") {

      let options = [String(currentAnswer)];

      while (options.length < 4) {

      let wrong;

      if (type === "limits") {

        wrong =
          String(
            Number(currentAnswer) +
            rand(-10, 10)
          );

      } else if (type === "differentiation") {

        wrong =
          `${rand(1,15)}x^${rand(0,10)}`;

      } else {

        wrong =
          `(x^${rand(2,12)})/${rand(2,12)} + C`;

      }

      if (!options.includes(wrong)) {
        options.push(wrong);
      }
    }

    options.sort(
      () => Math.random() - 0.5
    );

    document
      .querySelectorAll(".mcq-option")
      .forEach((btn, index) => {

        btn.textContent =
          options[index];

        btn.dataset.value =
          options[index];
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

