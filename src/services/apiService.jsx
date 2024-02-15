import axios from 'axios';

const apiService = axios.create({
  
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//'http://localhost:8080'



export default apiService;