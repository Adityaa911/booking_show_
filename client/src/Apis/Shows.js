
import { axiosInstance } from "./index";



export const  createShows = async (values) => {
    try{
        const response = await axiosInstance.post('/shows/add-shows',values);
        return response.data;
        console.log(response.data)
    }catch(error){
        throw error;
    }
}



export const getAllShows = async () => {
  try {
    const response = await axiosInstance.get("/shows/owner-shows");
    return response.data;
  } catch (error) {
    throw error;
  }
};




export const updateShow = async (id, values) => {
  try {
    const response = await axiosInstance.put(`/shows/update-show/${id}`, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteShow = async (id) => {
  try {
    const response = await axiosInstance.delete(`/shows/delete-show/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllthetresByMovie = async (values) => {
  try{
    const response = await axiosInstance.get("/shows/get-all-theatres-by-movie",values);
    return response.data;
  }
  catch(error){
    throw error;
  }
}

export const getShowById = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-show-by-id', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}