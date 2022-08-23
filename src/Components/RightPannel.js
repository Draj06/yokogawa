import React, { useState } from 'react';
import { useGlobalState, useGlobalDispatch } from './Context/CommanCOntext';

const RightPannel = ({
	ChartTitle,
	CloseRightBar,
	handleSubmit,
	chartNameForPlaceholder,
	handleChange,
	formErrors,
}) => {
	const { ActivePannelState, initialCharData } = useGlobalState();
	const dispatch = useGlobalDispatch();

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
