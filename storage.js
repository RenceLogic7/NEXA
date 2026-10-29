/**
 * =====================================
 * NEXA STORAGE MANAGER
 * =====================================
 *
 * Handles all browser storage.
 * Every page should use these functions
 * instead of calling localStorage directly.
 *
 * Future backend integration will be easy.
 * =====================================
 */

const StorageManager = {

  // =====================================
  // USER
  // =====================================

  saveUser(user) {
    localStorage.setItem("nexa_user", JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem("nexa_user");
    return user ? JSON.parse(user) : null;
  },

  clearUser() {
    localStorage.removeItem("nexa_user");
  },



  // =====================================
  // AUTH TOKEN
  // =====================================

  saveToken(token) {
    localStorage.setItem("nexa_token", token);
  },

  getToken() {
    return localStorage.getItem("nexa_token");
  },

  clearToken() {
    localStorage.removeItem("nexa_token");
  },



  // =====================================
  // LOGIN STATUS
  // =====================================

  setLoggedIn(status) {
    localStorage.setItem("nexa_logged_in", status);
  },

  isLoggedIn() {
    return localStorage.getItem("nexa_logged_in") === "true";
  },

  logout() {
    this.clearUser();
    this.clearToken();
    localStorage.removeItem("nexa_logged_in");
  },



  // =====================================
  // SUBJECT PROGRESS
  // =====================================

  saveProgress(subject, progress) {
    localStorage.setItem(
      `progress_${subject}`,
      JSON.stringify(progress)
    );
  },

  getProgress(subject) {
    const data = localStorage.getItem(`progress_${subject}`);
    return data ? JSON.parse(data) : null;
  },



  // =====================================
  // LESSON PROGRESS
  // =====================================

  saveLesson(subject, lessonId, completed = true) {

    const key = `lesson_${subject}`;

    let lessons =
      JSON.parse(localStorage.getItem(key)) || {};

    lessons[lessonId] = completed;

    localStorage.setItem(
      key,
      JSON.stringify(lessons)
    );

  },

  getLessons(subject) {

    return JSON.parse(
      localStorage.getItem(`lesson_${subject}`)
    ) || {};

  },



  // =====================================
  // QUIZ SCORES
  // =====================================

  saveQuiz(subject, score) {

    localStorage.setItem(
      `quiz_${subject}`,
      score
    );

  },

  getQuiz(subject) {

    return localStorage.getItem(
      `quiz_${subject}`
    );

  },



  // =====================================
  // SUBSCRIPTION
  // =====================================

  saveSubscription(plan) {

    localStorage.setItem(
      "nexa_subscription",
      JSON.stringify(plan)
    );

  },

  getSubscription() {

    const plan =
      localStorage.getItem("nexa_subscription");

    return plan
      ? JSON.parse(plan)
      : null;

  },



  // =====================================
  // SETTINGS
  // =====================================

  saveTheme(theme) {
    localStorage.setItem("nexa_theme", theme);
  },

  getTheme() {
    return localStorage.getItem("nexa_theme") || "light";
  },



  // =====================================
  // GENERIC HELPERS
  // =====================================

  save(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  },

  load(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }

};