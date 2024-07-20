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

export const getDetailProperties = async (id) => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/properties/${id}`
    );

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const getPropertyShowUser = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/property-show-user`
    );

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
