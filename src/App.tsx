import { AnimatePresence, motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ActivityDisplay from "./components/ActivityDisplay";
import DynamicBackground from "./components/DynamicBackground";
import IntroOverlay from "./components/IntroOverlay";
import ProgressLine from "./components/ProgressLine";
import SettingsModal from "./components/SettingsModal";
import { getSchedule } from "./logic/scheduler";
import { useCurrentTime } from "./logic/useCurrentTime";
import { type Settings, SettingsStore } from "./store/settings";
import "./styles/app.css";

export default function App() {
	const [settings, setSettings] = useState<Settings>(SettingsStore.load());
	const now = useCurrentTime();
	const [showSettings, setShowSettings] = useState(false);
	const [showIntro, setShowIntro] = useState(!settings.hasSeenIntro);

	const schedule = getSchedule(now, settings);

	// Update title
	useEffect(() => {
		document.title = `${schedule.label} - Office Simulator`;
	}, [schedule.label]);

	const handleDismissIntro = () => {
		setShowIntro(false);
		const updated = SettingsStore.save({ hasSeenIntro: true });
		setSettings(updated);
	};

	return (
		<main className="app-container">
			<DynamicBackground now={now} />
			<ProgressLine key="progress-line" progress={schedule.progress} />
			<AnimatePresence>
				{showIntro && (
					<IntroOverlay key="intro-overlay" onDismiss={handleDismissIntro} />
				)}
			</AnimatePresence>

			<ActivityDisplay key={schedule.label} activity={schedule} />

			<motion.button
				type="button"
				className="settings-trigger"
				onClick={() => setShowSettings(true)}
				aria-label="Settings"
				whileHover={{ scale: 1.1, rotate: 15 }}
				whileTap={{ scale: 0.9 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<SettingsIcon size={24} strokeWidth={1.5} />
			</motion.button>

			<SettingsModal
				isOpen={showSettings}
				onClose={() => setShowSettings(false)}
				currentSettings={settings}
				onUpdate={setSettings}
			/>
		</main>
	);
}
