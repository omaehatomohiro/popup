const config: ConfigType = {
  adId: 1,
  banner: {
    /**
     * 0・・・通常
     * 1・・・ABテスト
     * 2・・・スクロールテスト
     */
    popupType: 2,

    /**
     * Close AB tes
     */
    defaultPath:
      "https://belta-shop.jp/upload/ad_save_image/folate500_pubn2103.png",

    /**
     * For ABテスト
     */
    typeBPath:
      "https://belta-shop.jp/upload/ad_save_image/folate500_pubn2103.png",

    /**
     * For Scroll テスト
     */
    targetDomIdB: "point-b",
    targetDomIdC: "point-c",
    pathB:
      "https://i.pinimg.com/originals/4a/98/65/4a986551a9b8973d5ffd45a817377316.jpg",
    pathC:
      "https://i.pinimg.com/originals/ad/2c/3d/ad2c3d4edc169fefd11ea4a66b11ff28.jpg",
  },

  event: {
    history: true,
    tabclose: true,
    blur: true,
    countDown: 0,
    timer: 0,
  },
};

export default config;
