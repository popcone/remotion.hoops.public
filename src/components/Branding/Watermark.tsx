//
import {
	AbsoluteFill,
	useVideoConfig,
	useCurrentFrame,
	interpolate,
} from 'remotion';

// STYLES
import '../../styles/scoreboard.css';

export const WatermarkText: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const animateWatermark = interpolate(frame, [0, durationInFrames], [0, 177], {
		extrapolateRight: 'clamp',
	});

	const TextWatermarkStyle: React.CSSProperties = {
		left: `${animateWatermark}px`,
	};

	return (
		<AbsoluteFill className="text-watermark" style={TextWatermarkStyle}>
			{[1, 2, 3, 4, 5].map((i) => (
				<div key={`watermark-${i}`}>{process.env.REMOTION_WATERMARK_TEXT}</div>
			))}
		</AbsoluteFill>
	);
};
