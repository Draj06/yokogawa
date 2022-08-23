import React, { useState, useEffect } from 'react';
import { useGlobalDispatch, useGlobalState } from '../Context/CommanCOntext';
import RightPannel from './RightPannel';
import ChartComp from './ChartComp';

//Widget component to show the widgets

const Widgets = ({ dataProps, liProps }) => {
	const dispatch = useGlobalDispatch();
	const { initialCharData } = useGlobalState();
	const [ChartClickData, setChartClickData] = useState(null);
	const [CDataState, setCDataState] = useState();

	const initialValues = { chartName: '' }; // to handle the input fild
	const [formValues, setFormValues] = useState(initialValues); // to handle the input fild
	const [formErrors, setFormErrors] = useState({}); // to handle the input fild errors
	const handleChange = (e) => {
		// a common handle change
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	let chartNameForPlaceholder = initialCharData.map((li) => {
		// getting the chart names to show in placeholder
		return li.ChartName;
	});

	const validate = (values) => {
		// input feild validation
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

	const EditClick = (d) => {
		setChartClickData(d);

		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: true }); //  storing open right pannel state in glocal state
	};
	const CloseRightBar = () => {
		dispatch({ type: 'SET_TOGGLE_EIDT_PANNEL', payload: false }); //  storing open right pannel state in glocal state
		setChartClickData(null);
	};

	const handleSubmit = (e) => {
		// on click of save
		e.preventDefault();
		setFormErrors(validate(formValues)); //checking for validation
		if (Object.keys(validate(formValues)).length <= 0) {
			// if no error
			let filterChartname = initialCharData.filter(
				(li) => li.ChartName === formValues.chartName
			);

			if (filterChartname.length > 0) {
				//updating chart as per what user type in input feild

				setCDataState(filterChartname[0].ChartData);
			} else {
				setFormErrors(validate('noChartError'));
			}
		} else {
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
				{CDataState && <ChartComp cData={CDataState} />}
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
