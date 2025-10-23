# Vercel Remote.co Pusher

This serverless function fetches Remote.co listings and pushes HTML to your WordPress endpoint (HJSE Jobs Webhook Ingestor). It includes a scheduled cron to run every hour.

## Deploy
1. Create a new Vercel project from this folder.
2. In Vercel → Settings → Environment Variables, add:
   - `WP_ENDPOINT` = `https://YOUR-SITE.com/wp-json/hjse/v1/push?token=YOUR_SECRET`
3. Deploy.
4. The included `vercel.json` sets a cron: `0 * * * *` (once per hour) -> `/api/push`.
5. You can test by opening `https://<your-vercel-app>.vercel.app/api/push`

## Notes
- Ensure the HJSE Jobs Webhook Ingestor plugin is active in WordPress.
- The secret must match the token configured in the plugin's settings.
