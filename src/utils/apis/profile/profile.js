import axiosWithConfig from "@/utils/axiosWithConfig";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`https://skkm.online/api/user`);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (profile) => {
  try {
    const response = await axiosWithConfig.post(
      `https://skkm.online/api/user`,
      profile
    );
    return response.data.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
