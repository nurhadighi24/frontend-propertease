import axiosWithConfig from "@/utils/axiosWithConfig";

export const getPropertyIklanSaya = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/user/properties`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.message);
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await axiosWithConfig.delete(
      `https://skkm.online/api/properties/${id}`
    );

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const updateProperty = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
    };

    const response = await axiosWithConfig.post(
      `https://skkm.online/api/properties/update/${id}`,
      newData
    );

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
