import { nconf } from "@/conf";
import GhostContentAPI from "@tryghost/content-api";

export const ghostContentApi = new GhostContentAPI({
  url: "https://rejoy-health.ghost.io",
  key: nconf.get("GHOST_CONTENT_API_KEY") as string,
  version: "v5.0",
  makeRequest: ({ url, method, params, headers }) => {
    const apiUrl = new URL(url);

    Object.keys(params).map((key) =>
      apiUrl.searchParams.set(key, encodeURIComponent(params[key]))
    );

    return fetch(apiUrl.toString(), { method, headers })
      .then(async (res) => {
        // Check if the response was successful.
        if (!res.ok) {
          // You can handle HTTP errors here
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return { data: await res.json() };
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  },
});
