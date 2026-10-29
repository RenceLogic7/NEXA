// =====================================
// NEXA EMAIL VERIFICATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const statusBox = document.getElementById("status");

    // =====================================
    // GET TOKEN FROM URL
    // Example:
    // verify-email.html?token=abcdef123456
    // =====================================

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {

        statusBox.className = "error";

        statusBox.innerHTML = `
            ❌ Invalid verification link.
            <br><br>
            Verification token was not found.
        `;

        return;

    }

    verifyEmail(token);

});

// =====================================
// VERIFY EMAIL
// =====================================

async function verifyEmail(token) {

    const statusBox = document.getElementById("status");

    try {

        statusBox.className = "loading";

        statusBox.innerHTML = `
            ⏳ Verifying your email...
        `;

        const response = await fetch(

            `http://localhost:5000/api/auth/verify/${token}`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );

        const data = await response.json();

        // =====================================
        // SUCCESS
        // =====================================

        if (response.ok && data.success) {

            statusBox.className = "success";

            statusBox.innerHTML = `
                <h2>✅ Email Verified</h2>

                <p>
                    Your NEXA account has been verified successfully.
                </p>

                <p>
                    Redirecting you to the Login page...
                </p>
            `;

            setTimeout(() => {

                window.location.href = "login.html";

            }, 3000);

        }

        // =====================================
        // FAILED
        // =====================================

        else {

            statusBox.className = "error";

            statusBox.innerHTML = `
                <h2>❌ Verification Failed</h2>

                <p>${data.message || "Verification failed."}</p>

                <p>
                    Please request another verification email.
                </p>
            `;

        }

    }

    catch (error) {

        console.error("Verification Error:", error);

        statusBox.className = "error";

        statusBox.innerHTML = `
            <h2>❌ Server Error</h2>

            <p>
                Unable to connect to the server.
            </p>

            <p>
                Please try again later.
            </p>
        `;

    }

}