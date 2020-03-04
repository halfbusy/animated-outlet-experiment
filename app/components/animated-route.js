import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import opacity from "ember-animated/motions/opacity";

export default class AnimatedRouteComponent extends Component {
  @service router;
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