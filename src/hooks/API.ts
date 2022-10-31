import axios from "axios";

const tokenJwt = window.localStorage.getItem('token')

export default axios.create({
  baseURL: "https://petshop-crud.vercel.app/api",
  headers: {"Authorization" : `Bearer ${tokenJwt}`}
});
