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

	return (
		<>
			<Sequence
				style={{
					zIndex: '3',
					height: 'fit-content',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						opacity: `${animateTitle}`,
						backgroundColor: background,
						padding: '0 36px',
						borderRadius: '12px',
					}}
				>
					<div className="text-h2">{text}</div>
				</div>
			</Sequence>
		</>
	);
};
