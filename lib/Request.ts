import axios, { AxiosRequestConfig } from "axios";

export default class Request {
  static async implession(params: StorageInterface) {
    const options: AxiosRequestConfig = {
      url: "http://localhost:8080/imp/",
      method: "GET",
      params: params,
    };
    return axios(options);
  }

  static async clicked(params: StorageInterface) {
    const options: AxiosRequestConfig = {
      url: "http://localhost:8080/click/",
      method: "GET",
      params: params,
    };
    return axios(options);
  }
}
