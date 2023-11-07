//
import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

// Styles
import '../../styles/scoreboard.css';

// Utils
import {HEIGHT} from '../../lib/constants';

// Types
type WinningColorOverlay = {
	winningColor: 'string';
	durationInFrames: number;
};

export const WinningColorOverlay: React.FC<WinningColorOverlay> = ({
	winningColor,
	durationInFrames,
}) => {
	const frame = useCurrentFrame();

	const animateColorOverlay = interpolate(
		frame,
		[0, durationInFrames],
		[0, HEIGHT * 0.65]
	);

	const WinningTeamColorOverlayStyle: React.CSSProperties = {
		transform: `translateY(-${animateColorOverlay}px)`,
		backgroundColor: `${winningColor}`,
	};

	return (
		<AbsoluteFill
			style={WinningTeamColorOverlayStyle}
			className="winning-team-color-overlay"
		></AbsoluteFill>
	);
};
