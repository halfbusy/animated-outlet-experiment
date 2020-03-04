import Route from "@ember/routing/route";
import { tracked } from "@glimmer/tracking";
import { htmlSafe } from "@ember/template";
export default class ModelChangeRouteRoute extends Route {
  model(params = {}) {
    return { id: params.model_id };
  }
}
