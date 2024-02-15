import axios from 'axios';

const apiService = axios.create({
  
  baseURL: 'http://localhost:8080',
});

//import.meta.env.VITE_API_BASE_URL



export default apiService;