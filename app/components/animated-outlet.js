import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import move from "ember-animated/motions/move";
import { easeOut, easeIn } from "ember-animated/easings/cosine";
import fade from "ember-animated/transitions/fade";

export default class AnimatedOutletComponent extends Component {
  @service router;
  @service routerHistory;

  get transition() {
    return this.args.transition ? this[this.args.transition] : this.moveOver;
  }
  fade = fade;
  @action
  *moveOver({ duration, insertedSprites, removedSprites, receivedSprites }) {
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
    console.log(
      "this.router.currentRouteName",
      this.router.currentRouteName,
      this.router.currentRoute.parent.name
    );
    return {
      value: this.args.value,
      route: this.router.currentRouteName,
      parent: this.router.currentRoute.parent.name,
      url: this.router.currentURL
    };
  }

  get key() {
    return this.args.key ? this.args.key : "url";
  }

  get initialInsertion() {
    if (this.args.initialInsertion === false) return false;

    //do not animate on first page load
    if (this.routerHistory.history.length > 1) return true;

    return false;
  }

  get duration() {
    return this.args.duration ? this.args.duration : 600;
  }
}
