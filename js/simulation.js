/**
 * Simulation Rules
 * Strictly maps a specific time to a static activity.
 * No state. No side effects.
 */

const SCHEDULE_WEEKDAY = [
    { start: 9 * 60, end: 10 * 60, label: "Daily Check-in", context: "Morning" },
    { start: 10 * 60, end: 12 * 60, label: "Deep Focus", context: "Morning" },
    { start: 12 * 60, end: 13 * 60, label: "Lunch Break", context: "Midday" },
    { start: 13 * 60, end: 14 * 60 + 30, label: "Team Sync", context: "Afternoon" },
    { start: 14 * 60 + 30, end: 16 * 60 + 30, label: "Focus", context: "Afternoon" },
    { start: 16 * 60 + 30, end: 17 * 60, label: "Wrap Up", context: "Evening" }
];

const OFF_HOURS = {
    label: "Off Hours",
    context: "Personal Time"
};

/**
 * Returns the activity for a given point in time.
 * @param {Date} date
 * @returns {{label: string, context: string}}
 */
export function getScheduleForDate(date) {
    const day = date.getDay(); // 0 = Sun, 6 = Sat
    const currentMinutes = date.getHours() * 60 + date.getMinutes();

    // Weekend check
    if (day === 0 || day === 6) {
        return OFF_HOURS;
    }

    // Workday lookup
    const block = SCHEDULE_WEEKDAY.find(b =>
        currentMinutes >= b.start && currentMinutes < b.end
    );

    return block ? { label: block.label, context: block.context } : OFF_HOURS;
}
