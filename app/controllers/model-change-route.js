import Controller from "@ember/controller";
import { action } from "@ember/object";

import opacity from "ember-animated/motions/opacity";
import adjustColor from "ember-animated/motions/adjust-color";
import adjustCss from "ember-animated/motions/adjust-css";

export default class ModelChangeRouteController extends Controller {
  get color() {
    const color = 200 / this.model.id;
    return `background-color:rgb(255,${color},255);`;
  }

  @action
  *transition({ duration, insertedSprites, removedSprites, receivedSprites }) {
    yield;

    console.log("insertedSprites", insertedSprites.length);
    console.log("removedSprites", removedSprites.length);
    console.log("receivedSprites", receivedSprites.length);

    insertedSprites.forEach(sprite => {
      opacity(sprite, { from: 0, to: 1, duration: duration });
    });

    receivedSprites.forEach(sprite => {
      opacity(sprite, { from: 0, to: 1, duration: duration });
    });

    removedSprites.forEach(sprite => {
      opacity(sprite, { from: 1, to: 0, duration: duration });
    });
  }
}
