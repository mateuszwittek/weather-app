import { createRoot } from 'react-dom/client';

const App = () => {
	return (
		<div>
			<h1>Weather App - Client Working!</h1>
			<p>Project client configured correctly.</p>
		</div>
	);
};

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<App />);
}
