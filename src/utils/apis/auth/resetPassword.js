import axios from "axios";

const BASE_URL = "https://skkm.online/api";

const reqEmailOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/password/email`, email);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

const postInputOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/password/reset`, email);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export { postInputOtp, reqEmailOtp };
