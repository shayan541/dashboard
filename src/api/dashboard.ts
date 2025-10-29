import { api } from "./config";

export const getTime = async (url: string, signal: AbortSignal) => {
  try {
    const response = await api.get(url, { signal });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
