import axios from "axios";

const BASE_URL = "https://skkm.online/api";

const loginAcc = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export default loginAcc;
