import axios from "axios";

const apiUser = axios.create({
  baseURL: "http://localhost:3001/user",
});

export async function userRegister(values: {}) {
  try {
    const Response = await apiUser.post("/register", values);
    return console.log(Response.data);
  } catch (error) {
    return console.log(error);
  }
}

export async function userLogin(values: {}) {
  try {
    const Response = await apiUser.post("/login", values);
    return Response.data;
  } catch (error) {
    return console.log(error);
  }
}
