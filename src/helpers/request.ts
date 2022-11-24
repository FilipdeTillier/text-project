import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export const request = axios.create({
  baseURL: BACKEND_URL,
});
