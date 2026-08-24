// redeployexport default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/player/")) {
      const tag = url.pathname.replace("/api/player/", "").toUpperCase();

      if (!tag) {
        return new Response(
          JSON.stringify({ error: "Player Tag manquant" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const response = await fetch(
        `https://api.brawlstars.com/v1/players/%23${encodeURIComponent(tag)}`,
        {
          headers: {
            Authorization: `Bearer ${env.BRAWL_STARS_API_KEY}`
          }
        }
      );

      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
