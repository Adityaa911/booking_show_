import { axiosInstance } from "./index";


export const LoginUser = async (values) => {
  try {
    const response = await axiosInstance.post("/signIn", values);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const RegisterUser = async (values) => {
  try {
    const response = await axiosInstance.post("/signUp", values);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetCurentUser = async () => {
    try {
        const response = await axiosInstance.get('/get-single-user');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/all-users");
    return response.data;
  }catch (error) {
    console.log(error);
    throw error;
  }
};