import { createChart } from 'lightweight-charts';
import React, {Fragment, useEffect, useRef} from 'react';
import PreLoader from './loader';


let chart;
let chartInstance;

const Chart = (props) => {
	const [isLoading, setIsLoading] = React.useState(true);

	const chartContainerRef = useRef();

	useEffect(() => {
		console.log('useEffect 1');

		chart = createChart(chartContainerRef.current,
			{
				width:1500,
				height:600,
				timeScale: {
					timeVisible: true,
					secondsVisible: false,
				}
			}
		);

	},[]);

	useEffect(() => {

		const addSeriesFunction = {
			candleStick: 'addCandlestickSeries',
			line: 'addLineSeries'
		};

		const func = addSeriesFunction[props.chartType];

		if (chartInstance) {
			chart.removeSeries(chartInstance);
		}
		chartInstance = chart[func]();

		setInterval(() => {
			setIsLoading(false);
		}, 2000);
	}, [props.chartType, props.interval]);

	useEffect(() => {
		if (props.lastData) {
			chartInstance.update(reFormatData(props.lastData));
		}
	}, [props]);

	useEffect(() => {
		const handler = () => {
			chart.resize(chartContainerRef.current.offsetWidth, 500);
		};
		window.addEventListener('resize', handler);
		return () => {
			window.removeEventListener('resize', handler);
		};
	}, );


	const reFormatData = (tradingData) => {
		let chartData = {};

		switch (props.chartType) {
		case('candleStick'):
			chartData = {
				time: tradingData.openTime,
				open: tradingData.openPrice,
				high: tradingData.highPrice,
				low: tradingData.lowPrice,
				close: tradingData.closePrice
			};
			break;
		case('line'):
			chartData = {
				time: tradingData.openTime,
				value: tradingData.closePrice
			};
			break;
		}
		return chartData;
	};

	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<div ref={chartContainerRef}/>
		</Fragment>

	);
};

export default Chart;