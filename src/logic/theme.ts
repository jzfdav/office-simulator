/**
 * Chrono-Dynamic Theme Logic
 */

export interface ThemeColors {
	color1: string;
	color2: string;
	color3: string;
}

const KEY_TIMES = [
	{
		mins: 0,
		colors: { color1: "#050505", color2: "#0A0A1F", color3: "#050505" },
	}, // midnight
	{
		mins: 360,
		colors: { color1: "#0A0A1F", color2: "#1A0A1F", color3: "#0A0A1F" },
	}, // 6am
	{
		mins: 480,
		colors: { color1: "#FF9E2C", color2: "#4A90E2", color3: "#FFD200" },
	}, // 8am (Sunrise)
	{
		mins: 720,
		colors: { color1: "#4A90E2", color2: "#FFFFFF", color3: "#50E3C2" },
	}, // 12pm (Midday)
	{
		mins: 1020,
		colors: { color1: "#F5A623", color2: "#9013FE", color3: "#4A90E2" },
	}, // 5pm (Golden)
	{
		mins: 1200,
		colors: { color1: "#4A00E0", color2: "#8E2DE2", color3: "#1A1A1A" },
	}, // 8pm (Twilight)
	{
		mins: 1440,
		colors: { color1: "#050505", color2: "#0A0A1F", color3: "#050505" },
	}, // midnight
];

function interpolateColor(c1: string, c2: string, factor: number): string {
	const r1 = parseInt(c1.substring(1, 3), 16);
	const g1 = parseInt(c1.substring(3, 5), 16);
	const b1 = parseInt(c1.substring(5, 7), 16);

	const r2 = parseInt(c2.substring(1, 3), 16);
	const g2 = parseInt(c2.substring(3, 5), 16);
	const b2 = parseInt(c2.substring(5, 7), 16);

	const r = Math.round(r1 + (r2 - r1) * factor);
	const g = Math.round(g1 + (g2 - g1) * factor);
	const b = Math.round(b1 + (b2 - b1) * factor);

	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function getThemeForTime(date: Date): ThemeColors {
	const mins = date.getHours() * 60 + date.getMinutes();

	let start = KEY_TIMES[0];
	let end = KEY_TIMES[1];

	for (let i = 0; i < KEY_TIMES.length - 1; i++) {
		if (mins >= KEY_TIMES[i].mins && mins < KEY_TIMES[i + 1].mins) {
			start = KEY_TIMES[i];
			end = KEY_TIMES[i + 1];
			break;
		}
	}

	const factor = (mins - start.mins) / (end.mins - start.mins);

	return {
		color1: interpolateColor(start.colors.color1, end.colors.color1, factor),
		color2: interpolateColor(start.colors.color2, end.colors.color2, factor),
		color3: interpolateColor(start.colors.color3, end.colors.color3, factor),
	};
}
