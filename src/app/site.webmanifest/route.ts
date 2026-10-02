import {
  ANDROID_APP_ID,
  APP_STORE_ID,
  APP_STORE_URL,
  PLAY_STORE_URL,
  SITE_NAME,
} from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  return Response.json(
    {
      name: SITE_NAME,
      short_name: SITE_NAME,
      start_url: "/ko",
      display: "standalone",
      background_color: "#fdfbf7",
      theme_color: "#FF6843",
      prefer_related_applications: true,
      related_applications: [
        { platform: "play", url: PLAY_STORE_URL, id: ANDROID_APP_ID },
        { platform: "itunes", url: APP_STORE_URL, id: APP_STORE_ID },
      ],
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
