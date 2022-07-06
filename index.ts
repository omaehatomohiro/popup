import config from "./config/Config";
import Browser from "./lib/Browser";
import Popup from "./lib/Popup";
import "./scss/style.scss";

main();

function main() {
  try {
    if (Browser.isIE()) return false;

    const popup = new Popup();
    popup.init();

    if (config.event.history) {
      popup.setHistoryEvent();
    }

    if (config.event.tabclose) {
      popup.setTabCloseEvent();
    }

    if (config.event.blur) {
      popup.setBlurEvent();
    }

    if (config.banner.popupType === 2) {
      popup.setScrollEvent();
    }

    popup.setTimerEvent();

    popup.setRedirectEvent();

    popup.setRemoveEvent();
  } catch (e) {
    console.log(e);
  }
}
