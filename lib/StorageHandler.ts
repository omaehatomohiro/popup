import Storage from "./Storage";
import Hash from "./Hash";

interface StorageInterface {
  uid: string;
  adId: number;
  popupType: number;
  eventType: string;
  abType: AbType;
  position: string;
}

export default class StorageHandler {
  private static key: string = "_adpop_session";

  static init(adId: number, popupType: number): void {
    const data: StorageInterface | null = StorageHandler.getStorageObj();

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
        storageObj.abType = StorageHandler.calcRandom(popupType);
      }
      if (storageObj.popupType === 2) {
        storageObj.position = "ver_a";
      }
    } else {
      // 過去に方法したユーザー
      storageObj = data;

      if (adId !== storageObj.adId) {
        // AD idが違うなら変更
        storageObj.uid = Hash.create(16);
        storageObj.adId = adId;
      }

      // ABテストで１番で、前回は
      if (storageObj.popupType === 1 && adId !== storageObj.adId) {
        storageObj.abType = StorageHandler.calcRandom(popupType);
      }

      if (storageObj.popupType === 2) {
        storageObj.position = "ver_a";
      } else {
        storageObj.position = "";
      }
    }

    StorageHandler.setStorageObj(storageObj);
  }

  static updateEventType(eventType: string) {
    const data: StorageInterface | null = StorageHandler.getStorageObj();
    if (data === null) return false;
    let storageObj: StorageInterface = data;
    storageObj.eventType = eventType;
    StorageHandler.setStorageObj(storageObj);
    return storageObj;
  }

  static updateAfterClick(eventType: string) {
    const data: StorageInterface | null = StorageHandler.getStorageObj();
    if (data === null) return false;
    let storageObj: StorageInterface = data;
    storageObj.eventType = eventType;
    StorageHandler.setStorageObj(storageObj);
    return storageObj;
  }

  static getAbType(): string {
    const data: StorageInterface | null = StorageHandler.getStorageObj();
    if (data === null) return "";
    return data.abType;
  }

  static getStorageObj(): StorageInterface | null {
    const json = Storage.getItem(StorageHandler.key);
    if (json === null) return null;
    return JSON.parse(json);
  }

  static setStorageObj(obj: StorageInterface): void {
    Storage.setItem(StorageHandler.key, JSON.stringify(obj));
  }

  static calcRandom(pupupType: number): "versionA" | "versionB" | "" {
    if (pupupType !== 1) {
      return "";
    }
    const num = Math.floor(Math.random() * 10000);
    return num < 5000 ? "versionA" : "versionB";
  }
}
