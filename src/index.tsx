import { App } from 'app/App';
import { ErrorBoundary } from 'app/providers/error-boundary';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render
	(
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	)