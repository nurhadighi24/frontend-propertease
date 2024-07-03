import axiosWithConfig from "@/utils/axiosWithConfig";

export const getProperties = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/properties`
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
