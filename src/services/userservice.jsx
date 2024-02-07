// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// User Services
export const resetPassword = async (email, securityQuestion, securityAnswer) => {
  try {
    const response = await userService.post('/resetPassword', { email, securityQuestion, securityAnswer });
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

export const login = async (email, password) => {
  try {
    const response = await userService.post('/validate', { email, password });
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

export const register = async (userData) => {
  try {
    const response = await userService.post('/register', userData);
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

export const changePassword = async (email, newPassword) => {
  try {
    const response = await userService.post('/changePassword', { email, newPassword });
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

export const logout = async () => {
  try {
    const response = await userService.get('/logout');
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

// Favorite Services
export const viewFavorite = async () => {
  try {
    const response = await userService.get('/viewFavorite');
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

export const addToFavorite = async (songId) => {
  try {
    const response = await userService.post(`/addToFavorite?songId=${songId}`);
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

export const removeFromFavorite = async (songId) => {
  try {
    const response = await userService.post(`/removeFromFavorite?songId=${songId}`);
    return response.data;
  } catch (error) {
    console.log(error);

  }
};

// Artist Services
// Define similar functions for artist services
export const createArtist = async () => {

  try {
    const response = await axios.get('/createArtist');
    return response.data;
  } catch (error) {
    console.log(error);
  }

}

// Playlist Services
// Define functions for playlist services

// Song Services
// Define functions for song services

// Payment Controller
// Define functions for payment controller

export default userService;
