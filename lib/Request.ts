import axios, { AxiosRequestConfig } from "axios";

export default class Request {
  static async implession(storageObj: ParamsType) {
    const options: AxiosRequestConfig = {
      url: "http://localhost:8080/imp/",
      method: "GET",
      params: storageObj,
    };
    return axios(options);
  }
}
