import axiosWithConfig from "@/utils/axiosWithConfig";

export const simulateKpr = async (data) => {
  try {
    const response = await axiosWithConfig.post(
      `https://skkm.online/api/simulate`,
      data
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
