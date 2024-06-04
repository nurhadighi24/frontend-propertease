import axiosWithConfig from "../axiosWithConfig";

export const getProvinces = async () => {
  try {
    const response = await axiosWithConfig.get(
      `https://wilayah.id/api/provinces.json`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw Error("Failed to get Provinces");
  }
};
