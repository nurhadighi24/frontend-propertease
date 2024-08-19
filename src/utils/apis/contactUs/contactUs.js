import axiosWithConfig from "@/utils/axiosWithConfig";

export const contactUsUrl = async (data) => {
  try {
    const response = await axiosWithConfig.post(
      `https://skkm.online/api/inquiries`,
      data
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
