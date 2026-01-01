import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface Props {
	text: string;
}

export default function InfoTip({ text }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div style={{ display: "inline-block", marginLeft: "0.5rem" }}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				style={{
					background: "none",
					border: "none",
					cursor: "pointer",
					color: isOpen ? "#fff" : "rgba(255,255,255,0.3)",
					display: "flex",
					alignItems: "center",
					padding: "2px",
					transition: "color 0.2s",
				}}
				aria-label="More information"
			>
				<HelpCircle size={14} strokeWidth={2} />
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0, marginTop: 0 }}
						animate={{ opacity: 1, height: "auto", marginTop: 8 }}
						exit={{ opacity: 0, height: 0, marginTop: 0 }}
						style={{
							overflow: "hidden",
							fontSize: "0.8rem",
							color: "rgba(255,255,255,0.7)",
							lineHeight: 1.4,
							fontStyle: "italic",
							borderLeft: "2px solid rgba(255,255,255,0.2)",
							paddingLeft: "0.75rem",
						}}
					>
						{text}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
