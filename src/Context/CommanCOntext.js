import React, { createContext, useReducer, useContext } from 'react';
// Global state using context-api

const GlobalStateStateContext = createContext(); // to get values
const GlobalDispatchContext = createContext(); // to set values

const GlobalReducer = (state, action) => {
	// reducer to update value
	switch (action.type) {
		case 'SET_TOGGLE_EIDT_PANNEL':
			return {
				...state,
				ActivePannelState: action.payload,
			};
		case 'UPDATE_CHART_DATA':
			return {
				...state,
				initialCharData: action.payload,
			};
		case 'SIGNLE_WIDGET_DATA':
			return {
				...state,
				WidgetData: action.payload,
			};

		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};

export const GlobaldProvider = ({ children }) => {
	const [state, dispatch] = useReducer(GlobalReducer, {
		// storing all the values here
		ActivePannelState: null,
		WidgetData: null,
		initialCharData: [
			{
				ChartTitle: 'Line chart one',
				ChartName: 'Chart one',
				ChartData: [
					{
						valueD: 22,
						timeStamp: '11:30',
					},
					{
						valueD: 24,
						timeStamp: '11:32',
					},
					{
						valueD: 24,
						timeStamp: '11:34',
					},
				],
			},
			{
				ChartTitle: 'Line chart Two',
				ChartName: 'Chart two',
				ChartData: [
					{
						valueD: 32,
						timeStamp: '11:30',
					},
					{
						valueD: 24,
						timeStamp: '11:32',
					},
					{
						valueD: 26,
						timeStamp: '11:34',
					},
				],
			},
		],
	});

	return (
		<GlobalDispatchContext.Provider value={dispatch}>
			<GlobalStateStateContext.Provider value={state}>
				{children}
			</GlobalStateStateContext.Provider>
		</GlobalDispatchContext.Provider>
	);
};

export const useGlobalState = () => useContext(GlobalStateStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
