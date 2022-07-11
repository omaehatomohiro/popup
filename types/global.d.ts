type BannerType = {
  /**
   * 0・・・通常
   * 1・・・ABテスト
   * 2・・・スクロールテスト
   */
  popupType: number;

  /**
   * Close AB test
   */
  defaultPath: string;

  /**
   * ABテスト A or Bの判別
   * versionA
   * versionB
   */
  typeBPath: string;

  /**
   * Scroll テスト
   */
  targetDomIdB: string;
  targetDomIdC: string;
  pathB: string;
  pathC: string;
};

type ConfigType = {
  adId: number;
  banner: BannerType;
  event: {
    history: boolean;
    tabclose: boolean;
    blur: boolean;
    countDown: number;
    timer: number;
  };
};

type AbType = "versionA" | "versionB" | "";
type ScrollPositionType = "positionA" | "positionB" | "positionC" | "";
type EventType = "blur" | "tabclose" | "timer" | "history" | "";

type StorageObjectType = {
  adId: number;
  popupType: number;
  // eventType: EventType;
  abType: AbType;
  remainingTime: number;
};

type ParamsType = {
  adId: number;
  popupType: number;
  eventType: EventType;
  abType: AbType;
  position: string;
  remainingTime: number;
};
