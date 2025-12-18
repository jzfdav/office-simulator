/**
 * Rendering Logic
 * Strictly updates the DOM based on the provided activity.
 * No state. No calculations.
 */

/**
 * Updates the screen with the current activity.
 * @param {{label: string, context: string}} activity
 */
export function render(activity) {
    // Silent fail if activity is missing
    if (!activity) return;

    // Lookup elements dynamically to avoid module stiffness
    const labelElement = document.getElementById('activity-display');
    const contextElement = document.getElementById('activity-context');

    // Text updates
    if (labelElement) {
        labelElement.textContent = activity.label;
    }

    if (contextElement) {
        contextElement.textContent = activity.context;
    }
}
