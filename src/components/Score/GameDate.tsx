//
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Rect} from '@remotion/shapes';

// STYLES
import '../../styles/scoreboard.css';
import {SCALE, ONE_SECOND} from '../../lib/constants';

// TYPES
type GameDate = {
	date: number | string;
};

export const GameDate: React.FC<GameDate> = ({date}) => {
	const frame = useCurrentFrame();

	const animateDate: typeof interpolate = (
		start: number,
		duration: number,
		amount: number,
		extrapolate: object
	) => interpolate(frame, [start, duration], [0, amount], extrapolate);

	const animateDateText = animateDate(
		ONE_SECOND * 0.125,
		ONE_SECOND * 0.25,
		1,
		{
			extrapolateRight: 'clamp',
		}
	);

	const animateDateContainer = animateDate(0, ONE_SECOND * 0.25, 170 * SCALE, {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill className="date-wrapper">
			<div
				className="date"
				style={{
					opacity: `${animateDateText}`,
				}}
			>
				{date}
			</div>
			<AbsoluteFill className="date-container-wrapper">
				<Rect
					width={animateDateContainer}
					height={25 * SCALE}
					cornerRadius={28}
					fill="black"
					className="date-container"
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
