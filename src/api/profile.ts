import { api } from "./config";

export const getCities = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
