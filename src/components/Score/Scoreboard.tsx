//
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

// COMPONENTS
import {WinningColorOverlay} from '../../components/UI/WinningColorOverlay';

// STYLES
import '../../styles/scoreboard.css';

// CONSTANTS
import {SCORE_POSITION} from '../../lib/constants';

// UTILS
import '../../lib/extensions/truncateNames';
import '../../lib/extensions/contrastTextColor';

// TYPES
type Scoreboard = {
	teams: Record<string, any>;
	scores: Record<string, any>[];
	scoringColor: number;
	backgroundColor: number;
};

export const Scoreboard: React.FC<Scoreboard> = ({
	teams,
	scores,
	scoringColor,
	backgroundColor,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const scoringInstances = scores.length - 1;

	const intervals = Math.ceil(frame / (durationInFrames / scoringInstances));
	const activeScore = [scores[intervals]['away'], scores[intervals]['home']];

	const getTopScorers = () => {
		const scoreKeys = ['away', 'home'];
		let mapTopScorers: Record<string, any> = {away: {}, home: {}};
		for (let i = 0; i < intervals; i++) {
			scoreKeys.forEach((key) => {
				let scoreDifference = 0;
				const currentScore = scores[i][key];
				const previousScore = scores[i - 1]?.[key] ?? 0;
				scoreDifference = currentScore - previousScore;
				if (scoreDifference > 0) {
					const scorer = scores[i]['scorer'];
					const team = key === 'home' ? 'home' : 'away';
					if (!mapTopScorers[team][scorer]) {
						mapTopScorers[team][scorer] = scoreDifference;
					} else {
						mapTopScorers[team][scorer] += scoreDifference;
					}
				}
			});
		}
		const topScorers = Object.entries(mapTopScorers).reduce(
			(acc, [team, scorers]) => {
				const sortedScorers = Object.entries(scorers).sort(
					(a, b) => b[1] - a[1]
				);
				acc[team] = sortedScorers;
				return acc;
			},
			{}
		);
		return topScorers;
	};

	const isWinning = () => {
		const topScore = Math.max(...activeScore);
		let winningTeamIndex = activeScore.indexOf(topScore);
		let winningTeam = Object.keys(teams)[winningTeamIndex];
		let winningColor = teams[winningTeam].colors[backgroundColor];
		return {winningTeam, winningColor};
	};

	const {winningColor} = isWinning();
	const topScorers = getTopScorers();

	const ScoreWrapperStyle: React.CSSProperties = {
		top: `${SCORE_POSITION}`,
		flexDirection: 'row',
		justifyContent: 'space-around',
		zIndex: 7,
	};

	return (
		<>
			<AbsoluteFill style={ScoreWrapperStyle}>
				{/* Clock */}
				<AbsoluteFill className="clock">
					<div className="quarter">
						{scores[intervals]['quarter'].toUpperCase()}
					</div>
					<div className="time">{scores[intervals]['time']}</div>
				</AbsoluteFill>
				{Object.keys(teams).map((team) => (
					<div key={`${team}-score`} className="score">
						<div className="text-h1">{scores[intervals][team]}</div>
					</div>
				))}
			</AbsoluteFill>

			{/* TOP SCORERS */}
			<AbsoluteFill className="stats">
				{Object.keys(topScorers).map((team) => {
					return (
						<div key={`${team}-top-scorers`} className="player-points">
							{topScorers[team].slice(0, 6).map((scorer) => {
								return (
									<div key={`${scorer}-points`} className={`players-${team}`}>
										<div key={`${scorer}`} className="names">
											{scorer[0].truncateNames()}
										</div>
										<div
											style={{
												backgroundColor: `${teams[team]['colors'][scoringColor]}`,
											}}
											className={`points ${teams[team]['colors'][scoringColor]
												?.toLowerCase()
												.contrastTextColor()}`}
										>
											{scorer[1]}
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</AbsoluteFill>

			{/* WINNING COLOR OVERLAY */}
			<WinningColorOverlay
				winningColor={winningColor}
				durationInFrames={durationInFrames}
			/>
		</>
	);
};
