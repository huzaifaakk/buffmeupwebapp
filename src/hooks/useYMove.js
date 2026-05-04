import { useState } from 'react';

const API_KEY = import.meta.env.VITE_YMOVE_API_KEY;
const BASE_URL = 'https://exercise-api.ymove.app/api/v2';

export const useYMove = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchYMove = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    console.log('Fetching YMove:', endpoint, 'API_KEY:', API_KEY ? 'Present' : 'Missing');
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('YMove API Error:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getExercises = async (params = {}) => {
    const query = new URLSearchParams({ ...params, includeVideos: 'true' }).toString();
    return await fetchYMove(`/exercises?${query}`);
  };

  const searchFoods = async (query) => {
    if (!query) return null;
    return await fetchYMove(`/foods?q=${encodeURIComponent(query)}`);
  };

  const getRecipes = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await fetchYMove(`/recipes/search?${query}`);
  };

  const generateMealPlan = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return await fetchYMove(`/mealplans/generate?${query}`);
  };

  const analyzePosture = async (videoBase64, exerciseName, customInstructions = '') => {
    return await fetchYMove(`/posture/analyze`, {
      method: 'POST',
      body: JSON.stringify({
        video: {
          type: 'base64',
          data: videoBase64,
          media_type: 'video/mp4' // Generic for typical web uploads, but we should probably handle webm or mp4 dynamically if possible, or force mp4.
        },
        exercise_name: exerciseName,
        custom_instructions: customInstructions,
        num_frames: 16
      }),
    });
  };

  return {
    loading,
    error,
    getExercises,
    searchFoods,
    getRecipes,
    generateMealPlan,
    analyzePosture,
  };
};
