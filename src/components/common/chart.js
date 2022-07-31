import { createChart, ColorType } from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';

const addSeriesFunction = {
	candleStick: 'addCandleStickSeries',
	line: 'addLineSeries'
};

const Chart = (props) => {

	const chartContainerRef = useRef();

	useEffect(() => {
		const chart = createChart(chartContainerRef.current);
		chart.timeScale().fitContent();
		const func = addSeriesFunction[props.chartType];
		const chartInstance = chart[func]();
		chartInstance.setData(props.data);
	});

	return (
		<div ref={chartContainerRef}/>
	);

};

export default Chart;