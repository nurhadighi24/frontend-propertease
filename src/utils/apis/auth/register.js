import axios from "axios";

const BASE_URL = "https://skkm.online/api";

const registerAcc = async (newAcc) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, newAcc);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export default registerAcc;
