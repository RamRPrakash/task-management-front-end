import axios from "axios";

const API_BASE_URL = "https://task-management-backend-v2.onrender.com/api"; // Your deployed backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if logged in
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Auth Token Set:", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("Auth Token Removed");
  }
};
