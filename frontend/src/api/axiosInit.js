import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL || "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (!config.url.includes("/auth/login")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("in interceptors.response |||||||||||", error);
    return Promise.reject(error);
  }
);

export default instance;
