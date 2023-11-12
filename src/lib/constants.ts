// VIDEO DURATION
export const [VIDEO_DURATION, VIDEO_FPS] = [31, 30]; // DURATION, IN SECONDS
export const ONE_SECOND = VIDEO_FPS; // 1 SECOND = 30 FRAMES

// VIDEO DIMENSIONS
export const [HEIGHT, WIDTH] = [1920, 1080];

// VIDEO SCALE
export const SCALE = 2.275;

// ANIMATION STEPS
const ANIMATION_STEPS = [1, 90];
export const [FIRST_STEP, SECOND_STEP] = ANIMATION_STEPS;

// UI
export const UI_SCORE_HEIGHT = 60 * SCALE;
export const UI_SCORE_FILL = '#1D1D1D';
export const UI_TEAM_SCORE_OPACITY = 0.5;

export const SCORE_POSITION = `${335 * SCALE}px`;

// GAME INFO
export const DATE_OPTIONS: {[key: string]: string} = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	// TODO: Refactor to extract timestamp from original game data
	timeZone: 'UTC',
} as const;

// TEAM LOGO
export const TEAM_LOGO_SIZE = 188 * SCALE;

// COLORS
export const COLORS = ['primary', 'secondary', 'tertiary'] as const;
