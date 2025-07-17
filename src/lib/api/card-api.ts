import axios from "@/lib/api/request";

export const createUserCard = async (): Promise<{ message: string }> => {
  return await axios.post("/card/create-card-by-user");
};
