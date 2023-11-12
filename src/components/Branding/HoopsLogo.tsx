//
import {
	Img,
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
	style?: 'outlined' | 'blue' | 'blue-outlined-dark';
};

export const HoopsLogo: React.FC<HoopsLogo> = ({
	size,
	position = 12,
	style = 'outlined',
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, fps * 1], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const logoStyle = (style: string) => {
		const styleSelection = new Map([
			['outlined', outlined],
			['blue', blue],
			['blue-outlined-dark', blueOutlinedDark],
		]);
		return styleSelection.get(style);
	};

	const outlined = staticFile(
		`${process.env.REMOTION_HOOPS_FYI_LOGO_OUTLINED}`
	);
	const blue = staticFile(`${process.env.REMOTION_HOOPS_FYI_LOGO_BLUE}`);
	const blueOutlinedDark = staticFile(
		`${process.env.REMOTION_HOOPS_FYI_LOGO_BLUE_OUTLINED_DARK}`
	);

	const HoopsLogoStyle: React.CSSProperties = {
		position: 'relative',
		top: `-${position * SCALE}px`,
		opacity: `${interpolate(fadeIn, [0, 1], [0, 1])}`,
	};

	return (
		<div style={HoopsLogoStyle}>
			<Img src={`${logoStyle(style)}`} height={size} />
		</div>
	);
};
