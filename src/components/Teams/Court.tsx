import {Img, staticFile} from 'remotion';

type Court = {
	abbreviation: string;
	opacity: number;
};

export const Court: React.FC<Court> = ({abbreviation, opacity}) => {
	const CourtStyle: React.CSSProperties = {
		zIndex: 7,
		opacity: opacity,
	};

	return (
		<div style={CourtStyle}>
			<Img
				src={staticFile(
					`img/in-season-courts/${abbreviation}-city-edition-court-1568x882.png`
				)}
				width="100%"
			/>
		</div>
	);
};
