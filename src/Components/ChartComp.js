import React, { useState, useEffect } from 'react';

const ChartComp = ({ cData, ind }) => {
	const [cDataState, setcDataState] = useState();
	useEffect(() => {
		setcDataState(cData);
	}, [cData]);
	console.log(cDataState);
	return <div>ChartComp</div>;
};

export default ChartComp;
