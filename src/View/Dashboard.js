import React, { useEffect, useState } from 'react';
import Widgets from '../Components/Widgets';
import _ from 'lodash';
import { useGlobalDispatch, useGlobalState } from '../Context/CommanCOntext';

import RightPannel from '../Components/RightPannel';

// Grid layout
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = (props) => {
	const { initialCharData } = useGlobalState();

	const dispatch = useGlobalDispatch();
	const [layouts, setlayouts] = useState({});
	const [DOM, setDOM] = useState(null);
	const [ChartClickData, setChartClickData] = useState(null);

	useEffect(() => {
		// adding data every two seconds
		const TwoSecInterval = setInterval(() => {
			initialCharData.map((li) => {
				let d = li.ChartData[li.ChartData.length - 1];
				let splitArray = d.timeStamp.split(':');
				let plusTwoSec = parseInt(splitArray[1]) + 2;
				let t = splitArray[0] + ':' + plusTwoSec;

				return {
					...li,
					ChartData: li.ChartData.push({
						valueD: Math.floor(Math.random() * 90 + 10),
						timeStamp: t,
					}),
				};
			});
			dispatch({ type: 'UPDATE_CHART_DATA', payload: initialCharData });
		}, 2000);

		return () => clearInterval(TwoSecInterval); // clearing the interval
	}, [dispatch, initialCharData]);

	useEffect(() => {
		// here I am using the react-grid-layout for drag drop and resize
		if (initialCharData !== null && initialCharData.length > 0) {
			const generateDOM = (li, key) => {
				const layout = generateLayout(); // generating layout
				return _.map(layout, function (l) {
					return (
						<div
							key={l.i + '0'}
							data-grid={l}
							index={l.i}
							id={key}
							className="pt-2  WidgetClass mb-3">
							<Widgets
								dataProps={li[l.i]}
								indProps={l.i}
								ChartClickData={ChartClickData}
								EditClick={EditClick}
							/>
						</div>
					);
				});
			};
			const generateLayout = () => {
				// generatting layout -- height, width
				return (
					initialCharData !== undefined &&
					initialCharData !== null &&
					initialCharData.map(function (item, i) {
						return {
							x: (i * 4) % 12,
							y: Math.floor(i / 6),
							h: 5,
							w: 4,
							minW: 4,
							maxW: 12,
							minH: 5,
							maxH: 5,
							i: i.toString(),
						};
					})
				);
			};
			setDOM(generateDOM(initialCharData, 'layouts')); // then setting the DOM so that I can render it
		}
	}, [initialCharData]);

	useEffect(() => {
		const originalLayouts = getFromLS('Layouts', layouts) || {};

		setlayouts(originalLayouts);
	}, [initialCharData]);

	const onLayoutChange = (layout, layouts) => {
		// when we change the layout saing it to local storage as well as setting the layout for local state
		saveToLS('Layouts', layouts);
		setlayouts(layouts);
	};

	const EditClick = (d) => {
		setChartClickData(d);

		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: true });
	};
	const CloseRightBar = () => {
		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: false });
		setChartClickData(null);
	};

	return (
		<div className="px-3 py-2">
			<div className="row">
				<ResponsiveReactGridLayout // rendring the grid layout
					{...props}
					className="layout col-12"
					layouts={layouts}
					measureBeforeMount={false}
					useCSSTransforms={false}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					onLayoutChange={(layout, layouts) => {
						onLayoutChange(layout, layouts);
					}}>
					{DOM}
				</ResponsiveReactGridLayout>
			</div>
			{ChartClickData && (
				<RightPannel
					ChartTitle={ChartClickData}
					CloseRightBar={CloseRightBar}
				/>
			)}
		</div>
	);
};
Dashboard.defaultProps = {
	// some default proprs
	isDraggable: true,
	isResizable: true,
	rowHeight: 60,
	onLayoutChange: function () {},
	cols: 12,
};
export default Dashboard;

function getFromLS(key) {
	let ls = {};
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem('yoko')) || {};
		} catch (e) {}
	}
	return ls[key];
}

function saveToLS(key, value) {
	if (global.localStorage) {
		global.localStorage.setItem(
			'yoko',
			JSON.stringify({
				[key]: value,
			})
		);
	}
}
