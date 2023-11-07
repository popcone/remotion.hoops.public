//
import {
	AbsoluteFill,
	useCurrentFrame,
	interpolate,
	useVideoConfig,
} from 'remotion';

// COMPONENTS
import {TeamLogo} from '../../components/Teams/TeamLogo';

// TYPES
type TeamLogoWindow = {
	teams: Record<string, any>;
	logoBackgroundColor: number;
};

export const TeamLogoWindow: React.FC<TeamLogoWindow> = ({
	teams,
	logoBackgroundColor,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const animateBackground: typeof interpolate = (
		startPosition: number,
		endPosition: number
	) =>
		interpolate(frame, [0, durationInFrames], [startPosition, endPosition], {
			extrapolateRight: 'clamp',
		});

	return (
		<AbsoluteFill className="logo-wrapper-outer">
			{Object.keys(teams).map((team) => (
				<div
					key={`${team}-logo-wrapper`}
					className="logo-wrapper-inner"
					style={{
						backgroundColor: `${teams[team]['colors'][logoBackgroundColor]}`,
					}}
				>
					<div
						key={`${team}-logo-bg`}
						className="logo-wrapper-bg"
						style={{
							backgroundImage: `url(${teams[team]['logo']})`,
							backgroundPosition: `-${animateBackground(
								0,
								33
							)}px -${animateBackground(133, 166)}px`,
						}}
					></div>
					<div className="logo-wrapper">
						<TeamLogo
							logo={teams[team]['logo']}
							size={377}
							key={`${team}-logo`}
						/>
					</div>
				</div>
			))}
		</AbsoluteFill>
	);
};
