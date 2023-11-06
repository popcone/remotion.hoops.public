//
import React from 'react';
import {AbsoluteFill, Freeze, useVideoConfig} from 'remotion';

// COMPONENTS
import {TeamLogo} from '../Teams/TeamLogo';

// STYLES
import '../../styles/scoreboard.css';

// CONSTANTS
import {SCALE, TEAM_LOGO_SIZE} from '../../lib/constants';
const SVG_HEIGHT = 452 * SCALE;
const SVG_WIDTH = 475 * SCALE;

// UTILS
import '../../lib/extensions/contrastTextColor';

// TYPES
type SplashDoor = {
	teams: Record<string, any>;
	team: string;
	fillColor: string;
};

type SvgPath = {
	[key: string]: string;
};

// VARIABLES
// TODO: Move to an external styles file
const teamVariables = {
	home: {
		top: SVG_HEIGHT - TEAM_LOGO_SIZE - 64 * SCALE + `px`,
	},
	away: {
		top: 64 * SCALE + `px`,
	},
};
const svgPath: SvgPath = {
	away: 'M475 452L0 452L3.95151e-05 -1.10082e-05L475 60L475 452Z',
	home: 'M0 0H475V452L0 392V0Z',
};

export const SplashDoor: React.FC<SplashDoor> = ({teams, team, fillColor}) => {
	const {durationInFrames} = useVideoConfig();

	const textColor = fillColor?.toLowerCase().contrastTextColor();

	return (
		<AbsoluteFill className={`splash-door-${team}`}>
			<AbsoluteFill
				className="splash-door-content"
				style={{
					height: `${TEAM_LOGO_SIZE}px`,
					top: `${teamVariables[team]['top']}`,
				}}
			>
				<div className="logo-wrapper">
					<Freeze frame={durationInFrames}>
						<TeamLogo
							logo={teams[team]['logo']}
							size={TEAM_LOGO_SIZE}
							key={`${team}-logo`}
						/>
					</Freeze>
				</div>
				<div className="team-name">
					<div className={`${textColor}`}>
						<p>{team} Team</p>
						<div className="text-h3">
							{teams[[team]]['city_name']}
							<br />
							{teams[[team]]['nickname']}
						</div>
					</div>
				</div>
			</AbsoluteFill>
			<svg
				width={SVG_WIDTH}
				height={SVG_HEIGHT}
				viewBox={`0 0 475 452`}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* <mask> */}
				<path d={svgPath[team]} fill={fillColor} />
				{/* </mask> */}
			</svg>
		</AbsoluteFill>
	);
};
