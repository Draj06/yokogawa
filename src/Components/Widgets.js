import React, { useState, useEffect } from 'react';
import { useGlobalDispatch, useGlobalState } from './Context/CommanCOntext';
import RightPannel from './RightPannel';

const Widgets = ({ dataProps, liProps }) => {
	const dispatch = useGlobalDispatch();
	const [ChartClickData, setChartClickData] = useState(null);
	const EditClick = (d) => {
		setChartClickData(d);

		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: true });
	};
	const CloseRightBar = () => {
		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: false });
		setChartClickData(null);
	};

	return (
		<div className="p-1">
			<div className="d-flex mb-2">
				<div className="fs-4 text-black-50 chartTitle">
					{dataProps.ChartTitle}
				</div>

				<i
					className="ri-edit-2-line ml-auto ri-lg text-secondary fs-4"
					onClick={() => EditClick(dataProps.ChartTitle)}
					title="Edit"></i>
			</div>
			<hr className="m-0" />
			<div className="mt-3">
				{dataProps.ChartData.map((lii, ins) => {
					return <div>{lii.valueD}</div>;
				})}
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

export default Widgets;
