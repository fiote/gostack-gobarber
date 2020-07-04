import styled from "styled-components";
import { shade } from 'polished'

export const Container = styled.button`
	background: #FF9000;
	height: 56px;
	width: 100%;
	border-radius: 10px;
	border: 0px;
	padding: 0px 16px;
	color: #312E38;
	font-weight: 500;
	margin-top: 16px;
	transition: background-color 0.2s;

	&:hover {
		background: ${shade(0.2,'#FF9000')}
	}
`;