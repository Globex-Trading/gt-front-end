import { createChart } from 'lightweight-charts';
import React, {Fragment, useEffect, useRef} from 'react';
import PreLoader from './loader';


let chart;
let chartInstance;
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! STARTING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

const Chart = (props) => {
	const [isLoading, setIsLoading] = React.useState(true);

	const chartContainerRef = useRef();

	//useEffect for create the chart
	useEffect(() => {
		console.log('useEffect 1');

		chart = createChart(chartContainerRef.current,
			{
				width:0,
				height:550,
				timeScale: {
					timeVisible: true,
					secondsVisible: true,
				},
				rightPriceScale: {
					autoScale: true,
				},
				baseLineOptions: {
					lastPriceAnimation: true,
				}
			}
		);

		chart.timeScale().fitContent();

		return () => {
			chart = null;
			chartInstance = null;
		};

	},[]);

	//useEffect for create the chart type and set initial data
	useEffect(() => {

		setIsLoading(true);

		const addSeriesFunction = {
			candleStick: 'addCandlestickSeries',
			line: 'addLineSeries'
		};

		const func = addSeriesFunction[props.chartType];

		if (chartInstance) {
			chart.removeSeries(chartInstance);
		}

		chartInstance = chart[func]();

		if(props.initData && props.isUpdate) {

			chartInstance.setData(reFormatPastData(props.initData));
			props.setIsUpdate(false);
		}

		setIsLoading(false);

	}, [props.chartType, props.interval, props.tradingPair, props.initData]);


	//useEffect for update the chart data for realtime data
	useEffect(() => {
		console.log('#################', chart.timeScale().getVisibleLogicalRange());

		if (props.lastData) chartInstance.update(reFormatData(props.lastData));

	}, [props.lastData]);

	// useEffect(() => {
	// 	const handler = () => {
	// 		chart.resize(chartContainerRef.current.offsetWidth, 500);
	// 	};
	// 	window.addEventListener('resize', handler);
	// 	return () => {
	// 		window.removeEventListener('resize', handler);
	// 	};
	// }, );

	//reformat the incoming data to match the chart data format
	const reFormatData = (tradingData) => {
		let chartData = {};
		switch (props.chartType) {
		case('candleStick'):


			chartData = {
				time: tradingData.openTime/1000 + 19800,
				open: tradingData.openPrice,
				high: tradingData.highPrice,
				low: tradingData.lowPrice,
				close: tradingData.closePrice
			};
			break;
		case('line'):
			chartData = {
				time: tradingData.openTime/1000 + 19800,
				value: tradingData.closePrice
			};
			break;
		}
		return chartData;
	};

	//reformat the incoming data to match the chart data format
	const reFormatPastData = (tradingDataList) => {
		let chartData = [];

		switch (props.chartType) {
		case('candleStick'):
			tradingDataList.map(tradingData => {
				let data = {
					time: tradingData.open_time/1000 + 19800,
					open: tradingData.open_price,
					high: tradingData.high_price,
					low: tradingData.low_price,
					close: tradingData.close_price
				};
				chartData.push(data);
			});
			break;
		case('line'):
			tradingDataList.map(tradingData => {
				let data = {
					time: tradingData.open_time/1000 + 19800,
					value: tradingData.close_price
				};

				chartData.push(data);
			});
			break;
		}
		return chartData;
	};

	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<div style={{bottom: '0', right: '0'}} ref={chartContainerRef}/>
		</Fragment>

	);
};

export default Chart;