import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
  "https://mock-api-temporada.onrender.com";

export const api = axios.create({ baseURL });
