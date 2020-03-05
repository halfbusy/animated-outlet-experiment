import HistoryLocation from "@ember/routing/history-location";
import { inject as service } from "@ember/service";

let popstateFired = false;

export default class HistoryLocationWithDirectionTracking extends HistoryLocation {
  implementation = "history-with-direction-tracking";

  @service routerHistory;

  initState() {
    super.initState(...arguments);
    this.routerHistory.setForwardDirection(this.getURL());
  }

  pushState() {
    super.pushState(...arguments);

    this.routerHistory.setForwardDirection(this.getURL());
  }

  onUpdateURL(callback) {
    this._removeEventListener();

    this._popstateHandler = () => {
      // Ignore initial page load popstate event in Chrome
      if (!popstateFired) {
        popstateFired = true;
        if (this.getURL() === this._previousURL) {
          return;
        }
      }

      callback(this.getURL());

      this.routerHistory.detectDirection(this.getURL());
    };

    window.addEventListener("popstate", this._popstateHandler);
  }
}
