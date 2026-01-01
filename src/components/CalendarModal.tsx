import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
	type AgendaItem,
	type DayFlavor,
	generateDailyAgenda,
	getDayFlavor,
} from "../logic/scheduler";
import { useCurrentTime } from "../logic/useCurrentTime";
import type { Settings } from "../store/settings";
import InfoTip from "./InfoTip";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	settings: Settings;
}

const FLAVOR_DESCRIPTIONS: Record<DayFlavor, string> = {
	MEETING_HEAVY: "Collaborative",
	FOCUS_HEAVY: "Focused Work",
	BALANCED: "Standard Flow",
	LIGHT: "Light Load",
	CHAOTIC: "Dynamic Flow",
};

export default function CalendarModal({ isOpen, onClose, settings }: Props) {
	const now = useCurrentTime();
	const [agenda, setAgenda] = useState<AgendaItem[]>([]);
	const [flavor, setFlavor] = useState<DayFlavor>("BALANCED");

	useEffect(() => {
		if (isOpen) {
			setAgenda(generateDailyAgenda(now, settings));
			setFlavor(getDayFlavor(now));
		}
	}, [isOpen, now, settings]);

	// Calculate current time in minutes from midnight (0-1440+)
	// If overnight shift and time is past midnight, it might be e.g., 25:00
	const currentMins = now.getHours() * 60 + now.getMinutes();

	// Helper to handle overnight wrap-around for display
	const formatTime = (totalMins: number) => {
		const normalized = totalMins % 1440;
		const h = Math.floor(normalized / 60);
		const m = normalized % 60;
		const ampm = h >= 12 ? "PM" : "AM";
		const h12 = h % 12 || 12;
		const mStr = m.toString().padStart(2, "0");
		return `${h12}:${mStr} ${ampm}`;
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="modal-backdrop"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={(e) => {
						if (e.target === e.currentTarget) onClose();
					}}
				>
					<motion.div
						className="modal-card calendar-modal"
						initial={{ scale: 0.95, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.95, opacity: 0, y: 20 }}
						transition={{ type: "spring", stiffness: 350, damping: 25 }}
					>
						<div className="modal-header">
							<h2>Daily Agenda</h2>
							<button type="button" className="icon-btn" onClick={onClose}>
								<X size={20} />
							</button>
						</div>

						<div className="flavor-banner">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginBottom: "0.5rem",
								}}
							>
								<span className="flavor-label" style={{ marginBottom: 0 }}>
									Today's dynamic:
								</span>
								<InfoTip text="Every day has a unique rhythm (Meeting Heavy, Focus Heavy, Balanced). This is strictly time-based and requires no action." />
							</div>
							<span className="flavor-value">
								{FLAVOR_DESCRIPTIONS[flavor]}
							</span>
						</div>

						<div className="agenda-list">
							{agenda.length === 0 ? (
								<div className="empty-state">No scheduled activities.</div>
							) : (
								agenda.map((item) => {
									// Determine if this item is active
									// We need to handle the case where "currentMins" is relative to the start of the shift
									// But for simplicity, let's just check raw ranges or handle overnight logic if needed.
									// Actually, let's assume raw minutes match the generated agenda items unless weird overnight wrap.
									// Agenda items for overnight shifts (e.g. start 22:00 end 06:00 next day) might go 1320 -> 1800.
									// If now is 01:00 (60 mins), we should treat it as 1500 for comparison if the shift started yesterday.
									// For visual simplicity, we won't over-engineer "current" highlight perfectly for overnight edgecases right here
									// without passing the "shift relative time" context.
									// Let's rely on simple range check, assuming agenda is built for "Today's Shift" context.

									let isCurrent = false;
									// Check if "now" falls in this block.
									// We need to know if we are in "Today's Shift" mode or normal mode.
									// If generating agenda for "Today", agenda absolute mins might be > 1440.
									// If "now" matches that raw value (e.g. we are late night), fine.
									// But if it's 1am and shift started yesterday activity, "now" is 60.
									// The agenda item is 1500.

									// We'll trust the scheduler's robust current check mostly,
									// but for the UI we'll do a simple best-effort highlight
									// matching what `currentMins` or `currentMins + 1440` hits.

									if (
										(currentMins >= item.start && currentMins < item.end) ||
										(currentMins + 1440 >= item.start &&
											currentMins + 1440 < item.end)
									) {
										isCurrent = true;
									}

									return (
										<motion.div
											key={`${item.label}-${item.start}`}
											className={`agenda-item ${isCurrent ? "active" : ""} ${item.type}`}
											animate={
												isCurrent
													? {
															scale: [1, 1.02, 1],
															backgroundColor: [
																"rgba(255, 255, 255, 0.12)",
																"rgba(255, 255, 255, 0.16)",
																"rgba(255, 255, 255, 0.12)",
															],
															borderColor: [
																"rgba(255, 255, 255, 0.1)",
																"rgba(255, 255, 255, 0.3)",
																"rgba(255, 255, 255, 0.1)",
															],
														}
													: undefined
											}
											transition={
												isCurrent
													? {
															duration: 4,
															repeat: Number.POSITIVE_INFINITY,
															ease: "easeInOut",
														}
													: undefined
											}
										>
											<div className="time-col">
												<span className="time-start">
													{formatTime(item.start)}
												</span>
												<span className="duration">
													{Math.round(item.end - item.start)}m
												</span>
											</div>
											<div className="info-col">
												<span className="item-label">{item.label}</span>
												<span className="item-context">{item.context}</span>
											</div>
										</motion.div>
									);
								})
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
