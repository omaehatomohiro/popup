export default class Redirect {
  static clicked(params: ParamsType) {
    let url = "http://localhost:8080/?";
    const keys = Object.keys(params);
    for (const key of keys) {
      url += `${key}=${params[key]}&`;
    }
    console.log(url.substring(0, url.length - 1));
    window.location.href = url.substring(0, url.length - 1);
  }
}
