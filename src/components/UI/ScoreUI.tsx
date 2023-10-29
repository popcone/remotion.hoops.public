//
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Rect} from '@remotion/shapes';

// CONSTANTS
import {
	WIDTH,
	SCORE_POSITION,
	UI_SCORE_HEIGHT,
	UI_SCORE_FILL,
	UI_TEAM_SCORE_OPACITY,
} from '../../lib/constants';

export const ScoreUI: React.FC = () => {
	const frame = useCurrentFrame();

	const animateUI: typeof interpolate = (
		start: number,
		duration: number,
		amount: number,
		extrapolate: object
	) => interpolate(frame, [start, duration], [0, amount], extrapolate);

	const animateTeamScoreUI = animateUI(10, 15, WIDTH * 0.4, {
		extrapolateRight: 'clamp',
	});

	const animateClockUI = animateUI(0, 3, WIDTH * 0.2, {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				top: `${SCORE_POSITION}`,
			}}
			className="scoreboard-ui"
		>
			{/* AWAY TEAM */}
			<Rect
				width={animateTeamScoreUI}
				height={UI_SCORE_HEIGHT}
				fill={UI_SCORE_FILL}
				style={{opacity: UI_TEAM_SCORE_OPACITY}}
			/>
			{/* CLOCK */}
			<Rect
				width={animateClockUI}
				height={UI_SCORE_HEIGHT}
				fill={UI_SCORE_FILL}
			/>
			{/* HOME TEAM */}
			<Rect
				width={animateTeamScoreUI}
				height={UI_SCORE_HEIGHT}
				fill={UI_SCORE_FILL}
				style={{opacity: UI_TEAM_SCORE_OPACITY}}
			/>
		</AbsoluteFill>
	);
};
