import axiosWithConfig from "@/utils/axiosWithConfig";

export const getArticle = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/artikel`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw Error("Failed to get Article");
  }
};

export const getDetailArticle = async (id) => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/artikel/${id}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw Error("Failed to get Article");
  }
};
