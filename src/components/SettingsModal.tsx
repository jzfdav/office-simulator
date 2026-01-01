import { AnimatePresence, motion } from "framer-motion";
import { Check, Download, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type Settings, SettingsStore } from "../store/settings";
import SegmentedControl from "./SegmentedControl";
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
	const [projectName, setProjectName] = useState(
		currentSettings.projectName || "Primary Project",
	);

	// Reset local state when modal opens to ensure we start from saved values
	useEffect(() => {
		if (isOpen) {
			setStart(currentSettings.workdayStart);
			setEnd(currentSettings.workdayEnd);
			setFormat(currentSettings.timeFormat);
			setProjectName(currentSettings.projectName || "Primary Project");
		}
	}, [isOpen, currentSettings]);

	const handleSave = () => {
		const updated = SettingsStore.save({
			workdayStart: start,
			workdayEnd: end,
			timeFormat: format,
			projectName,
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
					onClick={onClose}
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
						onClick={(e) => e.stopPropagation()}
					>
						<div className="modal-header">
							<h2>Preferences</h2>
							<button type="button" onClick={onClose} className="icon-btn">
								<X size={20} strokeWidth={1.5} />
							</button>
						</div>

						<div className="modal-body">
							<SegmentedControl
								label="Time Format"
								value={format}
								onChange={setFormat}
								options={[
									{ label: "24-HOUR", value: "24h" },
									{ label: "12-HOUR", value: "12h" },
								]}
							/>

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

							<div style={{ marginTop: "1.5rem" }}>
								<label
									className="input-label"
									style={{ marginBottom: "0.5rem", display: "block" }}
								>
									Project Name
									<input
										type="text"
										value={projectName}
										onChange={(e) => setProjectName(e.target.value)}
										style={{
											width: "100%",
											background: "rgba(255,255,255,0.05)",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: "8px",
											padding: "0.8rem",
											marginTop: "0.5rem",
											color: "#fff",
											fontSize: "1rem",
											outline: "none",
											display: "block",
										}}
										onFocus={(e) => {
											e.target.style.borderColor = "rgba(255,255,255,0.3)";
										}}
										onBlur={(e) => {
											e.target.style.borderColor = "rgba(255,255,255,0.1)";
										}}
									/>
								</label>
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="button"
								onClick={onClose}
								className="cancel-btn"
								style={{ flex: 1 }}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleSave}
								className="save-btn"
								style={{ flex: 2 }}
							>
								<Check size={16} strokeWidth={3} /> Save
							</button>
						</div>

						<div className="modal-section" style={{ marginTop: "2rem" }}>
							<h3
								className="section-label"
								style={{
									fontSize: "0.75rem",
									textTransform: "uppercase",
									letterSpacing: "0.1em",
									color: "rgba(255,255,255,0.4)",
									marginBottom: "1rem",
									marginTop: "1.5rem",
									paddingTop: "1.5rem",
									borderTop: "1px solid rgba(255,255,255,0.1)",
								}}
							>
								Data & Privacy
							</h3>

							<div style={{ display: "flex", gap: "0.5rem" }}>
								<button
									type="button"
									onClick={() => SettingsStore.exportData()}
									className="cancel-btn"
									style={{ flex: 1, fontSize: "0.8rem", padding: "0.6rem" }}
								>
									<Download size={14} style={{ marginRight: 6 }} /> Export JSON
								</button>
								<button
									type="button"
									onClick={() => {
										if (
											window.confirm(
												"Are you sure? This will maintain absolute privacy by nuking all local data and reloading the app.",
											)
										) {
											SettingsStore.reset();
										}
									}}
									className="cancel-btn"
									style={{
										flex: 1,
										fontSize: "0.8rem",
										padding: "0.6rem",
										borderColor: "rgba(255, 100, 100, 0.3)",
										color: "rgba(255, 150, 150, 0.8)",
									}}
								>
									<Trash2 size={14} style={{ marginRight: 6 }} /> Reset All
								</button>
							</div>
						</div>

						<div className="credits-footer">
							<p className="credits-text">Work Rhythm</p>
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
