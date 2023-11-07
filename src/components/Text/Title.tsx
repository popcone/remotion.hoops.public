//
import {useCurrentFrame, interpolate, Sequence} from 'remotion';

// STYLES
import '../../styles/scoreboard.css';

// TYPES
type Title = {
	text: string;
	background?: string;
};

export const Title: React.FC<Title> = ({
	text = 'Title',
	background = 'transparent',
}) => {
	const frame = useCurrentFrame();

	const animateTitle = interpolate(frame, [0, 10], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const TextContainerStyle: React.CSSProperties = {
		opacity: `${animateTitle}`,
		backgroundColor: background,
	};

	return (
		<Sequence className="title-wrapper">
			<div style={TextContainerStyle} className="text-container">
				<div className="text-h2">{text}</div>
			</div>
		</Sequence>
	);
};
