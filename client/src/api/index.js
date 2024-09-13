import axios from "axios";

const config = {
  header: {
    "Content-type": "application/json",
  },
};

//const API = axios.create({ baseURL: "http://10.0.5.10:5000" });
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile"))?.token
    }`;
  }
  return req;
});

const signin = async (loginData) => {
  const response = await API.post("user/signin", loginData, config);
  return response.data;
};

const signup = async (userData) => {
  const response = await API.post("user/signup", userData, config);
  return response.data;
};

const saveBasicDetails = async (basicDetails) => {
  const response = await API.post(
    "application/addBasicDetails",
    basicDetails,
    config
  );
  return response.data;
};

const getVacancies = async () => {
  const response = await API.get("/vacancies", config);
  return response.data;
};

const getVacanciesBySearch = async (searchQuery) => {
  const response = await API.get(
    `/vacancy/search?searchQuery=${searchQuery.search || "none"} `
  );
  return response.data.data;
};

export { getVacancies, saveBasicDetails, signin, signup, getVacanciesBySearch };
