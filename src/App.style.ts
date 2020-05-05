import styled, { keyframes } from 'styled-components'

import { Color } from './redux/spotify/types';

const gradient = keyframes`
	0% {
		background-position: 0% 0%;
	}
	50% {
		background-position: 100% 100%;
	}
	100% {
		background-position: 0% 0%;
    }
`;

interface IGradientBackground {
    color1: Color,
    color2: Color,
}

export const Main = styled("main") <IGradientBackground>`
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    padding: 0 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${props => (props.color1 && props.color2 ?
        `linear-gradient(115deg, 
                rgb(41,41,41),
                rgb(${props.color2.r},${props.color2.g},${props.color2.b}),
                rgb(${props.color1.r},${props.color1.g},${props.color1.b}),
                rgb(${props.color2.r},${props.color2.g},${props.color2.b}),
                rgb(41,41,41))`
        : `linear-gradient(115deg, 
                black,
                rgb(41,41,41),
                #062F14,
                rgb(41,41,41),
                black)`)};




    background-size: 500% 500%;
    animation: ${gradient} 60s ease-in-out infinite;

    @media (max-width: 740px) {
        padding: 0 5vw;
    }
`;

export const Logo = styled("h1") <IGradientBackground>`
    align-self: flex-start;
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 0px;
    background: ${props => (props.color1 && props.color2 ?
        `linear-gradient(45deg, 
                rgb(${props.color1.r},${props.color1.g},${props.color1.b}),
                rgb(${props.color2.r},${props.color2.g},${props.color2.b}),
                rgb(${props.color1.r},${props.color1.g},${props.color1.b}))`
        : `linear-gradient(45deg, 
                #1DB954,
                #0D5125,
                #1DB954)`)};

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 400% 400%;

    animation: ${gradient} 15s ease infinite;

    @media (max-width: 740px) {
        font-size: 3.1rem;
    }
`;

export const SpotifyButton = styled.a`
    font-size: 1rem;
    font-weight: bold;
    background-color: #1DB954;
    text-decoration: none;
    color: white;
    border-radius: 100px;
    padding: 15px 30px;
    margin: auto;
`;

export const MoodLabel = styled.p`
	font-size: 12px;
	color: white;
	opacity: 0.5;
	width: 500px;
	font-weight: bold;
	padding: 0;
    margin: 10px 0 0 0; 
`;

interface IBlurrable {
    blurred: boolean,
}

export const PlayerMoodContainer = styled("div") <IBlurrable>`
    max-width: 500px;
    width: 100%;
    ${props => props.blurred ? "filter: blur(10px)" : ""};
`;

export const LoadingSongs = styled.span`
    font-size: 16px;
	color: white;
	opacity: 0.6;
    font-weight: bold;
    display: block;
    margin: auto 0;
    padding: 50px 30px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 10px;
`;

