import loginView from "../views/loginView.js";
import homeView from "../views/homeView.js";
import { isAuthenticated } from "../utils.js";

const routes = {
  "/": loginView,
  "/home": homeView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");

  let path = window.location.pathname;

  const view = routes[path] || loginView;

  app.innerHTML = view();
};

window.addEventListener("popstate", router);
