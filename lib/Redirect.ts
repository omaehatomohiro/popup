export default class Redirect {
  static clicked(obj: any) {
    let url: string = "?";
    for (const key in obj) {
      url += `&${key}=${obj[key]}`;
    }
    console.log(url);
    //location.href = url
  }
}
