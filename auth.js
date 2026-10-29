// =====================================
// NEXA AUTHENTICATION
// auth.js
// =====================================

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();
    initializeRegister();
    initializeForgotPassword();
    initializeResetPassword();

});

// =====================================
// LOGIN
// =====================================

function initializeLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!email || !password) {

            alert("Please fill in all fields.");

            return;

        }

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            // Save student information

            localStorage.setItem(

                "student",

                JSON.stringify(response.user)

            );

            // The authentication cookie has already
            // been stored by the browser because
            // the API helper uses
            // credentials: "include".

            window.location.href = "dashboard.html";

        }

        catch (err) {

            alert(
                err.message ||
                "Unable to login."
            );

        }

    });

}

// =====================================
// REGISTER
// =====================================

function initializeRegister() {

    const form =
        document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            alert("Please complete every field.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

            await api.post("/auth/register", {

                 firstName,
                lastName,
                email,
                password,
                phone

            });

            alert(
                "Registration successful."
            );

            window.location.href =
                "login.html";

        }

        catch (err) {

            alert(
                err.message ||
                "Registration failed."
            );

        }

    });

}

// =====================================
// FORGOT PASSWORD
// =====================================

function initializeForgotPassword() {

    const form =
        document.getElementById("forgotPasswordForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        if (!email) {

            alert("Enter your email.");

            return;

        }

        try {

            await api.post("/auth/forgot-password", {

                email

            });

            alert(
                "Password reset link sent."
            );

        }

        catch (err) {

            alert(
                err.message ||
                "Unable to send reset link."
            );

        }

    });

}

// =====================================
// RESET PASSWORD
// =====================================

function initializeResetPassword() {

    const form =
        document.getElementById("resetPasswordForm");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!password || !confirmPassword) {

            alert("Complete every field.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        const params =
            new URLSearchParams(window.location.search);

        const token =
            params.get("token");

        try {

            await api.post("/auth/reset-password", {

                token,
                password

            });

            alert(
                "Password successfully changed."
            );

            window.location.href =
                "login.html";

        }

        catch (err) {

            alert(
                err.message ||
                "Password reset failed."
            );

        }

    });

}

// =====================================
// LOGOUT
// =====================================

async function logout() {

    try {

        await api.post(

            "/auth/logout",

            {}

        );

    }

    catch (error) {

        console.error(error);

    }

    localStorage.removeItem(

        "student"

    );

    window.location.href =

        "login.html";

}

// =====================================
// AUTH GUARD
// =====================================

async function requireLogin() {

    try {

        await api.get(

            "/users/me"

        );

    }

    catch (error) {

        window.location.href =

            "login.html";

    }

}

