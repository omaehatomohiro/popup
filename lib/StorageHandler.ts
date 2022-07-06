import Storage from "./Storage";
import Hash from "./Hash";

export default class StorageHandler {
  private static key = "_adpop_session";

  static init(adId: number, popupType: number): void {
    const data: StorageInterface | null = StorageHandler.getObj();

    let storageObj: StorageInterface;

    // まったく初回ユーザー
    if (data === null) {
      storageObj = {
        uid: Hash.create(16),
        adId: adId,
        popupType: popupType,
        eventType: "",
        abType: "",
        position: "",
      };

      if (storageObj.popupType === 1) {
        storageObj.abType = StorageHandler.calcAbType(popupType);
      }
      if (storageObj.popupType === 2) {
        storageObj.position = "ver_a";
      }
    } else {
      // 過去に訪問したユーザー
      storageObj = data;

      //ADが違う場合
      if (adId !== storageObj.adId) {
        storageObj.adId = adId;
        storageObj.popupType = popupType;
        storageObj.position = "";
      }

      if (storageObj.popupType === 1) {
        storageObj.abType = StorageHandler.calcAbType(popupType);
      }

      if (storageObj.popupType === 2) {
        storageObj.position = "ver_a";
      }
    }
    StorageHandler.setObj(storageObj);
  }

  static updateEventType(eventType: EventType) {
    const data = StorageHandler.getObj();
    if (data === null) return null;
    const storageObj: StorageInterface = data;
    storageObj.eventType = eventType;
    StorageHandler.setObj(storageObj);
    return storageObj;
  }

  static getAbType(): string {
    const data: StorageInterface | null = StorageHandler.getObj();
    if (data === null) return "";
    return data.abType;
  }

  static getObj(): StorageInterface | null {
    const json = Storage.getItem(StorageHandler.key);
    if (json === null) return null;
    return JSON.parse(json);
  }

  static setObj(obj: StorageInterface): void {
    Storage.setItem(StorageHandler.key, JSON.stringify(obj));
  }

  static calcAbType(pupupType: number): AbType {
    if (pupupType !== 1) {
      return "";
    }
    const num = Math.floor(Math.random() * 10000);
    return num < 5000 ? "versionA" : "versionB";
  }
}
