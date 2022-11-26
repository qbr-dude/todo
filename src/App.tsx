import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/header';
import AppRouter from './pages/app-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<HelmetProvider>
					<Header />
					<main>
						<AppRouter />
					</main>
				</HelmetProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
