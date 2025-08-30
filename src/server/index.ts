import express from 'express';
import { paths } from '../shared/config/paths.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.static(paths.clientDist));

app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', service: 'weather-app' });
});

app.get('*', (req, res) => {
	res.sendFile(paths.clientIndex);
});

app.listen(PORT, () => {
	console.log(`Weather App Server running on http://localhost:${PORT}`);
	console.log(`Health check: http://localhost:${PORT}/api/health`);
});
