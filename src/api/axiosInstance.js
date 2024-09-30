import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default BASE_URL;
