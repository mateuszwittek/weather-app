export interface CurrentWeather {
	name: string;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	weather: Array<{
		main: string;
		description: string;
		icon: string;
	}>;
	wind: {
		speed: number;
		deg?: number;
	};
	visibility?: number;
	dt: number;
}

export interface WeatherForecast {
	city: {
		name: string;
		country: string;
	};
	list: Array<{
		dt: number;
		dt_txt: string;
		main: {
			temp: number;
			temp_min: number;
			temp_max: number;
			humidity: number;
		};
		weather: Array<{
			main: string;
			description: string;
			icon: string;
		}>;
		wind: {
			speed: number;
		};
		pop: number; // probability of precipitation 0-1
	}>;
}

export interface CityComparison {
	cityName: string;
	temperature: number;
	humidity: number;
	windSpeed: number;
	temperatureDiff: number;
	humidityDiff: number;
	windSpeedDiff: number;
}

export interface WeatherState {
	currentWeather: CurrentWeather | null;
	forecast: WeatherForecast | null;
	comparisons: CityComparison[];
	selectedCity: string | null;
	searchQuery: string;
	loadingStates: {
		currentWeather: boolean;
		forecast: boolean;
		comparisons: boolean;
	};
	error: string | null;
}

export interface RootState {
	weather: WeatherState;
}
