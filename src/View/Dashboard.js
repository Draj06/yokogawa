import React, { useEffect, useState } from 'react';
import Widgets from '../Components/Widgets';
import _ from 'lodash';
import {
	useGlobalDispatch,
	useGlobalState,
} from '../Components/Context/CommanCOntext';

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

	let compactType = 'vertical';

	useEffect(() => {
		const TwoSecInterval = setInterval(() => {
			initialCharData.map((li) => {
				let d = li.ChartData[li.ChartData.length - 1];
				let splitArray = d.timeStamp.split(':');
				let plusTwoSec = parseInt(splitArray[1]) + 2;
				let t = splitArray[0] + ':' + plusTwoSec;

				return {
					...li,
					ChartData: li.ChartData.push({
						timeStamp: t,
						valueD: Math.floor(Math.random() * 90 + 10),
					}),
				};
			});
			dispatch({ type: 'UPDATE_CHART_DATA', payload: initialCharData });
		}, 2000);

		return () => clearInterval(TwoSecInterval);
	}, [dispatch, initialCharData]);

	useEffect(() => {
		if (initialCharData !== null && initialCharData.length > 0) {
			console.log('wwwdata', initialCharData);
			const generateDOM = (li, key) => {
				console.log('li has :', li);
				const layout = generateLayout();
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
			setDOM(generateDOM(initialCharData, 'layouts'));
		}
	}, [initialCharData]);

	useEffect(() => {
		const originalLayouts = getFromLS('Layouts', layouts) || {};
		console.log(originalLayouts);
		setlayouts(originalLayouts);
	}, [initialCharData]);

	const onLayoutChange = (layout, layouts) => {
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
				<ResponsiveReactGridLayout
					{...props}
					className="layout col-12"
					layouts={layouts}
					measureBeforeMount={false}
					useCSSTransforms={false}
					compactType={compactType}
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					preventCollision={!compactType}
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
			ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
		} catch (e) {
			/*Ignore*/
		}
	}
	return ls[key];
}

function saveToLS(key, value) {
	if (global.localStorage) {
		global.localStorage.setItem(
			'rgl-8',
			JSON.stringify({
				[key]: value,
			})
		);
	}
}
