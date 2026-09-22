import { setupLinkInterception } from "./navigation.js";
import { router } from "./router.js";

setupLinkInterception();

window.addEventListener("popstate", router);

router();
