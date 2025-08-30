import express from 'express';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.get('/', (req, res) => {
	res.json({
		message: 'Weather App - Server Working!',
		status: 'Project server configured correctly.',
		timestamp: new Date().toISOString(),
	});
});

app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', service: 'weather-app' });
});

app.listen(PORT, () => {
	console.log(`Weather App Server running on http://localhost:${PORT}`);
	console.log(`Health check: http://localhost:${PORT}/api/health`);
});
