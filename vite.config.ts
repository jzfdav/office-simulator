import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	base: "/work-rhythm/",
	define: {
		__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
	},
	test: {
		environment: "jsdom",
		exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**", "tests/**"],
	},
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
			manifest: {
				name: "Work Rhythm",
				short_name: "Work Rhythm",
				description: "A calm work rhythm simulator.",
				theme_color: "#050505",
				background_color: "#050505",
				display: "standalone",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
});
