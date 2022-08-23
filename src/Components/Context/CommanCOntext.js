import React, { createContext, useReducer, useContext } from 'react';

const GlobalStateStateContext = createContext();
const GlobalDispatchContext = createContext();

const GlobalReducer = (state, action) => {
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
		ActivePannelState: null,
		WidgetData: null,
		initialCharData: [
			{
				ChartTitle: 'Line chart one',
				ChartName: 'Chart one',
				ChartData: [
					{
						valueD: 22,
						timeStamp: '3:30PM 13/08/2022',
					},
					{
						valueD: 24,
						timeStamp: '3:32PM 13/08/2022',
					},
					{
						valueD: 24,
						timeStamp: '3:34PM 13/08/2022',
					},
				],
			},
			{
				ChartTitle: 'Line chart Two',
				ChartName: 'Chart two',
				ChartData: [
					{
						valueD: 32,
						timeStamp: '4:30PM 13/08/2022',
					},
					{
						valueD: 24,
						timeStamp: '4:32PM 13/08/2022',
					},
					{
						valueD: 26,
						timeStamp: '4:34PM 13/08/2022',
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
