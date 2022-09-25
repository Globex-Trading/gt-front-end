import { createChart } from 'lightweight-charts';
import React, {Fragment, useEffect, useRef} from 'react';
import PreLoader from './loader';

const addSeriesFunction = {
	candleStick: 'addCandlestickSeries',
	line: 'addLineSeries'
};

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
		const func = 'addCandlestickSeries';

		// if (chartInstance) {
		// 	chart.removeSeries(chartInstance);
		// }

		// chartInstance = chart[func]();
		chartInstance = chart.addCandlestickSeries();

		// chartInstance.setData(props.initData);
		console.log(chartInstance,'-----', props.initData);
		setInterval(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		// console.log('useEffect 3', props.lastData);
		if (props.lastData) {
			// console.log('last data -------------------------', props.lastData);
			// chartInstance.update(props.lastData);
			chartInstance.update(props.lastData);
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

	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<div ref={chartContainerRef}/>
		</Fragment>

	);
};

export default Chart;