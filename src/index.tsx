import { App } from 'app/App';
import { ErrorBoundary } from 'app/providers/error-boundary';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'app/styles/index.scss'

const root = createRoot(document.getElementById('root'));

root.render
	(
		<ErrorBoundary>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundary>
	)