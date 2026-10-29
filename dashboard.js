// =====================================
// NEXA Dashboard
// dashboard.js
// Part 1 - Core Dashboard
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const studentName = document.getElementById("studentName");

    const questionsSolved = document.getElementById("questionsSolved");

    const accuracy = document.getElementById("accuracy");

    const streak = document.getElementById("streak");

    const certificateCount = document.getElementById("certificateCount");

    const pemdasProgress = document.getElementById("pemdasProgress");
    const pemdasPercent = document.getElementById("pemdasPercent");

    const algebraProgress = document.getElementById("algebraProgress");
    const algebraPercent = document.getElementById("algebraPercent");

    const algebra2Progress = document.getElementById("algebra2Progress");
    const algebra2Percent = document.getElementById("algebra2Percent");

    const statisticsProgress = document.getElementById("statisticsProgress");
    const statisticsPercent = document.getElementById("statisticsPercent");

    const calculusProgress = document.getElementById("calculusProgress");
    const calculusPercent = document.getElementById("calculusPercent");

    const subscriptionPlan = document.getElementById("subscriptionPlan");

    const subscriptionStatus = document.getElementById("subscriptionStatus");

    const recentActivity = document.getElementById("recentActivity");

    const logoutBtn = document.getElementById("logoutBtn");

    // =====================================
    // LOAD USER INFORMATION
    // =====================================

    function loadUser() {

        const name =

            localStorage.getItem("nexaName") ||

            "Student";

        if (studentName) {

            studentName.textContent = name;

        }

    }

    // =====================================
    // LOAD DASHBOARD STATISTICS
    // =====================================

    function loadStatistics() {

        if (questionsSolved) {

            questionsSolved.textContent =

                localStorage.getItem("questionsSolved") ||

                "0";

        }

        if (accuracy) {

            accuracy.textContent =

                localStorage.getItem("accuracy") ||

                "0%";

        }

        if (streak) {

            streak.textContent =

                localStorage.getItem("streak") ||

                "0 Days";

        }

        if (certificateCount) {

            certificateCount.textContent =

                localStorage.getItem("certificateCount") ||

                "0";

        }

    }

    // =====================================
    // LOAD SUBJECT PROGRESS
    // =====================================

    function loadProgress() {

        const subjects = [

            "pemdas",

            "algebra",

            "algebra2",

            "statistics",

            "calculus"

        ];

        subjects.forEach(subject => {

            const value = Number(

                localStorage.getItem(subject + "Progress")

            ) || 0;

            const progressBar =

                document.getElementById(subject + "Progress");

            const progressText =

                document.getElementById(subject + "Percent");

            if (progressBar) {

                progressBar.value = value;

            }

            if (progressText) {

                progressText.textContent =

                    value + "%";

            }

        });

    }

    // =====================================
    // LOAD SUBSCRIPTION
    // =====================================

    function loadSubscription() {

        if (subscriptionPlan) {

            subscriptionPlan.textContent =

                localStorage.getItem("subscriptionPlan") ||

                "Free";

        }

        if (subscriptionStatus) {

            subscriptionStatus.textContent =

                localStorage.getItem("subscriptionStatus") ||

                "Active";

        }

    }

    // =====================================
    // INITIALIZE DASHBOARD
    // =====================================

    function initializeDashboard() {

        loadUser();

        loadStatistics();

        loadProgress();

        loadSubscription();

    }

    initializeDashboard();

        // =====================================
    // LOAD RECENT ACTIVITY
    // =====================================

    function loadRecentActivity() {

        if (!recentActivity) return;

        const activities = JSON.parse(

            localStorage.getItem("recentActivity")

        ) || [];

        recentActivity.innerHTML = "";

        if (activities.length === 0) {

            recentActivity.innerHTML =

                "<li>No activity yet.</li>";

            return;

        }

        activities.forEach(activity => {

            const li = document.createElement("li");

            li.textContent = activity;

            recentActivity.appendChild(li);

        });

    }

    // =====================================
    // ADD RECENT ACTIVITY
    // =====================================

    function addRecentActivity(activity) {

        let activities = JSON.parse(

            localStorage.getItem("recentActivity")

        ) || [];

        activities.unshift(activity);

        if (activities.length > 10) {

            activities.pop();

        }

        localStorage.setItem(

            "recentActivity",

            JSON.stringify(activities)

        );

    }

    // =====================================
    // UPDATE SUBJECT PROGRESS
    // =====================================

    function updateSubjectProgress(

        subject,

        value

    ) {

        value = Math.max(

            0,

            Math.min(100, value)

        );

        localStorage.setItem(

            subject + "Progress",

            value

        );

        loadProgress();

    }

    // =====================================
    // UPDATE DASHBOARD STATISTICS
    // =====================================

    function updateStatistics(data = {}) {

        if (data.questionsSolved !== undefined) {

            localStorage.setItem(

                "questionsSolved",

                data.questionsSolved

            );

        }

        if (data.accuracy !== undefined) {

            localStorage.setItem(

                "accuracy",

                data.accuracy

            );

        }

        if (data.streak !== undefined) {

            localStorage.setItem(

                "streak",

                data.streak

            );

        }

        if (data.certificateCount !== undefined) {

            localStorage.setItem(

                "certificateCount",

                data.certificateCount

            );

        }

        loadStatistics();

    }

    // =====================================
    // LOGOUT
    // =====================================

    function logout() {

        const confirmed = confirm(

            "Are you sure you want to logout?"

        );

        if (!confirmed) return;

        localStorage.removeItem("nexaToken");

        window.location.href = "login.html";

    }

    // =====================================
    // EVENT LISTENERS
    // =====================================

    if (logoutBtn) {

        logoutBtn.addEventListener(

            "click",

            logout

        );

    }

    // =====================================
    // MAKE FUNCTIONS AVAILABLE
    // =====================================

    window.dashboard = {

        updateStatistics,

        updateSubjectProgress,

        addRecentActivity,

        loadRecentActivity,

        initializeDashboard

    };

    // =====================================
    // LOAD RECENT ACTIVITY
    // =====================================

    loadRecentActivity();

});