import Controller from "@ember/controller";
import { action } from "@ember/object";

import opacity from "ember-animated/motions/opacity";

export default class ModelChangeRouteController extends Controller {
  colors = ["50,255,255", "255,50,255", "255,255,50"];
  get color() {
    return `background-color:rgb(${this.colors[this.model.id - 1]});`;
  }
}
