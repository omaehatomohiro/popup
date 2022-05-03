

export function setHistory(): void {
    const currentUrl = window.location.href;
    window.history.replaceState('popupReady', '', currentUrl);
    window.history.pushState('alreadyPopupSet', '', currentUrl);
}

  
export function setConfirmHistory():void {
    const currentUrl = window.location.href;
    window.history.replaceState('popupConfirmReady', '', currentUrl);
    window.history.pushState('alreadyConfirmPopupSet', '', currentUrl);
}