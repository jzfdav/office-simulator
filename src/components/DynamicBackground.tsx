import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getThemeForTime, type ThemeColors } from "../logic/theme";

interface Props {
	now: Date;
}

export default function DynamicBackground({ now }: Props) {
	const [theme, setTheme] = useState<ThemeColors>(getThemeForTime(now));

	useEffect(() => {
		setTheme(getThemeForTime(now));
	}, [now]);

	return (
		<div className="dynamic-bg-container">
			<motion.div
				className="gradient-blob blob-1"
				animate={{
					backgroundColor: theme.color1,
					x: ["-10%", "10%", "-5%"],
					y: ["-5%", "15%", "0%"],
				}}
				transition={{
					backgroundColor: { duration: 60, ease: "linear" },
					x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
					y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
				}}
			/>
			<motion.div
				className="gradient-blob blob-2"
				animate={{
					backgroundColor: theme.color2,
					x: ["10%", "-10%", "5%"],
					y: ["10%", "-10%", "0%"],
				}}
				transition={{
					backgroundColor: { duration: 60, ease: "linear" },
					x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
					y: { duration: 28, repeat: Infinity, ease: "easeInOut" },
				}}
			/>
			<motion.div
				className="gradient-blob blob-3"
				animate={{
					backgroundColor: theme.color3,
					x: ["0%", "5%", "-5%"],
					y: ["-10%", "10%", "-5%"],
				}}
				transition={{
					backgroundColor: { duration: 60, ease: "linear" },
					x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
					y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
				}}
			/>
			<div className="bg-overlay" />
		</div>
	);
}
