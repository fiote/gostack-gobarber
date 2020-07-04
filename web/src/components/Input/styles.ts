import styled, { css } from "styled-components";

import Tooltip from '../Tooltip';

interface ContainerProps {
	isFocused: boolean;
	isFilled: boolean;
	isError: boolean;
}

export const Container = styled.div<ContainerProps>`
	background: #232129;
	border-radius: 10px;
	border: 2px solid #232129;
	padding: 16px;
	width: 100%;

	display: flex;
	align-items: center;

	color: #666360;

	input {
		flex: 1;
		border: 0px;
		background: transparent;
		color: #f4ede8;
	}

	& + div {
		margin-top: 8px;
	}


	${props => props.isError && css`
		border-color: #c53030;
	`}

	${props => props.isFocused && css`
		color: #FF9000;
		border-color: #FF9000;
	`}

	${props => props.isFilled && css`
		color: #FF9000;
	`}


	svg {
		margin-right: 16px;
	}
`;


export const AlertError = styled(Tooltip)`
	height: 20px;
	margin-left: 16px;

	span {
		background: #C53030;
		color: #fff;

		&:before {
			border-color: #C53030 transparent;
		}
	}

	svg {
		margin-right: 0px;
	}
`;