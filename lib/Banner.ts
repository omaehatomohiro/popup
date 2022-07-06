import config from "../config/Config";
import StorageHandler from "./StorageHandler";

interface BannerInterface {
  dom: HTMLDivElement;
  closeBtn: HTMLDivElement;

  popupType: number;

  /**
   * Close AB test
   */
  defaultPath: string;

  /**
   * For ABテスト
   */
  abType: string;
  typeBPath: string;

  /**
   * For Scroll テスト
   */
  targetDomIdB: string;
  targetDomIdC: string;
  pathB: string;
  pathC: string;
}

class Banner implements BannerInterface {
  private static instance: Banner;

  dom: HTMLDivElement;
  closeBtn: HTMLDivElement;
  bannerImage: HTMLImageElement;
  countDownDiv: HTMLDivElement;
  popupType: number;
  defaultPath: string;
  abType: string;
  typeBPath: string;
  targetDomIdB: string;
  targetDomIdC: string;
  pathB: string;
  pathC: string;

  constructor() {
    this.dom = <HTMLDivElement>document.createElement("div");
    this.closeBtn = <HTMLDivElement>document.createElement("div");
    this.bannerImage = <HTMLImageElement>document.createElement("img");
    this.countDownDiv = <HTMLDivElement>document.createElement("div");
    this.popupType = config.banner.popupType;
    this.abType = StorageHandler.getAbType();
    this.defaultPath = config.banner.defaultPath;
    // this.typeAPath = config.banner.typeAPath;
    this.typeBPath = config.banner.typeBPath;
    this.targetDomIdB = config.banner.targetDomIdB;
    this.targetDomIdC = config.banner.targetDomIdC;
    this.pathB = config.banner.pathB;
    this.pathC = config.banner.pathC;
  }

  create(countdownTime: number): void {
    const container: HTMLDivElement = <HTMLDivElement>(
      document.createElement("div")
    );
    container.id = "popupNormalContainer";
    //container.className = 'active';
    const inner = document.createElement("div");
    const bannerWrap = document.createElement("div");
    const closeBtn = document.createElement("div");
    closeBtn.id = "popupCloseBtn";
    closeBtn.className = "normalCloseBtn";
    const bannerLink = document.createElement("div");
    bannerLink.id = "popupBannerImgWrap";
    bannerLink.className = "popupBannerLinkWrap";
    const closeImage = document.createElement("img");
    closeImage.src = "https://ad-pop.bbo-tech.com/images/close.png";
    let bannerImage: HTMLImageElement;

    // ABテストの場合
    if (this.popupType === 1) {
      bannerImage = document.createElement("img");
      bannerImage.className = "mainBannerImage";
      bannerImage.src = this.selectAbImg();
    } else {
      bannerImage = document.createElement("img");
      bannerImage.className = "mainBannerImage";
      bannerImage.src = this.defaultPath; // close button Image path
    }

    bannerImage.className = "mainBannerImage";
    this.bannerImage = bannerImage;

    if (countdownTime) {
      const countDownDiv = document.createElement("div");
      countDownDiv.id = "conterDiv";
      countDownDiv.className = "countTimerWrap";
      this.countDownDiv = countDownDiv;
      bannerLink.appendChild(countDownDiv);
    }

    bannerLink.appendChild(bannerImage);
    closeBtn.appendChild(closeImage);
    bannerWrap.appendChild(closeBtn);
    bannerWrap.appendChild(bannerLink);
    inner.appendChild(bannerWrap);
    container.appendChild(inner);
    this.dom = container;
    this.closeBtn = closeBtn;
    // this.isExistFlag = true;
    document.body.appendChild(container);
  }

  open(): void {
    this.dom.classList.add("active");
    console.log("open");
  }

  remove(): void {
    console.log("close");
    this.dom.remove();
  }

  selectAbImg(): string {
    if (this.abType === "verA") {
      return this.defaultPath;
    }
    if (this.abType === "verB") {
      return this.typeBPath;
    }
    return this.defaultPath;
  }

  imgSwitchToDefault() {
    this.bannerImage.src = this.defaultPath;
  }

  imgSwitchToB() {
    this.bannerImage.src = this.pathB;
  }

  imgSwitchToC() {
    this.bannerImage.src = this.pathC;
  }

  public static getInstance() {
    if (!Banner.instance) {
      Banner.instance = new Banner();
    }
    return Banner.instance;
  }
}

export default Banner;
