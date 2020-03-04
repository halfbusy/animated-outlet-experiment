import Controller from "@ember/controller";

export default class ModelChangeRouteController extends Controller {
  get color() {
    const color = 200 / this.model.id;
    return `background-color:rgb(255,${color},255);`;
  }
}
