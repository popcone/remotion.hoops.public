//
import {
	Img,
	AbsoluteFill,
	staticFile,
	useVideoConfig,
	useCurrentFrame,
	interpolate,
} from 'remotion';

// CONSTANTS
import {SCALE} from '../../lib/constants';

// TYPES
type HoopsLogo = {
	size: number;
	position?: number;
};

export const HoopsLogo: React.FC<HoopsLogo> = ({size, position = 12}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 1], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			className="logo-hoops-wrapper"
			style={{opacity: `${interpolate(fadeIn, [0, 1], [0, 1])}`}}
		>
			<div
				style={{position: 'relative', top: `-${position * SCALE}px`}}
				className="logo"
			>
				<Img src={staticFile('img/logo-hoopsfyi-outline.svg')} height={size} />
			</div>
		</AbsoluteFill>
	);
};
