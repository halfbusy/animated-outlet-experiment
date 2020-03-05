import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import move from "ember-animated/motions/move";
import { easeOut, easeIn } from "ember-animated/easings/cosine";
export default class AnimatedOutletComponent extends Component {
  @service router;
  @service routerHistory;

  @action
  *transition({ duration, insertedSprites, removedSprites, receivedSprites }) {
    yield;

    console.log("direction", this.routerHistory.direction);
    console.log("insertedSprites", insertedSprites.length);
    console.log("removedSprites", removedSprites.length);
    console.log("receivedSprites", receivedSprites.length);

    if (this.routerHistory.direction === "forward") {
      insertedSprites.forEach(sprite => {
        sprite.startAtPixel({ x: window.innerWidth });
        sprite.applyStyles({ "z-index": "1" });
        move(sprite, { easing: easeOut });
      });

      removedSprites.forEach(sprite => {
        sprite.applyStyles({ "z-index": "1" });
        sprite.endAtPixel({ x: -window.innerWidth });
        move(sprite, { easing: easeIn });
      });
    } else {
      insertedSprites.forEach(sprite => {
        sprite.startAtPixel({ x: -window.innerWidth });
        sprite.applyStyles({ "z-index": "1" });
        move(sprite, { easing: easeOut });
      });

      removedSprites.forEach(sprite => {
        sprite.applyStyles({ "z-index": "1" });
        sprite.endAtPixel({ x: window.innerWidth });
        move(sprite, { easing: easeIn });
      });
    }
  }

  get valueAndRouteHash() {
    return {
      value: this.args.value,
      route: this.router.currentRouteName,
      url: this.router.currentURL
    };
  }
}
