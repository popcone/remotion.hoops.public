import {Composition, staticFile} from 'remotion';
import {
	PlayByPlayPortrait,
	PlayByPlayPortraitSchema,
} from './components/PlayByPlayPortrait';

// Constants
import {VIDEO_DURATION, VIDEO_FPS} from './lib/constants';

// Variables
const gameData = process.env.REMOTION_GAME_DATA as string;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="PlayByPlayPortrait"
				component={PlayByPlayPortrait}
				durationInFrames={VIDEO_DURATION * VIDEO_FPS}
				fps={VIDEO_FPS}
				width={1080}
				height={1920}
				schema={PlayByPlayPortraitSchema}
				defaultProps={{
					data: {},
					splashColor: 'secondary' as const,
					scoringColor: 'primary' as const,
					logoBackgroundColor: 'secondary' as const,
					backgroundColor: 'primary' as const,
				}}
				calculateMetadata={async ({props}) => {
					const response = await fetch(staticFile(`${gameData}`));
					const data = await response.json();

					return {
						props: {
							...props,
							data: data,
						},
					};
				}}
			/>
		</>
	);
};
