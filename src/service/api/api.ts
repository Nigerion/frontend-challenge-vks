import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_API_KEY;
const API_URL = import.meta.env.VITE_REACT_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});
