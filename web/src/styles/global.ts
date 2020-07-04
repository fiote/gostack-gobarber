import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	* {
		margin: 0px;
		padding: 0px;
		box-sizing: border-box;
		outline: 0px;
	}

	body {
		background: #312E38;
		color: #FFF;
		-webkit-font-smoothing: antialised;
	}

	body, input, button {
		font-family: 'Roboto Slab', serif;
		font-size: 16px;
	}

	h1, h2, h3, h4, h5, h6, strong, b {
		font-weight: 500;
	}

	button {
		cursor: pointer;
	}
`
