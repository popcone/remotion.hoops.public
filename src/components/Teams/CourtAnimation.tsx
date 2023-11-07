import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Court} from '../Teams/Court';

type CourtAnimation = {
	abbreviation: string;
};

export const CourtAnimation: React.FC<CourtAnimation> = ({abbreviation}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 7], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const position = interpolate(frame, [0, 3.5], [125, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<AbsoluteFill style={{left: `${position}%`}}>
				<Court abbreviation={abbreviation} opacity={opacity} />
			</AbsoluteFill>
		</>
	);
};
