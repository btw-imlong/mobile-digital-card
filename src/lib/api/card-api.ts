import axiosInstance from "@/lib/api/request"; // your axios setup file

export const deleteCard = async (cardId: string) => {
  return axiosInstance.delete(`/card/${cardId}`);
};
