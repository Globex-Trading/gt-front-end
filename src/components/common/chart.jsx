import { createChart, CrosshairMode } from 'lightweight-charts';
import React, {Fragment, useEffect, useRef} from 'react';
import PreLoader from './loader';

const addSeriesFunction = {
	candleStick: 'addCandleStickSeries',
	line: 'addLineSeries'
};

const Chart = (props) => {
	const [isLoading, setIsLoading] = React.useState(true);

	const chartContainerRef = useRef();

	useEffect(() => {
		const chart = createChart(chartContainerRef.current,
			{
				width: 1000,
				height: 600,
				layout: {
					backgroundColor: '#000000',
					textColor: 'rgba(255, 255, 255, 0.9)',
				},
				grid: {
					vertLines: {
						color: 'rgba(197, 203, 206, 0.5)',
					},
					horzLines: {
						color: 'rgba(197, 203, 206, 0.5)',
					},
				},
				crosshair: {
					mode: CrosshairMode.Normal,
				},
				rightPriceScale: {
					borderColor: 'rgba(197, 203, 206, 0.8)',
				},
				timeScale: {
					borderColor: 'rgba(197, 203, 206, 0.8)',
				},
			}
		);
		chart.timeScale().fitContent();

		const func = addSeriesFunction[props.chartType];

		console.log(func);
		console.log(chart,'-----');
		const chartInstance = chart['addCandlestickSeries'](
			{
				upColor: 'rgba(255, 144, 0, 1)',
				downColor: '#000',
				borderDownColor: 'rgba(255, 144, 0, 1)',
				borderUpColor: 'rgba(255, 144, 0, 1)',
				wickDownColor: 'rgba(255, 144, 0, 1)',
				wickUpColor: 'rgba(255, 144, 0, 1)',
			}
		);

		chartInstance.setData(props.data);
		setInterval(() => {
			setIsLoading(false);
		}, 2000);
	}, [props.data, props.chartType]);

	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<div ref={chartContainerRef}/>
		</Fragment>

	);

};

export default Chart;