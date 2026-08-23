export default async function handler(req, res) {
  const tag = req.query.tag;

  if (!tag) {
    return res.status(400).json({
      error: "Player Tag manquant"
    });
  }

  const cleanTag = tag.toUpperCase().replace("#", "");

  const response = await fetch(
    `https://api.brawlstars.com/v1/players/%23${cleanTag}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.BRAWL_STARS_API_KEY}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(data);
  }

  return res.status(200).json(data);
}
