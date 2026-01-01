import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function PhilosophyModal({ isOpen, onClose }: Props) {
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
						className="modal-card"
						initial={{ scale: 0.95, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.95, opacity: 0, y: 20 }}
						style={{ maxWidth: "500px" }}
					>
						<div className="modal-header">
							<h2>Philosophy</h2>
							<button type="button" className="icon-btn" onClick={onClose}>
								<X size={20} />
							</button>
						</div>

						<div
							className="modal-body"
							style={{
								lineHeight: "1.6",
								color: "rgba(255,255,255,0.8)",
								fontSize: "1rem",
								gap: "1.5rem",
							}}
						>
							<p>
								<strong>Work Rhythm</strong> is a re-entry companion, not a
								productivity tool.
							</p>

							<p>
								Returning to the workplace after a long absence—whether for
								vacation, parental leave, or recovery—can be jarring. The rigid
								schedules and constant cognitive shifts require a specific
								mental endurance.
							</p>

							<div
								style={{
									background: "rgba(255,255,255,0.05)",
									padding: "1.2rem",
									borderRadius: "12px",
									borderLeft: "3px solid rgba(255,255,255,0.2)",
								}}
							>
								<p style={{ margin: 0, fontStyle: "italic" }}>
									"It doesn't give you real work; it gives you the rhythm of
									work."
								</p>
							</div>

							<div>
								<h3
									style={{
										fontSize: "0.9rem",
										textTransform: "uppercase",
										letterSpacing: "0.1em",
										color: "rgba(255,255,255,0.4)",
										marginBottom: "0.5rem",
									}}
								>
									How to use
								</h3>
								<ul
									style={{
										paddingLeft: "1.2rem",
										display: "flex",
										flexDirection: "column",
										gap: "0.5rem",
									}}
								>
									<li>Keep it open on your desk.</li>
									<li>Let the background shift mark the passing of time.</li>
									<li>
										Notice the "meetings" and "focus blocks" without feeling
										compelled to act.
									</li>
								</ul>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
