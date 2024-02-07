import axios from 'axios';
import SyncLoader from 'react-spinners/SyncLoader';
import Loader from '../componets/Loader';
import { useEffect, useState } from 'react';

// const API_BASE_URL = ;

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const customReactQuery = (urlPath) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await apiService.get(urlPath);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return[data,loading,error];

}


export default apiService;