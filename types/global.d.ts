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
   * For ABテスト
   * versionA
   * versionB
   */

  // A or Bの判別
  typeBPath: string;

  /**
   * For Scroll テスト
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
};

type ConfigType = {
  adId: number;
  banner: BannerType;
  event: EventType;
};
