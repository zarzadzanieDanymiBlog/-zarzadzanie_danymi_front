import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zarzadzanie-danymi-blog.herokuapp.com/api",
});

export default axiosInstance;
