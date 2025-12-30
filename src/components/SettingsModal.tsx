import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { type Settings, SettingsStore } from "../store/settings";
import WheelPicker from "./WheelPicker";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentSettings: Settings;
	onUpdate: (s: Settings) => void;
}

export default function SettingsModal({
	isOpen,
	onClose,
	currentSettings,
	onUpdate,
}: Props) {
	const [start, setStart] = useState(currentSettings.workdayStart);
	const [end, setEnd] = useState(currentSettings.workdayEnd);
	const [format, setFormat] = useState(currentSettings.timeFormat);

	const handleSave = () => {
		const updated = SettingsStore.save({
			workdayStart: start,
			workdayEnd: end,
			timeFormat: format,
		});
		onUpdate(updated);
		onClose();
	};

	const hours = Array.from({ length: 24 }, (_, i) => i);

	const formatHour = (h: number) => {
		if (format === "24h") return h.toString().padStart(2, "0");
		const suffix = h >= 12 ? "PM" : "AM";
		const hour12 = h % 12 || 12;
		return `${hour12} ${suffix}`;
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="modal-backdrop"
					initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
					animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
					exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
					transition={{ duration: 0.4 }}
				>
					<motion.div
						className="modal-card"
						initial={{ scale: 0.96, opacity: 0, y: 10 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.96, opacity: 0, y: 10 }}
						transition={{
							type: "spring",
							stiffness: 350,
							damping: 25,
							mass: 0.8,
						}}
					>
						<div className="modal-header">
							<h2>Preferences</h2>
							<button type="button" onClick={onClose} className="icon-btn">
								<X size={20} strokeWidth={1.5} />
							</button>
						</div>

						<div className="modal-body">
							<div className="segmented-control">
								<button
									type="button"
									aria-pressed={format === "24h"}
									className={`segmented-option ${format === "24h" ? "active" : ""}`}
									onClick={() => setFormat("24h")}
								>
									24-HOUR
								</button>
								<button
									type="button"
									aria-pressed={format === "12h"}
									className={`segmented-option ${format === "12h" ? "active" : ""}`}
									onClick={() => setFormat("12h")}
								>
									12-HOUR
								</button>
								<div
									className="segmented-slider"
									style={{
										left: format === "24h" ? "2px" : "calc(50% - 1px)",
										width: "50%",
									}}
								/>
							</div>

							<div
								style={{
									display: "flex",
									gap: "1rem",
									justifyContent: "space-between",
								}}
							>
								<div style={{ flex: 1, textAlign: "center" }}>
									<span
										className="input-label"
										style={{ marginBottom: "1rem", display: "block" }}
									>
										Start
									</span>
									<WheelPicker
										value={start}
										options={hours}
										onChange={setStart}
										format={formatHour}
									/>
								</div>
								<div style={{ flex: 1, textAlign: "center" }}>
									<span
										className="input-label"
										style={{ marginBottom: "1rem", display: "block" }}
									>
										End
									</span>
									<WheelPicker
										value={end}
										options={hours}
										onChange={setEnd}
										format={formatHour}
									/>
								</div>
							</div>
						</div>

						<div className="modal-footer">
							<button type="button" onClick={handleSave} className="save-btn">
								<Check size={16} strokeWidth={3} /> Save
							</button>
						</div>

						<div className="credits-footer">
							<p className="credits-text">OFFICE SIMULATOR</p>
							<p className="credits-text">
								v
								{new Date(__BUILD_TIME__)
									.toISOString()
									.slice(2, 10)
									.replace(/-/g, ".")}{" "}
								• JZFDAV
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
