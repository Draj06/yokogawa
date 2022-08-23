import React, { useState, useEffect } from 'react';
import { useGlobalDispatch, useGlobalState } from './Context/CommanCOntext';
import RightPannel from './RightPannel';

const Widgets = ({ dataProps, liProps }) => {
	const dispatch = useGlobalDispatch();
	const { ActivePannelState, initialCharData } = useGlobalState();
	const [ChartClickData, setChartClickData] = useState(null);
	const [CDataState, setCDataState] = useState();

	const initialValues = { chartName: '' };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isLoading, setisLoading] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	let chartNameForPlaceholder = initialCharData.map((li) => {
		return li.ChartName;
	});

	const validate = (values) => {
		const errors = {};

		if (!values.chartName) {
			errors.chartName = 'Chart name is required!';
		}
		if (values === 'noChartError') {
			errors.chartName = 'The chart name you have typed Doesnot exist';
		}

		return errors;
	};

	useEffect(() => {
		setCDataState(dataProps.ChartData);
	}, [dataProps]);
	console.log();
	const EditClick = (d) => {
		setChartClickData(d);

		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: true });
	};
	const CloseRightBar = () => {
		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: false });
		setChartClickData(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setisLoading(true);
		if (Object.keys(validate(formValues)).length <= 0) {
			let filterChartname = initialCharData.filter(
				(li) => li.ChartName === formValues.chartName
			);

			if (filterChartname.length > 0) {
				//updating chart as per what user type in input feild

				console.log(filterChartname);
				// let uData = initialCharData.map((li) => {
				// 	if (li.ChartName !== filterChartname[0].ChartName) {
				// 		return {
				// 			...li,
				// 			ChartData: filterChartname[0].ChartData,
				// 		};
				// 	} else {
				// 		return li;
				// 	}
				// });
				setCDataState(filterChartname[0].ChartData);
			} else {
				setFormErrors(validate('noChartError'));
			}
		} else {
			setisLoading(false);
		}
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
				{CDataState &&
					CDataState.map((lii, ins) => {
						return <div>{lii.valueD}</div>;
					})}
			</div>
			{ChartClickData && (
				<RightPannel
					ChartTitle={ChartClickData}
					CloseRightBar={CloseRightBar}
					handleSubmit={handleSubmit}
					chartNameForPlaceholder={chartNameForPlaceholder}
					handleChange={handleChange}
					formErrors={formErrors}
				/>
			)}
		</div>
	);
};

export default Widgets;
