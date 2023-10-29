//
import {useCurrentFrame, interpolate, Sequence} from 'remotion';

// TYPES
type Title = {
	text: string;
};

export const Title: React.FC<Title> = ({text = 'Title'}) => {
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
						backgroundColor: 'black',
						padding: '0 20px',
					}}
				>
					<h2>{text}</h2>
				</div>
			</Sequence>
		</>
	);
};
