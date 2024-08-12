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

export const createImageProperty = async (data, images, propertyId) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (images && images.length > 0) {
      formData.append("property_id", propertyId);
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }
    const response = await axiosWithConfig.post(
      `https://skkm.online/api/properties/images/upload`,
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
