//
import React from 'react';
import {AbsoluteFill} from 'remotion';

// STYLES
import '../../styles/scoreboard.css';

// TYPES
type Background = {
	backgroundType: 'video' | 'main';
};

export const Background: React.FC<Background> = ({backgroundType = 'main'}) => {
	return <AbsoluteFill className={`${backgroundType}-background`} />;
};
