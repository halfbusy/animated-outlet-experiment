import Service from "@ember/service";

import { inject as service } from "@ember/service";

export default class RouterHistoryService extends Service {
  @service router;

  history = [];
  maxHistoryLength = 50;

  direction = "forward";

  setForwardDirection(currentURL) {
    this.direction = "forward";
    this.history.pushObject(currentURL);
    this.pruneHistoryLog();
  }

  detectDirection(currentURL) {
    //trigger by app/locations/history.js's popState event, meaning the browser is invoking the forward or back button.
    const isReverse = this.isReverse(currentURL);

    if (isReverse) {
      this.direction = "reverse";
      this.history.popObject();
    } else {
      this.direction = "forward";
      this.history.pushObject(currentURL);
    }
    this.pruneHistoryLog();
  }

  isReverse(currentURL) {
    const secondLastObjectPos = this.history.length - 2;
    const previousPage = this.history.objectAt(secondLastObjectPos);

    if (previousPage === currentURL) {
      return true;
    }

    return false;
  }

  pruneHistoryLog() {
    const history = this.history;
    const maxLength = this.maxHistoryLength;

    if (history.length > maxLength) {
      const endIndex = history.length; //index to end the slice at (but not included)
      const startIndex = endIndex - maxLength;
      this.history = history.slice(startIndex, endIndex);
    }
  }
}
