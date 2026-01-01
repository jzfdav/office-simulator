import { motion } from "framer-motion";

interface Props {
	onDismiss: () => void;
}

export default function IntroOverlay({ onDismiss }: Props) {
	return (
		<motion.div
			className="intro-overlay"
			onClick={onDismiss}
			exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeOut" } }}
		>
			<div className="intro-content">
				<p
					style={{
						fontWeight: 600,
						letterSpacing: "0.1em",
						marginBottom: "0.5rem",
					}}
				>
					Work Rhythm
				</p>
				<p>A re-entry companion.</p>
				<p style={{ fontSize: "1.1rem", opacity: 0.7 }}>
					It simulates the flow of a workday.
				</p>
				<span className="intro-hint">Tap to begin</span>
			</div>
		</motion.div>
	);
}
