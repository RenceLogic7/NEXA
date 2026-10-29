// =====================================
// NEXA API
// assets/js/api.js
// =====================================

// Change this when deploying
const API_BASE_URL = "http://127.0.0.1:5000/api";

/**
 * Generic request helper
 */
async function apiRequest(endpoint, method = "GET", data = null) {

  const token = localStorage.getItem("nexaToken");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    options
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
}

// =====================================
// AUTH
// =====================================

const api = {

  login(email, password) {
    return apiRequest(
      "/auth/login",
      "POST",
      {
        email,
        password
      }
    );
  },

  register(userData) {
    return apiRequest(
      "/auth/register",
      "POST",
      userData
    );
  },

  forgotPassword(email) {
    return apiRequest(
      "/auth/forgot-password",
      "POST",
      {
        email
      }
    );
  },

  resetPassword(token, password) {
    return apiRequest(
      "/auth/reset-password",
      "POST",
      {
        token,
        password
      }
    );
  },

// =====================================
// USER PROFILE
// =====================================

  getProfile() {
    return apiRequest("/profile");
  },

  updateProfile(profileData) {
    return apiRequest(
      "/profile",
      "PUT",
      profileData
    );
  },

// =====================================
// DASHBOARD
// =====================================

  getDashboard() {
    return apiRequest("/dashboard");
  },

// =====================================
// SUBSCRIPTIONS
// =====================================

  getPlans() {
    return apiRequest("/subscription/plans");
  },

  subscribe(planId) {
    return apiRequest(
      "/subscription",
      "POST",
      {
        planId
      }
    );
  },

// =====================================
// PAYMENTS
// =====================================

  createPayment(planId) {
    return apiRequest(
      "/payment/create",
      "POST",
      {
        planId
      }
    );
  },

  verifyPayment(reference) {
    return apiRequest(
      `/payment/verify/${reference}`
    );
  },

// =====================================
// LESSONS
// =====================================

  getLessons(subject) {
    return apiRequest(
      `/lessons/${subject}`
    );
  },

// =====================================
// QUIZZES
// =====================================

  submitQuiz(data) {
    return apiRequest(
      "/quiz/submit",
      "POST",
      data
    );
  },

// =====================================
// CERTIFICATES
// =====================================

  getCertificate() {
    return apiRequest("/certificate");
  }

};