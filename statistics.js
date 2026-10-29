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

  //Statistics topic selector (equivalent to algebraType)
  const statisticsType = document.getElementById("statisticsType");

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
  // FRACTION HELPER
  // =====================================

  function simplifyFraction(numerator, denominator) {

    if (denominator === 0) {
      return "Undefined";
    }

    if (numerator === 0) {
      return "0";
    }

    function gcd(a, b) {
      return b === 0
        ? Math.abs(a)
        : gcd(b, a % b);
    }

    const divisor =
      gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    if (denominator === 1) {
      return `${numerator}`;
    }

    return `${numerator}/${denominator}`;
  }

    function normalizeStep(step) {

      return String(step)
        .toLowerCase()

        // Remove spaces
        .replace(/\s+/g, "")

        // Normalize division symbols
        .replace(/÷/g, "/")
        .replace(/∕/g, "/")
        .replace(/⁄/g, "/")
        .replace(/／/g, "/")
        .replace(/\\/g, "/")

        // Normalize multiplication symbols
        .replace(/×/g, "*")
        .replace(/x/g, "*")
        .replace(/·/g, "*")
        .replace(/∙/g, "*")
        .replace(/•/g, "*")

        // Remove any leading instructional text
        .replace(/^[^0-9(.\-]+/, "")

        .trim();

    }

    function fractionsEqual(a, b) {
      a = normalizeStep(a);
      b = normalizeStep(b);
      if (!a.includes("/") || !b.includes("/")) {
        return false;
      }
      const [aNum, aDen] = a.split("/").map(Number);
      const [bNum, bDen] = b.split("/").map(Number);
      if (
        isNaN(aNum) ||
        isNaN(aDen) ||
        isNaN(bNum) ||
        isNaN(bDen)
      ) {
        return false;
      }
      return aNum * bDen === bNum * aDen;
    }

  // =====================================
  // MEAN
  // =====================================

  function generateMean(level) {

    let numbers = [];
    let type;

    if (level === "simple") {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Mean of integers
      // -------------------------
      if (type === 1) {

        for (let i = 0; i < 5; i++) {
          numbers.push(rand(2, 20));
        }

      }

      // -------------------------
      // Type 2: Mean of exam scores
      // -------------------------
      else if (type === 2) {

        for (let i = 0; i < 6; i++) {
          numbers.push(rand(40, 100));
        }

      }

      // -------------------------
      // Type 3: Mean of ages
      // -------------------------
      else {

        for (let i = 0; i < 5; i++) {
          numbers.push(rand(10, 18));
        }

      }

      const total =
        numbers.reduce((a, b) => a + b, 0);

      currentAnswer =
        total / numbers.length;

      currentQuestion =
        `Find the mean of: ${numbers.join(", ")}`;

      currentSolutionSteps = [
        `Add the numbers: ${numbers.join(" + ")} = ${total}`,
        `Divide by ${numbers.length}`,
        `${total} ÷ ${numbers.length} = ${currentAnswer}`
      ];

      currentStepExplanations = [
        "Find the total of all the numbers.",
        "Divide the total by the number of values.",
        "The result is the mean."
      ];
    }

    else if (level === "medium") {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Missing number
      // -------------------------
      if (type === 1) {

        const values = [];

        for (let i = 0; i < 4; i++) {
          values.push(rand(10, 30));
        }

        const missing =
          rand(10, 30);

        const total =
          values.reduce((a, b) => a + b, 0) + missing;

        const mean =
          total / 5;

        currentQuestion =
          `The mean of five numbers is ${mean}. Four numbers are ${values.join(", ")}. Find the fifth number.`;

        currentAnswer =
          missing;

        currentSolutionSteps = [
          `Total = ${mean} × 5 = ${total}`,
          `Known total = ${values.join(" + ")} = ${values.reduce((a, b) => a + b, 0)}`,
          `${total} - ${values.reduce((a, b) => a + b, 0)} = ${missing}`
        ];

        currentStepExplanations = [
          "Multiply the mean by the number of values.",
          "Find the sum of the known numbers.",
          "Subtract to obtain the missing number."
        ];
      }

      // -------------------------
      // Type 2: Mean of decimals
      // -------------------------
      else if (type === 2) {

        for (let i = 0; i < 5; i++) {
          numbers.push((rand(10, 50) / 10).toFixed(1));
        }

        const numeric =
          numbers.map(Number);

        const total =
          numeric.reduce((a, b) => a + b, 0);

        currentAnswer =
          (total / 5).toFixed(1);

        currentQuestion =
          `Find the mean of: ${numbers.join(", ")}`;

        currentSolutionSteps = [
          `Add the numbers = ${total.toFixed(1)}`,
          `Divide by 5`,
          `${total.toFixed(1)} ÷ 5 = ${currentAnswer}`
        ];

        currentStepExplanations = [
          "Add all the decimal values.",
          "Divide by the number of values.",
          "The result is the mean."
        ];
      }

      // -------------------------
      // Type 3: Heights
      // -------------------------
      else {

        for (let i = 0; i < 6; i++) {
          numbers.push(rand(140, 190));
        }

        const total =
          numbers.reduce((a, b) => a + b, 0);

        currentAnswer =
          (total / 6).toFixed(1);

        currentQuestion =
          `Find the mean height (cm): ${numbers.join(", ")}`;

        currentSolutionSteps = [
          `Add the heights = ${total}`,
          `Divide by 6`,
          `${total} ÷ 6 = ${currentAnswer}`
        ];

        currentStepExplanations = [
          "Add all the heights.",
          "Divide by the number of heights.",
          "The result is the mean height."
        ];
      }
    }

    else {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Added value
      // -------------------------
      if (type === 1) {

        const count = 5;

        for (let i = 0; i < count; i++) {
          numbers.push(rand(20, 50));
        }

        const added =
          rand(20, 50);

        const total =
          numbers.reduce((a, b) => a + b, 0);

        const newMean =
          ((total + added) / (count + 1)).toFixed(1);

        currentQuestion =
          `The numbers are ${numbers.join(", ")}. A new value of ${added} is added. Find the new mean.`;

        currentAnswer =
          newMean;

        currentSolutionSteps = [
          `Original total = ${total}`,
          `New total = ${total} + ${added} = ${total + added}`,
          `${total + added} ÷ ${count + 1} = ${newMean}`
        ];

        currentStepExplanations = [
          "Find the original total.",
          "Add the new value.",
          "Divide by the new number of values."
        ];
      }

      // -------------------------
      // Type 2: Removed value
      // -------------------------
      else if (type === 2) {

        const mean =
          rand(20, 40);

        const count = 6;

        const removed =
          rand(10, 40);

        const total =
          mean * count;

        const newMean =
          ((total - removed) / 5).toFixed(1);

        currentQuestion =
          `The mean of six numbers is ${mean}. One value of ${removed} is removed. Find the new mean.`;

        currentAnswer =
          newMean;

        currentSolutionSteps = [
          `Original total = ${mean} × 6 = ${total}`,
          `New total = ${total} - ${removed} = ${total - removed}`,
          `${total - removed} ÷ 5 = ${newMean}`
        ];

        currentStepExplanations = [
          "Find the original total.",
          "Subtract the removed value.",
          "Divide by the remaining number of values."
        ];
      }

      // -------------------------
      // Type 3: Word problem
      // -------------------------
      else {

        for (let i = 0; i < 7; i++) {
          numbers.push(rand(55, 95));
        }

        const total =
          numbers.reduce((a, b) => a + b, 0);

        currentAnswer =
          (total / 7).toFixed(1);

        currentQuestion =
          `Seven students scored ${numbers.join(", ")} in a test. Find their mean score.`;

        currentSolutionSteps = [
          `Total score = ${total}`,
          `Divide by 7`,
          `${total} ÷ 7 = ${currentAnswer}`
        ];

        currentStepExplanations = [
          "Find the total score.",
          "Divide by the number of students.",
          "The result is the mean score."
        ];
      }
    }

    currentStepIndex = 0;
  }

  // =====================================
  // MEDIAN
  // =====================================

  function generateMedian(level) {

    let numbers = [];
    let type;

    if (level === "simple") {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Odd number of values
      // -------------------------
      if (type === 1) {

        for (let i = 0; i < 5; i++) {
          numbers.push(rand(1, 30));
        }

      }

      // -------------------------
      // Type 2: Even number of values
      // -------------------------
      else if (type === 2) {

        for (let i = 0; i < 6; i++) {
          numbers.push(rand(1, 30));
        }

      }

      // -------------------------
      // Type 3: Ages
      // -------------------------
      else {

        for (let i = 0; i < 7; i++) {
          numbers.push(rand(10, 18));
        }

      }

      const original = [...numbers];

      numbers.sort((a, b) => a - b);

      let median;

      if (numbers.length % 2 === 1) {

        median =
          numbers[Math.floor(numbers.length / 2)];

      } else {

        median =
          (
            numbers[numbers.length / 2 - 1] +
            numbers[numbers.length / 2]
          ) / 2;

      }

      currentQuestion =
        `Find the median of: ${original.join(", ")}`;

      currentAnswer =
        median;

      currentSolutionSteps = [
        `Arrange in ascending order: ${numbers.join(", ")}`,
        numbers.length % 2 === 1
          ? `Middle number = ${median}`
          : `Middle numbers = ${numbers[numbers.length / 2 - 1]} and ${numbers[numbers.length / 2]}`,
        `${median}`
      ];

      currentStepExplanations = [
        "Arrange the numbers from smallest to largest.",
        "Locate the middle value(s).",
        "The median is the middle value (or the average of the two middle values)."
      ];

    }

    else if (level === "medium") {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Test scores
      // -------------------------
      if (type === 1) {

        for (let i = 0; i < 7; i++) {
          numbers.push(rand(40, 100));
        }

      }

      // -------------------------
      // Type 2: Decimal values
      // -------------------------
      else if (type === 2) {

        for (let i = 0; i < 6; i++) {
          numbers.push(Number((rand(10, 90) / 10).toFixed(1)));
        }

      }

      // -------------------------
      // Type 3: Heights
      // -------------------------
      else {

        for (let i = 0; i < 8; i++) {
          numbers.push(rand(145, 190));
        }

      }

      const original = [...numbers];

      numbers.sort((a, b) => a - b);

      let median;

      if (numbers.length % 2 === 1) {

        median =
          numbers[Math.floor(numbers.length / 2)];

      } else {

        median =
          (
            numbers[numbers.length / 2 - 1] +
            numbers[numbers.length / 2]
          ) / 2;

      }

      currentQuestion =
        `Find the median of: ${original.join(", ")}`;

      currentAnswer =
        median;

      currentSolutionSteps = [
        `Arrange in ascending order: ${numbers.join(", ")}`,
        numbers.length % 2 === 1
          ? `Middle number = ${median}`
          : `Middle numbers = ${numbers[numbers.length / 2 - 1]} and ${numbers[numbers.length / 2]}`,
        `${median}`
      ];

      currentStepExplanations = [
        "Arrange the data in ascending order.",
        "Locate the middle value(s).",
        "State the median."
      ];

    }

    else {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Missing value
      // -------------------------
      if (type === 1) {

        const median = rand(20, 40);

        numbers = [
          rand(5, 15),
          rand(10, 18),
          rand(15, median),
          "x",
          rand(median, 45),
          rand(46, 60),
          rand(61, 80)
        ];

        currentQuestion =
          `The median of ${numbers.join(", ")} is ${median}. Find x.`;

        currentAnswer =
          median;

        currentSolutionSteps = [
          "Arrange the numbers in order.",
          "The middle value must equal the median.",
          `x = ${median}`
        ];

        currentStepExplanations = [
          "Identify the middle position.",
          "The median is always the middle value.",
          "Therefore x equals the median."
        ];

      }

      // -------------------------
      // Type 2: Word problem
      // -------------------------
      else if (type === 2) {

        for (let i = 0; i < 9; i++) {
          numbers.push(rand(50, 100));
        }

        const original = [...numbers];

        numbers.sort((a, b) => a - b);

        const median =
          numbers[4];

        currentQuestion =
          `Nine students scored ${original.join(", ")}. Find the median score.`;

        currentAnswer =
          median;

        currentSolutionSteps = [
          `Arrange in ascending order: ${numbers.join(", ")}`,
          `Middle score = ${median}`,
          `${median}`
        ];

        currentStepExplanations = [
          "Arrange the scores from least to greatest.",
          "Locate the fifth score.",
          "That score is the median."
        ];

      }

      // -------------------------
      // Type 3: Large dataset
      // -------------------------
      else {

        for (let i = 0; i < 10; i++) {
          numbers.push(rand(1, 100));
        }

        const original = [...numbers];

        numbers.sort((a, b) => a - b);

        const median =
          (
            numbers[4] +
            numbers[5]
          ) / 2;

        currentQuestion =
          `Find the median of: ${original.join(", ")}`;

        currentAnswer =
          median;

        currentSolutionSteps = [
          `Arrange in ascending order: ${numbers.join(", ")}`,
          `Middle numbers = ${numbers[4]} and ${numbers[5]}`,
          `(${numbers[4]} + ${numbers[5]}) ÷ 2 = ${median}`
        ];

        currentStepExplanations = [
          "Arrange the data in ascending order.",
          "Identify the two middle values.",
          "Average the two middle values."
        ];

      }

    }

    currentStepIndex = 0;

  }

  // =====================================
  // MODE
  // =====================================

  function generateMode(level) {

    let numbers = [];
    let type;

    if (level === "simple") {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Single mode
      // -------------------------
      if (type === 1) {

        const modeValue = rand(2, 20);

        numbers = [
          rand(1, 20),
          modeValue,
          rand(1, 20),
          modeValue,
          rand(1, 20),
          modeValue
        ];

      }

      // -------------------------
      // Type 2: School scores
      // -------------------------
      else if (type === 2) {

        const modeValue = rand(40, 100);

        numbers = [
          modeValue,
          rand(40, 100),
          rand(40, 100),
          modeValue,
          rand(40, 100),
          modeValue
        ];

      }

      // -------------------------
      // Type 3: Ages
      // -------------------------
      else {

        const modeValue = rand(10, 18);

        numbers = [
          rand(10, 18),
          modeValue,
          rand(10, 18),
          modeValue,
          modeValue,
          rand(10, 18)
        ];

      }

      currentQuestion =
        `Find the mode of: ${numbers.join(", ")}`;

    }

    else if (level === "medium") {

      type = rand(1, 3);

      // -------------------------
      // Type 1: Bimodal
      // -------------------------
      if (type === 1) {

        const mode1 = rand(5, 15);
        let mode2 = rand(16, 30);

        numbers = [
          mode1,
          mode2,
          rand(1, 30),
          mode1,
          mode2,
          rand(1, 30),
          mode1,
          mode2
        ];

      }

      // -------------------------
      // Type 2: Decimal values
      // -------------------------
      else if (type === 2) {

        const modeValue =
          Number((rand(10, 40) / 10).toFixed(1));

        numbers = [
          Number((rand(10, 40) / 10).toFixed(1)),
          modeValue,
          Number((rand(10, 40) / 10).toFixed(1)),
          modeValue,
          modeValue,
          Number((rand(10, 40) / 10).toFixed(1))
        ];

      }

      // -------------------------
      // Type 3: Heights
      // -------------------------
      else {

        const modeValue = rand(150, 190);

        numbers = [
          modeValue,
          rand(150, 190),
          modeValue,
          rand(150, 190),
          modeValue,
          rand(150, 190),
          rand(150, 190)
        ];

      }

      currentQuestion =
        `Find the mode of: ${numbers.join(", ")}`;

    }

    else {

      type = rand(1, 3);

      // -------------------------
      // Type 1: No mode
      // -------------------------
      if (type === 1) {

        numbers = [];

        while (numbers.length < 8) {

          let value = rand(1, 40);

          if (!numbers.includes(value)) {

            numbers.push(value);

          }

        }

      }

      // -------------------------
      // Type 2: Three modes
      // -------------------------
      else if (type === 2) {

        const a = rand(5, 15);
        const b = rand(16, 25);
        const c = rand(26, 35);

        numbers = [
          a, a,
          b, b,
          c, c,
          rand(36, 45),
          rand(46, 55)
        ];

      }

      // -------------------------
      // Type 3: Word problem
      // -------------------------
      else {

        const modeValue = rand(60, 95);

        numbers = [
          modeValue,
          rand(60, 95),
          modeValue,
          rand(60, 95),
          modeValue,
          rand(60, 95),
          rand(60, 95),
          modeValue
        ];

        currentQuestion =
          `Eight students scored ${numbers.join(", ")}. Find the mode.`;

      }

      if (!currentQuestion) {

        currentQuestion =
          `Find the mode of: ${numbers.join(", ")}`;

      }

    }

    // -------------------------
    // Calculate Answer
    // -------------------------

    const frequency = {};

    numbers.forEach(num => {

      frequency[num] =
        (frequency[num] || 0) + 1;

    });

    const highest =
      Math.max(...Object.values(frequency));

    let modes =
      Object.keys(frequency)
        .filter(key => frequency[key] === highest)
        .map(Number);
    
    const frequencyStep =
      Object.keys(frequency)
        .map(Number)
        .sort((a, b) => a - b)
        .map(num => `${num} = ${frequency[num]}`)
        .join(", ");

    if (highest === 1) {

      currentAnswer = "No mode";

      currentSolutionSteps = [
        frequencyStep,
        "Every value appears once.",
        "Mode = No mode"
      ];

      currentStepExplanations = [
        "Count how many times each value appears.",
        "Since every value has the same frequency of 1, there is no most frequent value.",
        "Therefore, the data has no mode."
      ];

    } else {

      currentAnswer = modes.join(", ");

      currentSolutionSteps = [
        frequencyStep,
        `Most frequent value(s) = ${currentAnswer}`,
        `Mode = ${currentAnswer}`
      ];

      currentStepExplanations = [
        "Count how many times each value appears.",
        "Identify the value(s) with the greatest frequency.",
        "The most frequent value(s) form the mode."
      ];

    }

    currentStepIndex = 0;

  }

  // =====================================
  // PROBABILITY
  // =====================================

  function generateProbability(level) {

    let red, blue, total;

    currentSolutionSteps = [];
    currentStepExplanations = [];

    // =====================================
    // SIMPLE
    // =====================================

    if (level === "simple") {

      red = rand(2, 8);
      blue = rand(2, 8);

      total = red + blue;

      currentQuestion =
        `A bag contains ${red} red balls and ${blue} blue balls. One ball is selected at random. Find the probability of selecting a red ball.`;

      const unsimplified =
        `${red}/${total}`;

      currentAnswer =
        simplifyFraction(red, total);

      currentSolutionSteps = [
        `${red}`,
        `${total}`,
        unsimplified
      ];

      currentStepExplanations = [
        "Write the number of favourable outcomes.",
        "Write the total number of possible outcomes.",
        "Write the probability as favourable outcomes ÷ total outcomes."
      ];

      if (unsimplified !== currentAnswer) {

        currentSolutionSteps.push(currentAnswer);

        currentStepExplanations.push(
          "Simplify the fraction to its lowest terms."
        );

      }

    }

    // =====================================
    // MEDIUM
    // =====================================

    else if (level === "medium") {

      red = rand(3, 8);
      blue = rand(2, 6);

      total = red + blue;

      currentQuestion =
        `A bag contains ${red} red balls and ${blue} blue balls. Two balls are selected with replacement. Find the probability that both balls are red.`;

      const numerator =
        red * red;

      const denominator =
        total * total;

      const unsimplified =
        `${numerator}/${denominator}`;

      currentAnswer =
        simplifyFraction(
          numerator,
          denominator
        );

      currentSolutionSteps = [
        `${red}/${total}`,
        `${red}/${total}`,
        unsimplified
      ];

      currentStepExplanations = [
        "Write the probability of selecting a red ball the first time.",
        "Since the ball is replaced, the probability remains the same for the second selection.",
        "Multiply the two probabilities."
      ];

      if (unsimplified !== currentAnswer) {

        currentSolutionSteps.push(currentAnswer);

        currentStepExplanations.push(
          "Simplify the fraction to its lowest terms."
        );

      }

    }

    // =====================================
    // HARD
    // =====================================

    else {

      red = rand(4, 9);
      blue = rand(2, 7);

      total = red + blue;

      currentQuestion =
        `A bag contains ${red} red balls and ${blue} blue balls. Two balls are selected without replacement. Find the probability that both balls are red.`;

      const numerator =
        red * (red - 1);

      const denominator =
        total * (total - 1);

      const unsimplified =
        `${numerator}/${denominator}`;

      currentAnswer =
        simplifyFraction(
          numerator,
          denominator
        );

      currentSolutionSteps = [
        `${red}/${total}`,
        `${red - 1}/${total - 1}`,
        unsimplified
      ];

      currentStepExplanations = [
        "Write the probability of selecting the first red ball.",
        "Without replacement, both the favourable outcomes and total outcomes decrease by one.",
        "Multiply the two probabilities."
      ];

      if (unsimplified !== currentAnswer) {

        currentSolutionSteps.push(currentAnswer);

        currentStepExplanations.push(
          "Simplify the fraction to its lowest terms."
        );

      }

    }

    currentStepIndex = 0;

  }

  // =====================================
  // GENERATE BUTTON
  // =====================================

  generateBtn?.addEventListener("click", () => {

    const type = statisticsType.value;
    const level = difficulty.value;

    questionRecorded = false;

    if (type === "mean") {
      generateMean(level);
    }

    if (type === "median") {
      generateMedian(level);
    }

    if (type === "mode") {
      generateMode(level);
    }

    if (type === "probability") {
      generateProbability(level);
    }

    currentStepIndex = 0;
    acceptedSteps = [];
    studentWorkSteps.innerHTML = "";

    questionInput.value = currentQuestion;

    if (mode.value === "mcq") {

      let options = [String(currentAnswer)];

      while (options.length < 4) {

        let wrong;

        if (type === "probability") {

          // Generate random probability fractions
          const numerator = rand(1, 5);
          const denominator = rand(numerator + 1, 10);

          wrong = simplifyFraction(
            numerator,
            denominator
          );

        } else {

          // Generate nearby numerical answers
          const answer = Number(currentAnswer);

          if (Number.isInteger(answer)) {

            wrong = String(
              answer + rand(-10, 10)
            );

          } else {

            wrong = String(
              (
                answer +
                rand(-20, 20) / 10
              ).toFixed(1)
            );

          }

        }

        if (
          wrong !== String(currentAnswer) &&
          !options.includes(wrong)
        ) {
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
      normalizeStep(stepInput.value);

    const expectedStep =
      normalizeStep(
        currentSolutionSteps[currentStepIndex] || ""
      );

    const nextStep =
      normalizeStep(
        currentSolutionSteps[currentStepIndex + 1] || ""
      );

    if (
      studentStep === expectedStep ||
      studentStep === nextStep ||
      fractionsEqual(
        studentStep,
        expectedStep
      ) ||
      fractionsEqual(
        studentStep,
        nextStep
      )
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
      answerInput.value
        .trim()
        .replace(/\s+/g, "");

    const correctAnswer =
      String(currentAnswer)
        .trim()
        .replace(/\s+/g, "");

    totalQuestions++;

    if (
       studentAnswer ===
      correctAnswer ||

      fractionsEqual(
        studentAnswer,
        correctAnswer
      )
    ) {

      feedback.innerHTML =
        "🎉 Excellent! You are correct!";

      correctAnswers++;

    } else {

      feedback.innerHTML =
        `❌ Incorrect. Correct answer: ${currentAnswer}`;

      incorrectAnswers++;

    }

    updateDashboard();

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