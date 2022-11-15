import { createChart } from 'lightweight-charts';
import React, {Fragment, useEffect, useRef} from 'react';
import PreLoader from './loader';


let chart;
let chartInstance;
let volumeInstance;

const Chart = (props) => {

	const [isLoading, setIsLoading] = React.useState(false);

	const [TACarts, setTACarts] = React.useState({});

	const [currPane, setCurrPane] = React.useState(0);

	const [isMounted, setIsMounted] = React.useState(false);

	const [newLogicalRange, setNewLogicalRange] = React.useState(null);


	const chartContainerRef = useRef();

	const addSeriesFunction = {
		candleStick: 'addCandlestickSeries',
		line: 'addLineSeries'
	};

	//useEffect for create the chart
	useEffect(() => {
		setIsLoading(true);
		console.log('useEffect 1');

		chart = createChart(chartContainerRef.current,
			{
				width:0,
				height:550,
				timeScale: {
					timeVisible: true,
					secondsVisible: true,
				},
				layout: {
					backgroundColor: '#f3f3f3',
					textColor: '#0e416b',
				},
				pane: 0
			}
		);

		chart?.timeScale()?.fitContent();
		setIsLoading(false);

		return () => {
			chart = null;
			chartInstance = null;
		};


	},[]);

	//useEffect for create the chart type and set initial data
	useEffect(() => {

		!isMounted && setIsLoading(true);


		const func = addSeriesFunction[props.chartType];

		if (chartInstance) {
			chart.removeSeries(chartInstance);
			chart.removeSeries(volumeInstance);
		}

		chartInstance = chart[func]();
		volumeInstance = chart.addHistogramSeries({
			priceFormat: {
				type: 'volume',
			},
			priceScaleId: '',
			scaleMargins: {
				top: 0.8,
				bottom: 0,
			},
		});

		if(props.initData && props.isUpdate) {
			chartInstance.setData(reFormatPastData(props.initData, props.chartType));
			volumeInstance.setData(reFormatPastData(props.initData, 'volume'));
			props.setIsUpdate(false);
			//check whether the visible range is filled with data or otherwise get data from the server to fill the visible range.
			const logicalRange = chart.timeScale().getVisibleLogicalRange();
			findTimeRangeAndGetData(logicalRange);

		}

		setIsLoading(false);
		// setIsMounted(true);
		chart?.timeScale()?.subscribeVisibleLogicalRangeChange((newVisibleTimeRange) => logicalTimeRangeChangeHandler(newVisibleTimeRange, props.tradingPair?._id, props.interval));


	}, [props.chartType, props.interval, props.tradingPair, props.initData]);

	useEffect(() => {
		props.TIdata.forEach((item) => {
			if(!(item in TACarts)) {
				const TA = findTA(item.name);
				if(TA) {
					let pane = currPane;
					if (TA.newPane) pane = pane + 1;
					setCurrPane(pane);
					const chartFunc = addSeriesFunction[TA.chartType];
					const TAInstance = chart[chartFunc]({
						color: 'green',
						lineWidth: 1,
						pane: 1

					});
					const data = reFormatPastData(item.data, TA.chartType, TA.name);
					data.filter((item) => item.value !== '');
					TAInstance.setData(data);
					setTACarts({...TACarts, [item.name]: TAInstance});
					console.log('chart added');
				}
			}
		});


	}, [props.TIdata]);

	useEffect(() => {
		const keyList = TACarts ? Object.keys(TACarts) : [];
		keyList.forEach((key) => {
			if(!(key in props.TIdata)) {
				chart.removeSeries(TACarts[key]);
				delete TACarts[key];
			}
		});
	}, [props.selectedTAs]);


	//useEffect for update the chart data for realtime data
	useEffect(() => {

		if (props.lastData) {
			console.log('***************', reFormatData(props.lastData, props.chartType));
			chartInstance.update(reFormatData(props.lastData, props.chartType));
			volumeInstance.update(reFormatData(props.lastData, 'volume'));
		}

	}, [props.lastData]);

	const findTimeRangeAndGetData = (logicalRange) => {
		const timeRange = chart?.timeScale().getVisibleRange();
		if (logicalRange && logicalRange.from < 0 && timeRange) {
			const  {from, to} = logicalRange;
			const {from: fromTime, to: toTime} = timeRange;
			const timeInterval = (toTime - fromTime)/ to;
			const startTime = fromTime - (Math.ceil(Math.abs(from)) * timeInterval);
			const endTime = fromTime;
			props.getPastData(Math.floor((startTime - 19800)*1000), (endTime - 19800)*1000);

		}
	};

	const findTA = (name) => {

		for (let i = 0 ; i < props.techIndicators.length; i++) {
			if(props.techIndicators[i].name === name) {
				return props.techIndicators[i];
			}
		}

		return null;

	};

	//reformat the incoming data to match the chart data format
	const reFormatData = (tradingData, chartType) => {
		let chartData = {};
		switch (chartType) {
		case('candleStick'):

			chartData = {
				time: tradingData.openTime / 1000 + 19800,
				open: tradingData.openPrice,
				high: tradingData.highPrice,
				low: tradingData.lowPrice,
				close: tradingData.closePrice
			};
			break;
		case('line'):
			chartData = {
				time: tradingData.openTime / 1000 + 19800,
				value: tradingData.closePrice
			};
			break;
		case('volume'):
			chartData = {
				time: tradingData.openTime / 1000 + 19800,
				value: tradingData.volume
			};
		}
		return chartData;
	};

	//reformat the incoming data to match the chart data format
	const reFormatPastData = (tradingDataList, chartType, dataType = 'normal') => {
		let chartData = [];

		switch (chartType) {
		case('candleStick'):
			tradingDataList.map(tradingData => {
				let data = {
					time: tradingData.open_time / 1000 + 19800,
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
				let data = {};
				if (dataType !== 'normal') {
					data = {
						time: tradingData.doc.open_time / 1000 + 19800,
						value: tradingData[dataType]
					};
				} else {
					data = {
						time: tradingData.open_time / 1000 + 19800,
						value: tradingData.close_price
					};
				}
				chartData.push(data);
			});
			break;
		case('volume'):
			tradingDataList.map(tradingData => {
				let data = {
					time: tradingData.open_time / 1000 + 19800,
					value: tradingData.volume,
					color: tradingData.open_price < tradingData.close_price ? '#26a69a' : '#ef5350'
				};
				chartData.push(data);
			});
		}
		return chartData;
	};

	const logicalTimeRangeChangeHandler = (newVisibleLogicalRange, symbol, interval) => {
		if(newVisibleLogicalRange !== null) {
			setNewLogicalRange(newVisibleLogicalRange);
		}
	};

	const handleOnClick = () => {
		findTimeRangeAndGetData(newLogicalRange);
	};

	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<div data-testid={'chart'} className="px-5
			">
				<div
					style={{bottom: '0', right: '0'}}
					ref={chartContainerRef}
					onClick={handleOnClick}
					onScroll={handleOnClick}
				/>
			</div>
		</Fragment>

	);
};

export default Chart;