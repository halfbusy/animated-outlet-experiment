import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route("persitant-route", function() {
    this.route("a");
    this.route("b");
    this.route("c", { path: "/:c_id" });
  });
  this.route("model-change-route", { path: "/:model_id" });
});
