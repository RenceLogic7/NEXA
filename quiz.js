// =====================================
// NEXA Quiz
// quiz.js
// Part 1 — Core Quiz Engine
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const quizSubject = document.getElementById("quizSubject");
    const quizTitle = document.getElementById("quizTitle");
    const quizDescription = document.getElementById("quizDescription");
    const currentQuestionElement = document.getElementById("currentQuestion");
    const totalQuestionsElement = document.getElementById("totalQuestions");
    const currentScoreElement = document.getElementById("currentScore");
    const timerElement = document.getElementById("quizTimer");
    const progressBar = document.getElementById("quizProgress");
    const questionTextElement = document.getElementById("questionText");
    const answerContainer = document.getElementById("answerContainer");
    const feedbackElement = document.getElementById("feedback");
    const previousButton = document.getElementById("previousQuestion");
    const nextButton = document.getElementById("nextQuestion");
    const finishButton = document.getElementById("finishQuiz");
    const startQuizButton = document.getElementById("startQuiz");
    const quizStatus = document.getElementById("quizStatus");
    const progressSection = document.getElementById("progressSection");
    const questionSection = document.getElementById("questionSection");
    const answerSection = document.getElementById("answerSection");
    const feedbackSection = document.getElementById("feedbackSection");
    const navigationSection = document.getElementById("navigationSection");
    const questionNavigator =
    document.getElementById("questionNavigator");
    const reviewModal = document.getElementById("reviewModal");
    const reviewSummary = document.getElementById("reviewSummary");
    const unansweredQuestions = document.getElementById("unansweredQuestions");

    const returnQuiz = document.getElementById("returnQuiz");
    const submitFinalQuiz = document.getElementById("submitFinalQuiz");
    
    const summaryTotal = document.getElementById("summaryTotal");
    const summaryAnswered = document.getElementById("summaryAnswered");
    const summaryRemaining = document.getElementById("summaryRemaining");
    const summaryCurrent = document.getElementById("summaryCurrent");
    const summaryTime = document.getElementById("summaryTime");
    const examSummarySection =
    document.getElementById("examSummarySection");
    const navigatorSection =
    document.getElementById("navigatorSection");
    const summaryRemainingLabel =
    document.getElementById("summaryRemainingLabel");
    const endSession = document.getElementById("endSession");
        

    // =====================================
    // QUIZ VARIABLES
    // =====================================

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let answerSubmitted = false;
    let quizFinished = false;
    let elapsedSeconds = 0;
    let timerInterval = null;
    let currentSubject = "";
    let currentTopic = "";
    /* =====================================
    STUDENT ANSWERS
    ===================================== */
    let studentAnswers = [];
    
    // =====================================
    // READ SUBJECT & TOPIC
    // =====================================

    const params = new URLSearchParams(window.location.search);
    currentSubject = params.get("subject") || "";
    currentTopic = params.get("topic") || "";


    // =====================================
    // UPDATE HEADER
    // =====================================

    if (currentSubject) {

        quizSubject.textContent =
            currentSubject.charAt(0).toUpperCase() +
            currentSubject.slice(1) +
            " Quiz";

    }

    if (currentTopic) {

        quizTitle.textContent =
            currentTopic
                .replace(/-/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase());

    } else {

        quizTitle.textContent = "Practice Quiz";

    }

    quizDescription.textContent =
        "Answer each question carefully before submitting.";


    // =====================================
    // LOAD QUIZ QUESTIONS
    // (Database added in Part 7)
    // =====================================

    // =====================================
    // PART 7B — QUESTION LOADER
    // Load questions from quizDatabase
    // =====================================

    // =====================================
    // SHUFFLE ARRAY (Fisher–Yates)
    // =====================================

    function shuffleArray(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];

        }

        return array;

    }

    // =====================================
    // SHUFFLE QUESTIONS
    // =====================================

    function shuffleQuestions() {

        shuffleArray(questions);

    }

    // =====================================
    // LIMIT QUIZ SIZE
    // =====================================

    const QUIZ_SIZE = 10;

    function prepareQuizQuestions() {

        if (questions.length > QUIZ_SIZE) {

            questions = questions.slice(0, QUIZ_SIZE);

        }

    }

    // =====================================
    // QUESTION COUNT
    // =====================================

    function getQuestionCount() {

        return questions.length;

    }

    // =====================================
    // LOAD QUESTIONS
    // =====================================

    function loadQuestions() {

        questions = [];

        // Validate subject

        if (!quizDatabase[currentSubject]) {

            console.error(

                `Subject "${currentSubject}" not found.`

            );

            return;

        }

        // Validate topic

        if (!quizDatabase[currentSubject][currentTopic]) {

            console.error(

                `Topic "${currentTopic}" not found.`

            );

            return;

        }

        // Copy questions

        questions = [

            ...quizDatabase[currentSubject][currentTopic]

        ];

        // No questions

        if (questions.length === 0) {

            console.warn(

                `No quiz questions available for ${currentSubject}/${currentTopic}.`

            );

            return;

        }

        // Randomize order

        shuffleQuestions();

        // Keep only the desired number

        prepareQuizQuestions();

    }


    // =====================================
    // DISPLAY FIRST QUESTION
    // =====================================

    function displayFirstQuestion() {

        if (questions.length === 0) {

            questionTextElement.textContent =
                "No quiz questions available.";

            answerContainer.innerHTML = "";
            totalQuestionsElement.textContent =
            getQuestionCount();
            currentQuestionElement.textContent = "0";
            progressBar.value = 0;
            previousButton.disabled = true;
            nextButton.disabled = true;
            finishButton.disabled = true;

            return;

        }

        totalQuestionsElement.textContent = questions.length;

        currentQuestionElement.textContent = "1";

        currentScoreElement.textContent = "—";

        progressBar.value = 0;

       goToQuestion(0);

    }


    // =====================================
    // INITIALIZE QUIZ
    // =====================================

    function initializeQuiz() {

    // =====================================
    // READ URL PARAMETERS
    // =====================================

        const params = new URLSearchParams(window.location.search);

        currentSubject = params.get("subject") || "";
        currentTopic = params.get("topic") || "";


        // =====================================
        // LOAD QUIZ
        // =====================================

        loadQuestions();

        resetTimer();

        hideQuizInterface();

    }

    // =====================================
    // PART 2 — QUESTION ENGINE
    // =====================================

    // =====================================
    // RENDER CURRENT QUESTION
    // =====================================

    function renderQuestion() {
        if (!questions.length) return;
        const question = questions[currentQuestionIndex];
        console.log("QUESTION OBJECT:", question);
        console.log("QUESTION.ANSWERS:", question.answers);
        resetAnswerState();
        selectedAnswer = studentAnswers[currentQuestionIndex];
        questionTextElement.textContent = question.question;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        answerContainer.innerHTML = "";
        renderAnswers(question.answers);
        highlightSelectedAnswer();

    }

    // =====================================
    // RENDER ANSWERS
    // =====================================

    function renderAnswers(answers) {

        answerContainer.innerHTML = "";

        const letters = ["A", "B", "C", "D"];

        answers.forEach((answer, index) => {

            const option = document.createElement("label");

            option.className = "answer-option";

            option.innerHTML = `

                <input
                    type="radio"
                    name="quizAnswer"
                    value="${index}">

                <span class="option-letter">

                    ${letters[index]}.

                </span>

                <span class="option-text">

                    ${answer}

                </span>

            `;

            option.addEventListener("click", () => {

                selectAnswer(index);

            });

            answerContainer.appendChild(option);

        });

    }

    // =====================================
    // SELECT ANSWER
    // =====================================

    function selectAnswer(index) {

        selectedAnswer = index;

        studentAnswers[currentQuestionIndex] = index;

        highlightSelectedAnswer();

        buildQuestionNavigator();

        updateExamSummary();

        // =====================================
        // ALL QUESTIONS ANSWERED
        // =====================================

        const answeredCount =
        studentAnswers.filter(answer => answer !== null).length;

        if (answeredCount === questions.length) {

            // All questions answered.
            // Keep Finish Quiz unchanged.

        }
    }

    // =====================================
    // HIGHLIGHT SELECTED ANSWER
    // =====================================

    function highlightSelectedAnswer() {

        const options =

            answerContainer.querySelectorAll(".answer-option");

        options.forEach(option => {

            option.classList.remove("selected");

        });

        const radio =

            answerContainer.querySelector(

                `input[value="${selectedAnswer}"]`

            );

        if (radio) {

            radio.checked = true;

            radio.closest(".answer-option")

                .classList.add("selected");

        }

    }

    // =====================================
    // PART 3 — QUIZ LOGIC
    // =====================================

    // =====================================
    // SUBMIT ANSWER
    // =====================================


    // =====================================
    // RESET ANSWER STATE
    // =====================================

    function resetAnswerState() {

        answerSubmitted = false;
        feedbackElement.style.display = "none";
        feedbackElement.innerHTML = "";

    }


    // =====================================
    // PART 4 — NAVIGATION
    // =====================================

    // =====================================
    // UPDATE QUESTION COUNTER
    // =====================================

    function updateQuestionCounter() {

        currentQuestionElement.textContent =
            currentQuestionIndex + 1;

        totalQuestionsElement.textContent =
            getQuestionCount();

    }

    // =====================================
    // UPDATE PROGRESS BAR
    // =====================================

    function updateProgressBar() {

        if (questions.length === 0) {

            progressBar.value = 0;

            return;

        }

        const progress =

            ((currentQuestionIndex + 1) /

            getQuestionCount()) * 100;

        progressBar.value = progress;

    }

    // =====================================
    // UPDATE NAVIGATION BUTTONS
    // =====================================

    function updateNavigationButtons() {

        previousButton.disabled =
            currentQuestionIndex === 0;

        nextButton.disabled =
            currentQuestionIndex ===
            getQuestionCount() - 1;

    }

    // =====================================
    // GO TO QUESTION
    // =====================================

    function goToQuestion(index) {

        if (index < 0) return;

        if (index >= questions.length) return;

        currentQuestionIndex = index;

        renderQuestion();

        updateQuestionCounter();

        updateProgressBar();

        updateNavigationButtons();
        buildQuestionNavigator();
        updateExamSummary();

    }

    // =====================================
    // PREVIOUS QUESTION
    // =====================================

    function previousQuestion() {

        if (currentQuestionIndex > 0) {

            goToQuestion(currentQuestionIndex - 1);

        }

    }

    // =====================================
    // NEXT QUESTION
    // =====================================

    function nextQuestion() {

        if (currentQuestionIndex < getQuestionCount() - 1) {

            goToQuestion(currentQuestionIndex + 1);

        }

    }

    // =====================================
    // BUTTON EVENTS
    // =====================================

    previousButton.addEventListener(

        "click",

        previousQuestion

    );

    nextButton.addEventListener(

        "click",

        nextQuestion

    );

    // =====================================
    // PART 5 — TIMER
    // =====================================

    // =====================================
    // TIMER SETTINGS
    // =====================================

    // false = Stopwatch
    // true  = Countdown

    const useCountdown = false;

    // Countdown duration (seconds)

    const countdownDuration = 10 * 60;

    let remainingSeconds = countdownDuration;

    // =====================================
    // FORMAT TIME
    // =====================================

    function formatTime(seconds) {

        const minutes = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    }

    // =====================================
    // UPDATE TIMER DISPLAY
    // =====================================

    function updateTimerDisplay() {

        updateExamSummary();

        if (useCountdown) {

            timerElement.textContent =
                formatTime(remainingSeconds);

        }

        else {

            timerElement.textContent =
                formatTime(elapsedSeconds);

        }

    }


    // =====================================
    // START TIMER
    // =====================================

    function startTimer() {

        stopTimer();

        timerInterval = setInterval(() => {

            if (useCountdown) {

                remainingSeconds--;

                updateTimerDisplay();

                // Time expired

                if (remainingSeconds <= 0) {

                    stopTimer();

                    timerElement.textContent = "00:00";

                    finishQuiz();

                }

            }

            else {

                elapsedSeconds++;

                updateTimerDisplay();

            }

        }, 1000);

    }

    // =====================================
    // STOP TIMER
    // =====================================

    function stopTimer() {

        if (timerInterval) {

            clearInterval(timerInterval);

            timerInterval = null;

        }

    }

    // =====================================
    // RESET TIMER
    // =====================================

    function resetTimer() {

        elapsedSeconds = 0;

        remainingSeconds = countdownDuration;

        updateTimerDisplay();

    }

    // =====================================
    // GET FORMATTED TIME
    // =====================================

    function getFormattedTime() {

        if (useCountdown) {

            return formatTime(

                countdownDuration - remainingSeconds

            );

        }

        return formatTime(elapsedSeconds);

    }

    // =====================================
    // CLEANUP
    // =====================================

    window.addEventListener(

        "beforeunload",

        stopTimer

    );

    // =====================================
    // QUIZ VISIBILITY
    // =====================================

    function hideQuizInterface() {

        quizStatus.style.display = "none";
        progressSection.style.display = "none";
        questionSection.style.display = "none";
        answerSection.style.display = "none";
        feedbackSection.style.display = "none";
        navigationSection.style.display = "none";
        finishSection.style.display = "none";

    }

    function showQuizInterface() {

        quizStatus.style.display = "";
        progressSection.style.display = "";
        questionSection.style.display = "";
        answerSection.style.display = "";
        feedbackSection.style.display = "";
        navigationSection.style.display = "";
        finishSection.style.display = "";

    }

    // =====================================
    // START QUIZ
    // =====================================

    function startQuiz() {

        startQuizButton.style.display = "none";
        showQuizInterface();
        //submitButton.disabled = false;
        previousButton.disabled = false;
        nextButton.disabled = false;
        finishButton.disabled = false;
        previousButton.style.display = "inline-block";
        nextButton.style.display = "inline-block";
        finishButton.style.display = "inline-block";
        navigatorSection.style.display = "block";
        navigationSection.style.display = "flex";
        examSummarySection.style.display = "grid";
        endSession.style.display = "none";
        finishButton.textContent = "Finish Quiz";
        finishButton.classList.remove("ready-to-submit");
        feedbackElement.style.display = "none";
        feedbackElement.innerHTML = "";
        currentQuestionIndex = 0;
        score = 0;
        currentScoreElement.textContent = "—";
        currentScoreElement.textContent = "Pending";
        studentAnswers = new Array(questions.length).fill(null);
        selectedAnswer = null;
        previousButton.style.display = "inline-block";
        nextButton.style.display = "inline-block";
        endSession.style.display = "none";
        finishButton.textContent = "Finish Quiz";
        finishButton.classList.remove("ready-to-submit");
        
        resetTimer();
        startTimer();
        displayFirstQuestion();
        updateExamSummary();

    }

    function buildQuestionNavigator() {

        questionNavigator.innerHTML = "";

        questions.forEach((question, index) => {

            const item = document.createElement("div");

            item.className = "question-number";

            item.textContent = index + 1;

            // -----------------------------
            // Answered / Unanswered
            // -----------------------------

            if (studentAnswers[index] !== null) {

                item.classList.add("answered");

            } else {

                item.classList.add("unanswered");

            }

            // -----------------------------
            // Current Question
            // -----------------------------

            if (index === currentQuestionIndex) {

                item.classList.add("current");

            }

            item.addEventListener("click", () => {

                goToQuestion(index);

            });

            questionNavigator.appendChild(item);

        });

    }

    function showReviewScreen(){

        let answered=0;

        let unanswered=[];

        studentAnswers.forEach((answer,index)=>{

            if(answer===null){

                unanswered.push(index);

            }

            else{

                answered++;

            }

        });

        reviewSummary.innerHTML=`

            <div class="review-summary">

                <p><strong>Total Questions:</strong> ${questions.length}</p>

                <p><strong>Answered:</strong> ${answered}</p>

                <p><strong>Unanswered:</strong> ${unanswered.length}</p>

                <p><strong>Time:</strong> ${getFormattedTime()}</p>

            </div>

        `;

        unansweredQuestions.innerHTML="";

        if(unanswered.length){

            const title=document.createElement("h3");

            title.textContent="Unanswered Questions";

            unansweredQuestions.appendChild(title);

            const list=document.createElement("div");

            list.className="unanswered-list";

            unanswered.forEach(index=>{

                const box=document.createElement("div");

                box.className="review-question";

                box.textContent=index+1;

                box.addEventListener("click",()=>{

                    reviewModal.style.display="none";

                    goToQuestion(index);

                });

                list.appendChild(box);

            });

            unansweredQuestions.appendChild(list);

        }

        reviewModal.style.display="flex";

    }

    function updateExamSummary() {

        const answered =
            studentAnswers.filter(answer => answer !== null).length;

        const remaining =
            questions.length - answered;

        summaryTotal.textContent = questions.length;

        summaryAnswered.textContent = answered;

        if (remaining === 0) {
            summaryRemainingLabel.textContent = "Status";
            summaryRemaining.textContent = "Ready to Submit ✓";
            summaryRemaining.classList.add("summary-complete");
        }
        else{

            summaryRemainingLabel.textContent = "Remaining";
            summaryRemaining.textContent = remaining;
            summaryRemaining.classList.remove("summary-complete");

        }

        summaryCurrent.textContent =
            `${currentQuestionIndex + 1} / ${questions.length}`;

        summaryTime.textContent =
            getFormattedTime();

    }

    // =====================================
    // FINAL MARKING ENGINE
    // =====================================

    function calculateFinalScore() {

        let totalCorrect = 0;
        questions.forEach((question, index) => {
            if (studentAnswers[index] === question.correct) {

                totalCorrect++;
            }
        });
        return totalCorrect;

    }

    // =====================================
    // ANSWER REVIEW
    // =====================================

    function buildAnswerReview() {

        let html = "";

        questions.forEach((question, index) => {

            const student = studentAnswers[index];

            const correct = question.correct;

            const studentText =

                student === null

                ? "No Answer"

                : question.answers[student];

            const correctText =

                question.answers[correct];

            html += `

                <tr>

                    <td>${index + 1}</td>

                    <td>${studentText}</td>

                    <td>${correctText}</td>

                    <td>

                        ${student === correct ? "✅" : "❌"}

                    </td>

                </tr>

            `;

        });

        return `

            <table class="review-table">

                <thead>

                    <tr>

                        <th>Q</th>

                        <th>Your Answer</th>

                        <th>Correct</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${html}

                </tbody>

            </table>

        `;

    }

    // =====================================
    // PART 6 — FINISH QUIZ
    // =====================================

    function finishQuiz() {

            // ---------------------------------
            // Stop Timer
            // ---------------------------------

            stopTimer();

            // Recalculate the final score from all answers
            score = calculateFinalScore();
            
            // Update the score card
            currentScoreElement.textContent = score;

            const totalQuestions = questions.length;

            const percentage = totalQuestions === 0

                ? 0

                : Math.round((score / totalQuestions) * 100);

            const passed = percentage >= 50;

            // ---------------------------------
            // Quiz Result Object
            // ---------------------------------

            const result = {

                subject: currentSubject,

                topic: currentTopic,

                score: score,

                totalQuestions: totalQuestions,

                percentage: percentage,

                passed: passed,

                timeTaken: getFormattedTime(),

                completedAt: new Date().toISOString()

            };

            // ---------------------------------
            // Save Last Quiz
            // ---------------------------------

            localStorage.setItem(

                "nexaLastQuiz",

                JSON.stringify(result)

            );

            // ---------------------------------
            // Save Quiz History
            // ---------------------------------

            let history = JSON.parse(

                localStorage.getItem("nexaQuizHistory")

            ) || [];

            history.push(result);

            localStorage.setItem(

                "nexaQuizHistory",

                JSON.stringify(history)

            );

            // ---------------------------------
            // Update Dashboard Statistics
            // ---------------------------------

            let dashboard = JSON.parse(

                localStorage.getItem("nexaDashboard")

            ) || {

                quizzesTaken: 0,

                quizzesPassed: 0,

                totalScore: 0,

                totalQuestions: 0,

                averageScore: 0

            };

            dashboard.quizzesTaken++;

            if (passed) {

                dashboard.quizzesPassed++;

            }

            dashboard.totalScore += score;

            dashboard.totalQuestions += totalQuestions;

            dashboard.averageScore =

                dashboard.totalQuestions === 0

                ? 0

                : Math.round(

                    (dashboard.totalScore /

                    dashboard.totalQuestions) * 100

                );

            localStorage.setItem(

                "nexaDashboard",

                JSON.stringify(dashboard)

            );

            // ---------------------------------
            // Award Certificate (Pass Only)
            // ---------------------------------

            if (passed) {

                let certificates = JSON.parse(

                    localStorage.getItem(

                        "nexaCertificates"

                    )

                ) || [];

                certificates.push({

                    subject: currentSubject,

                    topic: currentTopic,

                    percentage: percentage,

                    completedAt: new Date().toISOString()

                });

                localStorage.setItem(

                    "nexaCertificates",

                    JSON.stringify(certificates)

                );

            }

            // ---------------------------------
            // Disable Quiz Controls
            // ---------------------------------

            //submitButton.disabled = true;

            previousButton.disabled = true;

            nextButton.disabled = true;

            finishButton.disabled = true;

            answerContainer

                .querySelectorAll(".answer-btn")

                .forEach(button => {

                    button.disabled = true;

                });

            // ---------------------------------
            // Show Final Result
            // ---------------------------------

            feedbackElement.className =

                passed

                ? "feedback success"

                : "feedback error";

            feedbackElement.innerHTML = `

                <h3>

                    ${passed

                        ? "🎉 Congratulations!"

                        : "Quiz Completed"}

                </h3>

                <p>

                    <strong>Final Score:</strong>

                    ${score} / ${totalQuestions}

                </p>

                <p>

                    <strong>Percentage:</strong>

                    ${percentage}%

                </p>

                <p>

                    <strong>Result:</strong>

                    ${passed

                        ? "PASS ✅"

                        : "FAIL ❌"}

                </p>

                <p>

                    <strong>Time:</strong>

                    ${getFormattedTime()}

                </p>

                <hr>

                <h3>Answer Review</h3>

                ${buildAnswerReview()}

            `;

            // =====================================
            // FINAL PAGE
            // =====================================

            previousButton.style.display = "none";
            nextButton.style.display = "none";
            finishButton.style.display = "none";
            navigatorSection.style.display = "none";
            navigationSection.style.display = "none";
            examSummarySection.style.display = "none";
            endSession.style.display = "inline-block";
            feedbackElement.style.display = "block";

        }

    // =====================================
    // FINISH BUTTON
    // =====================================

    finishButton.addEventListener(

        "click",
        showReviewScreen

    );

    if (returnQuiz) {

        returnQuiz.addEventListener("click", () => {

            reviewModal.style.display = "none";

        });

    }

    if (submitFinalQuiz) {

        submitFinalQuiz.addEventListener("click", () => {

            reviewModal.style.display = "none";

            finishQuiz();

        });

    }

    // =====================================
    // START QUIZ BUTTON
    // =====================================

    startQuizButton.addEventListener(

        "click",

        startQuiz

    );

    endSession.addEventListener("click", () => {

        window.location.href = "topics.html";

    });

    initializeQuiz();

});