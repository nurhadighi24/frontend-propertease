import axiosWithConfig from "@/utils/axiosWithConfig";

export const getPropertyIklanSaya = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://skkm.online/api/user/properties/`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw Error("Failed to get Property Iklan Saya");
  }
};
