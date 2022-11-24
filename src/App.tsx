import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import AppRouter from './pages/app-router';
import { HelmetProvider } from 'react-helmet-async';


function App() {
	return (
		<HelmetProvider>
			<Header />
			<main>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</main>
		</HelmetProvider>
	);
}

export default App;
