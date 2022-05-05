import axios from "axios";
import { baseUrl } from "../App";

export const requestAPI = async (method, url, data, params) => {
    const AuthToken = localStorage.getItem('authToken');

    const promise = await axios({
        method: method,
        url: `${baseUrl}${url}`,
        params: params,
        data: data,
        headers: {
          authToken: AuthToken
        }
      })
    
      return promise;
}

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('name');
  localStorage.removeItem('usertype');
  window.location.reload();
}