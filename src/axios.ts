import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://funcapp-takmilplatform-dev.azurewebsites.net/api",
});

export default axiosInstance;
