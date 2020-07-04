import React from 'react';

import GlobalStyle from './styles/global'
import AppProvider from './hooks';
import Routes from './routes';
import { Router, BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppProvider>
				<Routes />
			</AppProvider>
			<GlobalStyle/>
		</BrowserRouter>
	);
}

export default App;
