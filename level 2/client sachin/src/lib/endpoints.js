import { API_VERSION as version } from "./constants";
// signup
export const SIGNUP_ENDPOINT = `${version}/signup`;

// login
export const LOGIN_ENDPOINT = `${version}/login`;

// logout
export const LOGOUT_ENDPOINT = `${version}/logout`;

// quiz attempts
export const QUIZ_ATTEMPTS_ENDPOINT = `${version}/user/attempts`;

// fetch questions
export const FETCH_QUESTIONS_ENDPOINT = `${version}/question`;

// validate answer
export const VALIDATE_ANSWER_ENDPOINT = `${version}/question/checkanswer`;

// submit quiz
export const SUBMIT_QUIZ_ENDPOINT = `${version}/question/submit`;

// quiz completed
export const QUIZ_COMPLETED_ENDPOINT = `${version}/question/completed`;
