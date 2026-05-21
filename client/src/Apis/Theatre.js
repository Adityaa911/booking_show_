
import { axiosInstance } from "./index"

export const getAlltheatre = async () => {
  try {
    const response = await axiosInstance.get("/theatre/get-all-theatre");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatetheatre = async (id ,values) =>{
  try {
     const response = await axiosInstance.put(`/theatre/update-theatre/${id}`, values);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const Postnewtheatre = async (values) =>{
  try {
     const response = await axiosInstance.post("/theatre/add-theatre", values);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const getSingletheatre = async (id) =>{
  try {
     const response = await axiosInstance.get(`/theatre/theatres/${id}`);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const deletetheatre = async (id) =>{
  try {
     const response = await axiosInstance.delete(`/theatre/delete-theatre/${id}`);
     return response.data;
  } catch (error) {
    console.log(error);
  }
}
  
  export const getMyTheatres = async () => {
  try {
    const response = await axiosInstance.get("/theatre/get-all-theatre-by-owner");
    return response.data;

  } catch (error) {
    return error.response.data;
  }
}

