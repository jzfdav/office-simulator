import {
	animate,
	type MotionValue,
	motion,
	type PanInfo,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
	value: number;
	options: number[];
	onChange: (val: number) => void;
	format?: (val: number) => string;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3; // Center + 1 above + 1 below

export default function WheelPicker({
	value,
	options,
	onChange,
	format,
}: Props) {
	const y = useMotionValue(0);
	const [currentIndex, setCurrentIndex] = useState(options.indexOf(value));

	// Initial position
	useEffect(() => {
		const idx = options.indexOf(value);
		if (idx !== -1) {
			y.set(-idx * ITEM_HEIGHT);
			setCurrentIndex(idx);
		}
	}, [value, options, y]);

	const handleDragEnd = (_: unknown, info: PanInfo) => {
		const currentY = y.get();
		// Momentum calculation
		const velocity = info.velocity.y;
		const targetTranslateY = currentY + velocity * 0.2; // Factor for momentum

		const idx = Math.round(-targetTranslateY / ITEM_HEIGHT);
		const clampedIdx = Math.max(0, Math.min(options.length - 1, idx));

		animate(y, -clampedIdx * ITEM_HEIGHT, {
			type: "spring",
			stiffness: 400,
			damping: 30,
			onComplete: () => {
				onChange(options[clampedIdx]);
			},
		});
	};

	// Vibrate on change (Haptic tick)
	useEffect(() => {
		const unsubscribe = y.on("change", (latest) => {
			const idx = Math.round(-latest / ITEM_HEIGHT);
			if (idx !== currentIndex && idx >= 0 && idx < options.length) {
				setCurrentIndex(idx);
				if ("vibrate" in navigator) {
					navigator.vibrate(1);
				}
			}
		});
		return unsubscribe;
	}, [currentIndex, options.length, y]);

	return (
		<div
			className="wheel-picker-container"
			style={{
				height: ITEM_HEIGHT * VISIBLE_ITEMS,
				overflow: "hidden",
				position: "relative",
				maskImage:
					"linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
				WebkitMaskImage:
					"linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
			}}
		>
			<motion.div
				drag="y"
				dragConstraints={{
					top: -(options.length - 1) * ITEM_HEIGHT,
					bottom: 0,
				}}
				dragElastic={0.1}
				onDragEnd={handleDragEnd}
				style={{ y }}
				className="wheel-picker-list"
			>
				{options.map((option, i) => {
					return (
						<PickerItem
							key={option}
							option={option}
							format={format}
							y={y}
							index={i}
						/>
					);
				})}
			</motion.div>
			{/* Center highlight */}
			<div
				style={{
					position: "absolute",
					top: ITEM_HEIGHT,
					left: 0,
					right: 0,
					height: ITEM_HEIGHT,
					borderTop: "0.5px solid rgba(255,255,255,0.1)",
					borderBottom: "0.5px solid rgba(255,255,255,0.1)",
					pointerEvents: "none",
				}}
			/>
		</div>
	);
}

function PickerItem({
	option,
	format,
	y,
	index,
}: {
	option: number;
	format?: (v: number) => string;
	y: MotionValue<number>;
	index: number;
}) {
	const range = [
		(index - 1) * -ITEM_HEIGHT,
		index * -ITEM_HEIGHT,
		(index + 1) * -ITEM_HEIGHT,
	];

	const opacity = useTransform(y, range, [0.3, 1, 0.3]);
	const scale = useTransform(y, range, [0.8, 1.2, 0.8]);
	const rotateX = useTransform(y, range, [45, 0, -45]);

	return (
		<motion.div
			style={{
				height: ITEM_HEIGHT,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				opacity,
				scale,
				rotateX,
				perspective: 1000,
			}}
			className="wheel-picker-item"
		>
			{format ? format(option) : option}
		</motion.div>
	);
}
