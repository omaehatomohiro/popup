export default class ParamsHandler {
  public params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams(location.search);
  }
  getRemainingTime(): number {
    const time = Number(this.params.get("remainingTime"));
    if (time === null || isNaN(time)) {
      return 0;
    }
    return time;
  }
}
