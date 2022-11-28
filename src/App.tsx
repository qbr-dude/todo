import { HashRouter } from 'react-router-dom';
import Header from './components/header/header';
import AppRouter from './pages/app-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<HelmetProvider>
					<Header />
					<main>
						<AppRouter />
					</main>
				</HelmetProvider>
			</HashRouter>
		</Provider>
	);
}

export default App;
