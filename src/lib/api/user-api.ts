import axios from "@/lib/api/request";
import { IUser } from "@/types/user-type";

export const userRequest = () => {
  const PROFILE = async (): Promise<IUser> => {
    return await axios({
      url: "/user/me",
      method: "GET",
    });
  };

  const updateProfile = async (payload: Partial<IUser>): Promise<IUser> => {
    return await axios({
      url: "/user/update-profile",
      method: "PUT",
      data: payload,
    });
  };

  const uploadImage = async (formData: FormData) => {
    return await axios({
      url: "/upload/upload-image",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return {
    PROFILE,
    UPDATE_USER: updateProfile, // ✅ exposed correctly
    uploadImage,
  };
};
