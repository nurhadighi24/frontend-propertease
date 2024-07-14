import axiosWithConfig from "@/utils/axiosWithConfig";

export const paymentWithMidtrans = async (data) => {
  try {
    const response = await axiosWithConfig.post(
      `http://localhost:1000/api/payment/process-transaction`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from Midtrans:", response);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
