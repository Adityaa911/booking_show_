
import { axiosInstance } from "./index"

export const getAllmovies = async () => {
  try {
    const response = await axiosInstance.get("/movie/all-movies");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatemovie = async (id,values) =>{
  try {
     const response = await axiosInstance.put(`/movie/Update-movie/${id}`, values);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const Postmovie = async (values) =>{
  try {
     const response = await axiosInstance.post("/movie/add-movies", values);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const getSinglemovie = async (id) =>{
  try {
     const response = await axiosInstance.get(`/movie/movies/${id}`);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const deleteSingleMovie = async (id) =>{
  try {
     const response = await axiosInstance.delete(`/movie/delete-movie/${id}`);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}