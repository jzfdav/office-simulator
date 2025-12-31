/**
 * Scheduler Logic
 *
 * Pure, deterministic, stateless.
 * Maps (Date + Settings) -> Activity.
 */

import type { Settings } from "../store/settings";

export interface Activity {
	label: string;
	context: string;
	progress: number; // 0 to 1
}

const OFF_HOURS: Activity = {
	label: "Off Hours",
	context: "Personal Time",
	progress: 1,
};

// Weekday variations (0=Sun, 6=Sat)
const PATTERNS: Record<number, string> = {
	1: "NORMAL", // Mon
	2: "NORMAL", // Tue
	3: "MEETING_HEAVY", // Wed
	4: "NORMAL", // Thu
	5: "LIGHT_FRIDAY", // Fri
};

/**
 * Returns the schedule for a given date and user settings.
 */
export function getSchedule(date: Date, settings: Settings): Activity {
	const { workdayStart: start, workdayEnd: end } = settings;
	if (start === end) return OFF_HOURS;

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const totalMinutes = hours * 60 + minutes;

	// Shift bounds
	const startMins = start * 60;
	const isOvernight = end < start;
	const endMins = (isOvernight ? end + 24 : end) * 60;

	// Check if a given time is within a shift starting on a specific day
	const getBlockInShift = (targetDate: Date, targetMins: number) => {
		const day = targetDate.getDay();
		const pattern = PATTERNS[day];
		if (!pattern) return null;

		const blocks = getBlocksForPattern(pattern, startMins, endMins);
		return blocks.find((b) => targetMins >= b.start && targetMins < b.end);
	};

	// 1. Try if we are in a shift that started TODAY
	let currentBlock = getBlockInShift(date, totalMinutes);

	// 2. If not, and we are in the early morning, try if we are in a shift that started YESTERDAY
	if (!currentBlock && totalMinutes < 1440) {
		const yesterday = new Date(date);
		yesterday.setDate(yesterday.getDate() - 1);
		// If yesterday's shift was overnight, we might still be in it
		if (isOvernight) {
			currentBlock = getBlockInShift(yesterday, totalMinutes + 1440);
		}
	}

	if (!currentBlock) {
		return OFF_HOURS;
	}

	const blockDuration = currentBlock.end - currentBlock.start;
	// Simplified progress calculation using the absolute time relative to block start
	const blockElapsed =
		(currentBlock.start >= 1440 ? totalMinutes + 1440 : totalMinutes) -
		currentBlock.start;
	const progress = Math.max(0, Math.min(1, blockElapsed / blockDuration));

	return {
		label: currentBlock.label,
		context: currentBlock.context,
		progress,
	};
}

interface Block {
	start: number;
	end: number;
	label: string;
	context: string;
}

function getBlocksForPattern(
	pattern: string,
	startMins: number,
	endMins: number,
): Block[] {
	// Normalize relative to start time
	const t = (offsetHours: number, offsetMins = 0) =>
		startMins + offsetHours * 60 + offsetMins;

	const baseSchedule: Block[] = [
		{ start: t(0), end: t(1), label: "Daily Check-in", context: "Morning" },
		{ start: t(1), end: t(3), label: "Deep Focus", context: "Morning" },
		{ start: t(3), end: t(4), label: "Lunch Break", context: "Midday" },
		{ start: t(4), end: t(5, 30), label: "Team Sync", context: "Afternoon" },
		{ start: t(5, 30), end: endMins, label: "Focus", context: "Afternoon" },
	];

	// Filter out blocks that fall entirely outside the window
	let blocks = baseSchedule.filter((b) => b.start < endMins);

	// Clamp the last block to endMins
	if (blocks.length > 0) {
		blocks[blocks.length - 1].end = endMins;
	}

	// Pattern-specific overrides
	if (pattern === "MEETING_HEAVY") {
		const meetingStart = t(5);
		const meetingEnd = t(6);
		if (meetingEnd < endMins) {
			blocks = [
				...blocks.filter((b) => b.end <= meetingStart),
				{
					start: meetingStart,
					end: meetingEnd,
					label: "All-Hands",
					context: "Afternoon",
				},
				...blocks.filter((b) => b.start >= meetingEnd),
			];
		}
	}

	if (pattern === "LIGHT_FRIDAY") {
		const wrapUpStart = Math.max(startMins, endMins - 30);
		blocks = [
			...blocks.filter((b) => b.end <= wrapUpStart),
			{
				start: wrapUpStart,
				end: endMins,
				label: "Wrap Up",
				context: "Weekend Ready",
			},
		];
	}

	return blocks;
}
