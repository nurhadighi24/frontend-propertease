import axiosWithConfig from "@/utils/axiosWithConfig";

export const createProperty = async (data, image) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (image) {
      formData.append("image", image);
    }

    const response = await axiosWithConfig.post(
      `https://skkm.online/api/properties`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
