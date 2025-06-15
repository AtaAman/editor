// import axios from "axios";
// import useUserStore from "../store/useAuthState"; // Adjust path if needed

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // Your API base URL
//   withCredentials: true, // Required if using cookies
// });

// // Add an interceptor to handle expired tokens
// axiosInstance.interceptors.response.use(
//   (response) => response, // Return the response if successful
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Token expired. Logging out...");
//       useUserStore.getState().logout(); // Auto logout on token expiration
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
