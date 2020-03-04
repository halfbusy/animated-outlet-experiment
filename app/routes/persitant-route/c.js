import Route from "@ember/routing/route";

export default class ModelChangeRouteRoute extends Route {
  model(params = {}) {
    return { id: params.c_id };
  }
}
