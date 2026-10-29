// =====================================
// RESET PASSWORD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("resetPasswordForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const newPassword =
            document.getElementById("newPassword").value.trim();

        const confirmPassword =
            document.getElementById("confirmPassword").value.trim();

        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        const token =
            new URLSearchParams(window.location.search).get("token");

        if (!token) {

            alert("Invalid or missing reset token.");

            return;

        }

        try {

            const response = await fetch(

                `http://127.0.0.1:5000/api/auth/reset-password/${token}`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        password: newPassword

                    })

                }

            );

            const data = await response.json();

            alert(data.message);

            if (data.success) {

                window.location.href = "login.html";

            }

        }

        catch (error) {

            console.error(error);

            alert("Unable to reset password.");

        }

    });

});