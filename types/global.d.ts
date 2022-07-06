type StorageObject = {
  session: string;
  adId: number;
  popupType: number;
  // clicked: number,
  // abType?:string
};

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

// abType?: string, //'versionA' | 'versionB' | null;

type EventType = {
  history: boolean;
  tabclose: boolean;
  blur: boolean;
  countDown: number;
  timer: number;
};

type ConfigType = {
  adId: number;
  banner: BannerType;
  event: EventType;
};

type AbType = "versionA" | "versionB" | "";
type ScrollPositionType = "positionA" | "positionB" | "positionC" | "";
declare const window: Window;
