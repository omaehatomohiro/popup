import Storage from "./Storage";
import Hash from "./Hash";

export default class StorageHandler {
  private static key = "_adpop_session";

  static init(
    adId: number,
    popupType: number,
    remainingTime: number
  ): StorageObjectType {
    const data: ParamsType | null = StorageHandler.getObj();

    let storageObj: ParamsType;

    // まったく初回ユーザー
    if (data === null || data.adId !== adId) {
      storageObj = {
        adId: adId,
        popupType: popupType,
        eventType: "",
        abType: "",
        position: "",
        remainingTime: remainingTime,
      };

      if (storageObj.popupType === 1) {
        storageObj.abType = StorageHandler.calcAbType();
      }
      if (storageObj.popupType === 2) {
        storageObj.position = "ver_a";
      }
    } else {
      // 過去に訪問したユーザーでかつ、ADIDも同じ
      storageObj = data;

      if (popupType === 1 && storageObj.abType) {
        storageObj.abType = StorageHandler.calcAbType();
      }
      storageObj.adId = adId;
      storageObj.popupType = popupType;
      storageObj.abType = "";
      storageObj.position = "";
      storageObj.remainingTime = remainingTime;

      if (storageObj.popupType === 2) {
        storageObj.position = "ver_a";
      }
    }

    StorageHandler.setObj(storageObj);
    return storageObj;
  }

  static updateEventType(eventType: EventType) {
    const data = StorageHandler.getObj();
    if (data === null) return null;
    const storageObj: ParamsType = data;
    storageObj.eventType = eventType;
    StorageHandler.setObj(storageObj);
    return storageObj;
  }

  static updateRemainingTime(remainingTime: number) {
    console.log(remainingTime);
    const data = StorageHandler.getObj();
    if (data === null) return null;
    const storageObj: ParamsType = data;
    storageObj.remainingTime = remainingTime;
    StorageHandler.setObj(storageObj);
    return storageObj;
  }

  static getAbType(): string {
    const data: ParamsType | null = StorageHandler.getObj();
    if (data === null) return "";
    return data.abType;
  }

  static getObj(): ParamsType | null {
    const json = Storage.getItem(StorageHandler.key);
    if (json === null) return null;
    return JSON.parse(json);
  }

  static setObj(obj: ParamsType): void {
    Storage.setItem(StorageHandler.key, JSON.stringify(obj));
  }

  static calcAbType(): AbType {
    const num = Math.floor(Math.random() * 10000);
    return num < 5000 ? "versionA" : "versionB";
  }
}
