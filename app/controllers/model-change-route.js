import Controller from "@ember/controller";
import { action } from "@ember/object";

import opacity from "ember-animated/motions/opacity";

export default class ModelChangeRouteController extends Controller {
  colors = ["50,255,255", "255,50,255", "255,255,50"];
  get color() {
    return `background-color:rgb(${this.colors[this.model.id - 1]});`;
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
