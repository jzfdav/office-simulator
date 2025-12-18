import { getScheduleForDate } from './simulation.js';
import { render } from './renderer.js';

/**
 * The Time Observer
 * Aligns strictly to wall-clock minutes.
 */
function tick() {
    const now = new Date();
    const activity = getScheduleForDate(now);
    render(activity);
}

// 1. Immediate render on startup
tick();

// 2. Align to the next minute boundary
const now = new Date();
const msToNextMinute = 60000 - (now.getTime() % 60000);

setTimeout(() => {
    // Tick exactly on the minute
    tick();

    // Start the faithful minute loop
    setInterval(tick, 60000);
}, msToNextMinute);

// 3. Handle visibility changes (resume immediately)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        tick();
    }
});
