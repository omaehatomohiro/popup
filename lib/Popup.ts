import { setHistory } from "./History";
import Request from "./Request";
import Redirect from "./Redirect";
import CountDown from "./CountDown";
import Banner from "./Banner";
import StorageHandler from "./StorageHandler";
import ParamsHandler from "./ParamsHandler";

export default class Popup {
  config: ConfigType;
  eventType: EventType;
  abType: AbType;
  position: ScrollPositionType;
  timerId: any;
  historyActionFunc: any;
  tabCloseActionFunc: any;
  blurActionFunc: any;
  scrollActionFunc: any;
  scrollTimerFunc: any;

  constructor(config: any) {
    this.config = config;
    this.eventType = "";
    this.abType = "";
    this.position = "";
  }

  init(): void {
    const params = new ParamsHandler();
    const remainingTime = params.getRemainingTime();

    if (remainingTime) {
      this.config.event.countDown = remainingTime;
    }

    const storage = StorageHandler.init(
      this.config.adId,
      this.config.banner.popupType,
      this.config.event.countDown
    );

    this.abType = storage.abType;

    const banner = Banner.getInstance();
    banner.create(this.config);
    this.abType = banner.abType;
  }

  setHistoryEvent() {
    if (history.state != "popupReady" && history.state != "alreadyPopupSet") {
      setHistory();
    }
    this.historyActionFunc = this.historyAction.bind(this);
    window.addEventListener("popstate", this.historyActionFunc, false);
  }

  setTabCloseEvent() {
    this.tabCloseActionFunc = this.tabCloseAction.bind(this);
    window.addEventListener("beforeunload", this.tabCloseActionFunc, false);
  }

  setBlurEvent() {
    this.blurActionFunc = this.blurAction.bind(this);
    window.addEventListener("blur", this.blurActionFunc, false);
  }

  setScrollEvent() {
    this.scrollActionFunc = this.scrollAction.bind(this);
    window.addEventListener("scroll", this.scrollActionFunc, false);
  }

  setTimerEvent() {
    this.timerId = setTimeout(
      function (popup) {
        console.log("timer!!");
        popup.eventType = "timer";
        popup.commonAction();
      },
      10000,
      this
    );
  }

  setRedirectEvent() {
    const banner = Banner.getInstance();
    console.log(banner.dom);
    banner.dom.addEventListener("click", this.redirectAction.bind(this));
  }

  setRemoveEvent() {
    const banner = Banner.getInstance();
    banner.closeBtn.addEventListener("click", this.removeAction.bind(this));
  }

  /**
   * ヒストリーイベント
   * @returns void
   */
  historyAction() {
    console.log("history action");
    this.eventType = "history";
    if (history.state !== "popupReady") return;
    this.commonAction();
  }

  tabCloseAction() {
    this.eventType = "tabclose";
    console.log("tabclose action");
    this.commonAction();
  }

  blurAction() {
    console.log("blur");
    this.eventType = "blur";
    this.commonAction();
  }

  commonAction() {
    clearTimeout(this.timerId);

    const storageObj: ParamsType | null = StorageHandler.updateEventType(
      this.eventType
    );
    if (this.config.event.countDown) {
      const countDown = CountDown.getInstance();
      countDown.start("conterDiv", this.config.event.countDown);
    }

    // remove events
    window.removeEventListener("popstate", this.historyActionFunc, false);
    window.removeEventListener("beforeunload", this.tabCloseActionFunc, false);
    window.removeEventListener("blur", this.blurActionFunc, false);
    window.removeEventListener("scroll", this.scrollActionFunc, false);

    // open banner
    const banner = Banner.getInstance();
    banner.open();

    // send impression request
    const data = this.createData(
      this.config,
      this.eventType,
      this.abType,
      this.position,
      storageObj
    );
    Request.implession(data);
  }

  async redirectAction() {
    console.log("redirect action");
    const storageObj = StorageHandler.getObj();
    const data = this.createData(
      this.config,
      this.eventType,
      this.abType,
      this.position,
      storageObj
    );
    Redirect.clicked(data);
  }

  removeAction(e: Event) {
    e.stopPropagation();
    const countDown = CountDown.getInstance();
    countDown.stop();
    const banner = Banner.getInstance();
    banner.remove();
  }

  scrollAction() {
    const pos1 = document.getElementById("popup-position-1");
    const pos2 = document.getElementById("popup-position-2");
    const windowHeight = window.innerHeight;
    const banner = Banner.getInstance();

    if (pos1 !== null && pos2 === null) {
      const p1 = pos1.getBoundingClientRect();
      if (p1.top - windowHeight >= 0) {
        this.position = "positionA";
        banner.imgSwitchToDefault();
      }
      if (p1.top - windowHeight < 0) {
        this.position = "positionB";
        banner.imgSwitchToB();
      }
    }

    if (pos1 !== null && pos2 !== null) {
      const p1 = pos1.getBoundingClientRect();
      const p2 = pos2.getBoundingClientRect();
      if (p1.top - windowHeight >= 0) {
        this.position = "positionA";
        banner.imgSwitchToDefault();
      }
      if (p1.top - windowHeight < 0) {
        this.position = "positionB";
        banner.imgSwitchToB();
      }

      if (p1.top - windowHeight < 0 && p2.top - windowHeight < 0) {
        this.position = "positionC";
        banner.imgSwitchToC();
      }
    }
  }

  createData(
    config: ConfigType,
    eventType: EventType,
    abtype: AbType,
    position: ScrollPositionType,
    storageObj: ParamsType | null
  ): ParamsType {
    const params: ParamsType = {
      adId: config.adId,
      popupType: config.banner.popupType,
      eventType: eventType,
      abType: abtype,
      position: position,
      remainingTime: storageObj ? storageObj.remainingTime : 0,
    };
    return params;
  }
}
