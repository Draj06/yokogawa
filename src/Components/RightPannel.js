import React, { useState } from 'react';
import { useGlobalState } from './Context/CommanCOntext';

const RightPannel = ({ ChartTitle, CloseRightBar }) => {
	const { ActivePannelState, initialCharData } = useGlobalState();
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
	console.log(chartNameForPlaceholder.toString().split(',').join('/'));
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setisLoading(true);
		if (Object.keys(validate(formValues)).length <= 0) {
			let filterChartname = initialCharData.filter(
				(li) => li.ChartName === formValues.chartName
			);

			if (filterChartname.length > 0) {
				setisLoading(false);
			} else {
				setFormErrors(validate('noChartError'));
			}
		} else {
			setisLoading(false);
		}
	};
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

	return (
		<div>
			<div
				className={`rightbar_overlay ${
					ActivePannelState === true ? 'visible' : ''
				}`}>
				<div
					className={
						ActivePannelState === true ? 'rightBar' : 'rightBar_shrink'
					}>
					<div className="d-flex">
						<div className="fs-5 font-weight-bold">{ChartTitle}</div>
						<i
							className="ri-close-line ri-lg ml-auto"
							onClick={() => CloseRightBar()}
							title="Close"></i>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="form-group mt-4">
							<label className="label" htmlFor="chartName">
								Chart name
							</label>
							<div className="form-group">
								<input
									type="text"
									name="chartName"
									id="chartName"
									className="form-control"
									placeholder={`Type - ${chartNameForPlaceholder
										.toString()
										.split(',')
										.join('/')}`}
									onChange={handleChange}
								/>
								<span className="text-danger">{formErrors.chartName}</span>
							</div>
						</div>
						<button className="btn btn-secondary float-right">Save</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RightPannel;
