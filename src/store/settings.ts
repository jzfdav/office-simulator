/**
 * Settings Store
 *
 * Minimal, philosophy-aligned local storage wrapper.
 * Only stores preferences that define the "shape" of the day.
 * Never stores progress, state, or streaks.
 */

const STORAGE_KEY = "office-simulator-v1-settings";

export interface Settings {
	workdayStart: number; // Hour (0-23)
	workdayEnd: number; // Hour (0-23)
	hasSeenIntro: boolean;
	timeFormat: "12h" | "24h";
}

const DEFAULT_SETTINGS: Settings = {
	workdayStart: 9,
	workdayEnd: 17,
	hasSeenIntro: false,
	timeFormat: "24h",
};

export const SettingsStore = {
	load(): Settings {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return DEFAULT_SETTINGS;
			return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
		} catch {
			return DEFAULT_SETTINGS;
		}
	},

	save(settings: Partial<Settings>) {
		try {
			const current = this.load();
			const updated = { ...current, ...settings };
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
			return updated;
		} catch {
			// Silent fail - persistence is a convenience, not critical
			return this.load();
		}
	},
};
