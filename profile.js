// =====================================
// PROFILE.JS
// NEXA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // API BASE URL
    // =====================================

    const API = "http://127.0.0.1:5000/api";

    // =====================================
    // DOM ELEMENTS
    // =====================================

    // Profile Card

    const profilePhoto =
        document.getElementById("profilePhoto");

    const uploadPhotoBtn =
        document.getElementById("uploadPhotoBtn");

    const studentName =
        document.getElementById("studentName");

    const studentEmail =
        document.getElementById("studentEmail");

    // Personal Information

    const profileForm =
        document.getElementById("profileForm");

    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const country =
        document.getElementById("country");

    // Password

    const passwordForm =
        document.getElementById("passwordForm");

    const currentPassword =
        document.getElementById("currentPassword");

    const newPassword =
        document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    // Dashboard Statistics

    const questionsSolved =
        document.getElementById("questionsSolved");

    const accuracy =
        document.getElementById("accuracy");

    const streak =
        document.getElementById("streak");

    const certificates =
        document.getElementById("certificates");

    // Subscription

    const planName =
        document.getElementById("planName");

    const renewalDate =
        document.getElementById("renewalDate");

    // Account

    const logoutBtn =
        document.getElementById("logoutBtn");

    const deleteAccountBtn =
        document.getElementById("deleteAccountBtn");

    // =====================================
    // API HELPER
    // =====================================

    /**
     * Generic helper for calling the backend.
     */

    async function apiRequest(

        endpoint,

        options = {}

    ) {

        try {

            const response = await fetch(

                API + endpoint,

                {

                    credentials: "include",

                    headers: {

                        "Content-Type": "application/json",

                        ...(options.headers || {})

                    },

                    ...options

                }

            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(

                    data.message ||

                    "Request failed."

                );

            }

            return data;

        }

        catch (error) {

            console.error(error);

            alert(error.message);

            return null;

        }

    }

    // =====================================
    // LOAD USER PROFILE
    // =====================================

    async function loadProfile() {

        const data = await apiRequest(

            "/users/me"

        );

        if (!data) return;

        const user = data.user;
        
        // ===============================
        // HEADER
        // ===============================

        studentName.textContent =
            `${user.firstName} ${user.lastName}`;

        studentEmail.textContent =
            user.email;

        // ===============================
        // FORM
        // ===============================

        fullName.value =
            `${user.firstName} ${user.lastName}`;

        email.value =
            user.email;

        phone.value =
            user.phone || "";

        country.value =
            user.country || "";

        // ===============================
        // PROFILE PHOTO
        // ===============================

        if (user.profilePhoto && user.profilePhoto.length > 0) {

            profilePhoto.src =
                user.profilePhoto + "?t=" + Date.now();

        } else {

            profilePhoto.src =
                "assets/images/default-avatar.png";

        }

        // ===============================
        // SUBSCRIPTION
        // ===============================

        if (user.subscription) {

            planName.textContent =
                user.subscription.plan || "Free";

            renewalDate.textContent =
                user.subscription.renewalDate ||

                "—";

        }

    }

    // =====================================
    // LOAD DASHBOARD STATISTICS
    // =====================================

    async function loadDashboard() {

        const data = await apiRequest(

            "/users/dashboard"

        );

        if (!data) return;

        const dashboard = data.dashboard;

        // ===============================
        // LEARNING STATISTICS
        // ===============================

        questionsSolved.textContent =
            dashboard.questionsSolved ?? 0;

        accuracy.textContent =
            dashboard.accuracy ?? "0%";

        streak.textContent =
            dashboard.learningStreak ?? "0 Days";

        certificates.textContent =
            dashboard.certificatesEarned ?? 0;

        // ===============================
        // SUBSCRIPTION
        // ===============================

        if (dashboard.subscription) {

            planName.textContent =
                dashboard.subscription.plan || "Free";

            renewalDate.textContent =
                dashboard.subscription.renewalDate || "—";

        }

    }

    // =====================================
    // UPDATE PROFILE
    // =====================================

    profileForm.addEventListener(

        "submit",

        async function (e) {

            e.preventDefault();

            // ===============================
            // SPLIT FULL NAME
            // ===============================

            const name =

                fullName.value.trim();

            if (!name) {

                alert(

                    "Please enter your full name."

                );

                return;

            }

            const parts =

                name.split(/\s+/);

            const firstName =

                parts.shift();

            const lastName =

                parts.join(" ");

            // ===============================
            // SEND TO API
            // ===============================

            const data = await apiRequest(

                "/users/me",

                {

                    method: "PUT",

                    body: JSON.stringify({

                        firstName,

                        lastName,

                        phone: phone.value.trim(),

                        country: country.value.trim()

                    })

                }

            );

            if (!data) return;

            alert(

                data.message ||

                "Profile updated successfully."

            );

            // ===============================
            // REFRESH PROFILE
            // ===============================

            await loadProfile();

        }

    );

    // =====================================
    // POPULATE PAGE
    // =====================================

    async function initializeProfile() {

        await loadProfile();

        await loadDashboard();

    }

    initializeProfile();

    // =====================================
    // PROFILE PHOTO
    // =====================================

    uploadPhotoBtn.addEventListener(

        "click",

        function () {

            const fileInput =

                document.createElement("input");

            fileInput.type = "file";

            fileInput.accept = "image/*";

            fileInput.click();

            fileInput.addEventListener(

                "change",

                async function () {

                    const file =

                        fileInput.files[0];

                    if (!file) {

                        return;

                    }

                    // ===============================
                    // IMAGE PREVIEW
                    // ===============================

                    const reader =

                        new FileReader();

                    reader.onload = function (event) {

                        profilePhoto.src =

                            event.target.result;

                    };

                    reader.readAsDataURL(file);

                    // ===============================
                    // PREPARE FORM DATA
                    // ===============================

                    const formData =

                        new FormData();

                    formData.append(

                        "profilePhoto",

                        file

                    );

                    try {

                        const response = await fetch(

                            API + "/users/profile-photo",

                            {

                                method: "POST",

                                credentials: "include",

                                body: formData

                            }

                        );

                        const data =

                            await response.json();

                        if (!response.ok) {

                            throw new Error(

                                data.message ||

                                "Unable to upload photo."

                            );

                        }

                        alert(

                            data.message ||

                            "Profile photo uploaded successfully."

                        );

                        await loadProfile();

                    }

                    catch (error) {

                        console.error(error);

                        alert(error.message);

                    }

                }

            );

        }

    );

    // =====================================
    // DELETE PROFILE PHOTO
    // =====================================

    async function deleteProfilePhoto() {

        const confirmed = confirm(

            "Remove your profile photo?"

        );

        if (!confirmed) {

            return;

        }

        const data = await apiRequest(

            "/users/profile-photo",

            {

                method: "DELETE"

            }

        );

        if (!data) {

            return;

        }

        profilePhoto.src =

            "assets/images/default-avatar.png";

        alert(

            data.message ||

            "Profile photo removed."

        );

        await loadProfile();

    }

    // =====================================
    // OPTIONAL:
    // DOUBLE-CLICK PHOTO TO REMOVE
    // =====================================

    profilePhoto.addEventListener(

        "dblclick",

        deleteProfilePhoto

    );

        // =====================================
    // CHANGE PASSWORD
    // =====================================

    passwordForm.addEventListener(

        "submit",

        async function (e) {

            e.preventDefault();

            // ===============================
            // VALIDATION
            // ===============================

            if (

                newPassword.value !==

                confirmPassword.value

            ) {

                alert(

                    "New passwords do not match."

                );

                return;

            }

            if (

                newPassword.value.length < 6

            ) {

                alert(

                    "Password must be at least 6 characters."

                );

                return;

            }

            // ===============================
            // SEND TO BACKEND
            // ===============================

            const data = await apiRequest(

                "/auth/change-password",

                {

                    method: "PUT",

                    body: JSON.stringify({

                        currentPassword:

                            currentPassword.value,

                        newPassword:

                            newPassword.value

                    })

                }

            );

            if (!data) {

                return;

            }

            alert(

                data.message ||

                "Password changed successfully."

            );

            // ===============================
            // RESET FORM
            // ===============================

            passwordForm.reset();

            // ===============================
            // FORCE RE-LOGIN
            // ===============================

            window.location.href =

                "login.html";

        }

    );

    // =====================================
    // LOGOUT
    // =====================================

    logoutBtn.addEventListener(

        "click",

        async function () {

            const confirmed = confirm(

                "Logout from your account?"

            );

            if (!confirmed) {

                return;

            }

            const data = await apiRequest(

                "/auth/logout",

                {

                    method: "POST"

                }

            );

            if (!data) {

                return;

            }

            alert(

                data.message ||

                "Logged out successfully."

            );

            window.location.href =

                "login.html";

        }

    );

    // =====================================
    // DELETE ACCOUNT
    // =====================================

    deleteAccountBtn.addEventListener(

        "click",

        async function () {

            const confirmed = confirm(

                "This will permanently delete your account.\n\nContinue?"

            );

            if (!confirmed) {

                return;

            }

            const secondConfirmation = confirm(

                "This action cannot be undone.\n\nDelete account?"

            );

            if (!secondConfirmation) {

                return;

            }

            const data = await apiRequest(

                "/users/me",

                {

                    method: "DELETE"

                }

            );

            if (!data) {

                return;

            }

            alert(

                data.message ||

                "Account deleted successfully."

            );

            window.location.href =

                "index.html";

        }

    );

        // =====================================
    // HELPER FUNCTIONS
    // =====================================

    /**
     * Enable or disable a button.
     */

    function setButtonLoading(

        button,

        loading,

        loadingText = "Please wait..."

    ) {

        if (!button) return;

        if (loading) {

            button.dataset.originalText =

                button.innerHTML;

            button.disabled = true;

            button.innerHTML = loadingText;

        }

        else {

            button.disabled = false;

            button.innerHTML =

                button.dataset.originalText ||

                button.innerHTML;

        }

    }

    /**
     * Display a default value.
     */

    function displayValue(

        value,

        fallback = "—"

    ) {

        if (

            value === null ||

            value === undefined ||

            value === ""

        ) {

            return fallback;

        }

        return value;

    }

    /**
     * Format ISO dates.
     */

    function formatDate(date) {

        if (!date) {

            return "—";

        }

        return new Date(date)

            .toLocaleDateString();

    }

    /**
     * Build full name safely.
     */

    function getFullName(user) {

        return [

            user.firstName,

            user.lastName

        ]

            .filter(Boolean)

            .join(" ")

            .trim();

    }

    /**
     * Split full name.
     */

    function splitFullName(name) {

        const parts =

            name.trim()

                .split(/\s+/);

        return {

            firstName:

                parts.shift() || "",

            lastName:

                parts.join(" ")

        };

    }

    /**
     * Reset password form.
     */

    function clearPasswordFields() {

        passwordForm.reset();

    }

    /**
     * Reset profile photo.
     */

    function resetProfilePhoto() {

        profilePhoto.src =

            "assets/images/default-avatar.png";

    }

    // =====================================
    // FINAL PAGE POLISH
    // =====================================

    // Prevent editing email.
    // Email changes should happen through
    // a dedicated verification flow.

    email.readOnly = true;

    // Browser autocomplete.

    fullName.autocomplete = "name";

    email.autocomplete = "email";

    phone.autocomplete = "tel";

    country.autocomplete = "country-name";

    currentPassword.autocomplete =

        "current-password";

    newPassword.autocomplete =

        "new-password";

    confirmPassword.autocomplete =

        "new-password";

    // =====================================
    // GLOBAL ERROR HANDLER
    // =====================================

    window.addEventListener(

        "unhandledrejection",

        function (event) {

            console.error(

                "Unhandled Promise:",

                event.reason

            );

        }

    );

    // =====================================
    // PROFILE PAGE READY
    // =====================================

    console.log(

        "NEXA Profile loaded successfully."

    );

});