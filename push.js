export default async function handler(req, res) {
  try {
    // 1) Fetch Remote.co listing HTML
    const target = "https://remote.co/remote-jobs/";
    const htmlRes = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; HJSE-Pusher/1.0)",
        "Accept": "text/html"
      }
    });
    const html = await htmlRes.text();

    // 2) Push to WordPress webhook ingestor
    const endpoint = process.env.WP_ENDPOINT;
    if (!endpoint) {
      return res.status(500).json({ ok: false, error: "Missing WP_ENDPOINT env var" });
    }
    const pushRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html })
    });

    return res.status(200).json({
      ok: true,
      fetched: htmlRes.status,
      pushed: pushRes.status
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}