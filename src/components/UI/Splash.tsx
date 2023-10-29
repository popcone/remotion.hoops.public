//
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	Sequence,
	useVideoConfig,
} from 'remotion';

// COMPONENTS
import {SplashDoor} from './SlidingDoor';
import {Title} from '../Text/Title';

// STYLES
import '../../styles/scoreboard.css';

// CONSTANTS
import {SCALE, HEIGHT, DISCLAIMER_TEXT, ONE_SECOND} from '../../lib/constants';

// UTILS
import '../../lib/extensions/contrastTextColor';

// VARIABLES
const SLIDING_DOOR_POSITION_AWAY = 398 * SCALE;

// TYPES
type Splash = {
	teams: Record<string, any>;
	date: string;
	splashColor: number;
};

export const Splash: React.FC<Splash> = ({teams, date, splashColor}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const DOOR_ANIMATION_DURATION = 7;
	const startDoorAnimation = durationInFrames - DOOR_ANIMATION_DURATION;

	const disclaimerColor = teams['away']['colors'][splashColor]
		?.toLowerCase()
		.contrastTextColor();

	const animateSlidingDoor: typeof interpolate = (
		startPosition: number,
		startAnimationPosition: number,
		endPosition: number
	) =>
		interpolate(
			frame,
			[0, startDoorAnimation, durationInFrames],
			[startPosition, startAnimationPosition, endPosition],
			{
				extrapolateRight: 'clamp',
			}
		);

	const animateSlidingDoorHome = animateSlidingDoor(0, 0, -HEIGHT * 0.5 * 2);
	const animateSlidingDoorAway = animateSlidingDoor(
		SLIDING_DOOR_POSITION_AWAY,
		SLIDING_DOOR_POSITION_AWAY,
		HEIGHT * 2
	);

	return (
		<AbsoluteFill className="splash-wrapper">
			{Object.keys(teams).map((team) => {
				return (
					<>
						{/* TODO: Clean Up - positioning, z-index, shape height, style DATE to match the TITLE, move to a TITLE component */}
						<AbsoluteFill style={{zIndex: '99'}}>
							<Sequence
								from={ONE_SECOND}
								durationInFrames={
									durationInFrames - ONE_SECOND - DOOR_ANIMATION_DURATION
								}
								style={{top: `${120 * SCALE}px`}}
							>
								<div style={{width: '5000px'}}>
									<Title text="Scoring Breakdown" />
								</div>
							</Sequence>
							<Sequence
								from={ONE_SECOND * 1.5}
								durationInFrames={
									durationInFrames - ONE_SECOND * 1.5 - DOOR_ANIMATION_DURATION
								}
								style={{top: `${695 * SCALE}px`}}
							>
								<Title text={date} />
							</Sequence>
						</AbsoluteFill>
						<Sequence durationInFrames={startDoorAnimation}>
							<AbsoluteFill
								style={{
									// TODO: Make this dynamic
									top: `${HEIGHT - 52 * SCALE}px`,
								}}
								className="disclaimer"
							>
								<p className={`text-body-2 ${disclaimerColor}`}>
									{process.env.REMOTION_DISCLAIMER_TEXT}
								</p>
							</AbsoluteFill>
						</Sequence>
						<AbsoluteFill
							style={{
								top: `${
									team === 'home'
										? animateSlidingDoorHome
										: animateSlidingDoorAway
								}px`,
							}}
						>
							<SplashDoor
								key={`splash-door-${team}`}
								fillColor={teams[team]['colors'][splashColor]}
								teams={teams}
								team={team}
							/>
						</AbsoluteFill>
					</>
				);
			})}
		</AbsoluteFill>
	);
};
