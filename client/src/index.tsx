import { App } from 'app/App';
import { ErrorBoundary } from 'app/providers/error-boundary';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'app/styles/index.scss'
import { StoreProvider } from 'app/providers/store-providers/config/ui/StoreProvider';

const root = createRoot(document.getElementById('root'));

root.render
	(
		<StoreProvider>
			<ErrorBoundary>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ErrorBoundary>
		</StoreProvider>
	);


