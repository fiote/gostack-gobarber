import styled, { keyframes } from "styled-components";
import { shade } from 'polished'

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: stretch;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	place-content: center;
	width: 100%;
	max-width: 700px;
`;

export const Background = styled.div`
	flex: 1;
	background: url(${signInBackgroundImg}) no-repeat center;
	background-size: cover;
`;

const appearFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-50px);
	}
	to {
		opacity: 1;
		transform: translateX(0px);
	}
`;

export const AnimationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	animation: ${appearFromLeft} 0.5s;

	form {
		margin: 80px auto;
		width: 340px;
		text-align: center;

		h1 {
			margin-bottom: 24px;
		}

		a {
			color: #f4ede8;
			display: block;
			margin-top: 24px;
			text-decoration: none;
			transition: color 0.2s;

			&:hover {
				color: ${shade(0.2,'#f4ede8')}
			}
		}
	}

	> a {
		color: #FF9000;
		margin-top: 24px;
		text-decoration: none;
		transition: color 0.2s;

		svg {
			margin-right: 15px;
		}

		&:hover {
			background: ${shade(0.2,'#FF9000')}
		}
	}

`;