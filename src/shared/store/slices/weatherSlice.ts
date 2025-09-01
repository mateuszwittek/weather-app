import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import {
	CurrentWeather,
	WeatherForecast,
	WeatherState,
	CityComparison,
} from '../../types/weather';

// Initial state
const initialState: WeatherState = {
	currentWeather: null,
	forecast: null,
	comparisons: [],
	selectedCity: null,
	searchQuery: '',
	loadingStates: {
		currentWeather: false,
		forecast: false,
		comparisons: false,
	},
	error: null,
};

const createAsyncHandlers =
	<T>(
		thunk: any,
		loadingKey: keyof WeatherState['loadingStates'],
		successHandler: (state: WeatherState, action: PayloadAction<T>) => void,
		errorMessage: string
	) =>
	(builder: ActionReducerMapBuilder<WeatherState>) => {
		builder
			.addCase(thunk.pending, (state) => {
				state.loadingStates[loadingKey] = true;
				state.error = null;
			})
			.addCase(thunk.fulfilled, (state, action: PayloadAction<T>) => {
				state.loadingStates[loadingKey] = false;
				successHandler(state, action);
			})
			.addCase(thunk.rejected, (state, action) => {
				state.loadingStates[loadingKey] = false;
				state.error = (action.payload as string) || errorMessage;
			});
	};

export const fetchCurrentWeather = createAsyncThunk(
	'weather/fetchCurrentWeather',
	async (city: string, { rejectWithValue }) => {
		try {
			throw new Error('API call not implemented yet');
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const fetchWeatherForecast = createAsyncThunk(
	'weather/fetchWeatherForecast',
	async (city: string, { rejectWithValue }) => {
		try {
			throw new Error('API call not implemented yet');
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const fetchCityComparisons = createAsyncThunk(
	'weather/fetchCityComparisons',
	async (selectedCity: string, { rejectWithValue }) => {
		try {
			throw new Error('API call not implemented yet');
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			);
		}
	}
);

export const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		setSelectedCity: (state, action: PayloadAction<string>) => {
			state.selectedCity = action.payload;
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
		clearSearchQuery: (state) => {
			state.searchQuery = '';
		},
		clearWeatherData: (state) => {
			state.currentWeather = null;
			state.forecast = null;
			state.comparisons = [];
			state.searchQuery = '';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		createAsyncHandlers<CurrentWeather>(
			fetchCurrentWeather,
			'currentWeather',
			(state, action) => {
				state.currentWeather = action.payload;
				state.selectedCity = action.payload.name;
			},
			'Failed to fetch current weather'
		)(builder);

		createAsyncHandlers<WeatherForecast>(
			fetchWeatherForecast,
			'forecast',
			(state, action) => {
				state.forecast = action.payload;
			},
			'Failed to fetch weather forecast'
		)(builder);

		createAsyncHandlers<CityComparison[]>(
			fetchCityComparisons,
			'comparisons',
			(state, action) => {
				state.comparisons = action.payload;
			},
			'Failed to fetch city comparisons'
		)(builder);
	},
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
