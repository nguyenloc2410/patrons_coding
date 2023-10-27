import axios from "../setup/axios";

const registerNewUser = (email, phone, password, gender, address) => {
  return axios.post("api/v1/register", {
    email,
    phone,
    password,
    gender,
    address,
  });
};
const loginUser = (email, password) => {
  return axios.post("api/v1/login", {
    email,
    password,
  });
};
const getAllUser = (page, limit) => {
  return axios.get(`api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
  return axios.delete("api/v1/user/delete", {
    data: { id: user.id },
  });
};

const positionList = () => {
  return axios.get("api/v1/group/read");
};

const createNewUser = (user) => {
  return axios.post("api/v1/user/create", { user });
};

const updateUser = (user) => {
  return axios.put("api/v1/user/update", { user });
};

const accountRefesh = () => {
  return axios.get("api/v1/account");
};

const logOutAccount = () => {
  return axios.post("api/v1/logout");
};

export {
  registerNewUser,
  loginUser,
  getAllUser,
  deleteUser,
  positionList,
  createNewUser,
  updateUser,
  accountRefesh,
  logOutAccount,
};
