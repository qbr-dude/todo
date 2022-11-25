import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import AppRouter from './pages/app-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<HelmetProvider>
				<Header />
				<main>
					<BrowserRouter>
						<AppRouter />
					</BrowserRouter>
				</main>
			</HelmetProvider>
		</Provider>
	);
}

export default App;
