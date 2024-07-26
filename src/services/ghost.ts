import { nconf } from "@/conf";
import GhostContentAPI from "@tryghost/content-api";

export const ghostContentApi = new GhostContentAPI({
  url: "https://rejoy-health.ghost.io",
  key: nconf.get("GHOST_CONTENT_API_KEY") as string,
  version: "v5.0",
});
