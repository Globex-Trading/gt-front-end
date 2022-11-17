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

	const [colors, setColors] = React.useState(['red', 'green', 'blue', 'orange', 'purple', 'brown', 'black']);

	const [TAChartInstances, setTAChartInstances] = React.useState({});


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

		chartInstance = chart[func]({
			title: props.tradingPair?.name
		});
		volumeInstance = chart.addHistogramSeries({
			priceFormat: {
				type: 'volume',
			},
			priceScaleId: '',
			scaleMargins: {
				top: 0.8,
				bottom: 0,
			},
			title: 'Volume',
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
		chart?.timeScale()?.subscribeVisibleLogicalRangeChange(logicalTimeRangeChangeHandler);

	}, [props.chartType, props.interval, props.tradingPair, props.initData]);

	useEffect(() => {
		console.log('---------------------adding pane---------------------');
		props.TIdata.forEach((item) => {
			const keys = TACarts? Object.keys(TACarts) : [];
			if(!(keys.includes(item.name))) {
				console.log('=============item and charts', item, TACarts);
				const TA = findTA(item.name);
				if(TA) {
					// let pane = currPane;
					// if (TA.newPane) pane = pane + 1;
					// setCurrPane(pane);
					let chartRef;
					if(TA.newPane) {
						chartRef = createChart(chartContainerRef.current, {
							width: 0,
							height: 300,
							timeScale: {
								timeVisible: true,
								secondsVisible: true,
							},
							layout: {
								backgroundColor: '#f7f7f7',
								textColor: '#0e416b',
							},
						});
						setTAChartInstances({...TAChartInstances, [item.name]: chartRef});

						console.log('new pane created------------------', props.TIdata);

					}else {
						chartRef = chart;
					}

					if(item.name === 'macd') {
						setMACDChart(item.data, chartRef);
					} else if (item.name === 'bbands') {
						setBBANDSChart(item.data, chartRef);
					} else if (item.name === 'stoch') {
						setSTOCHChart(item.data, chartRef);
					} else {
						const chartFunc = addSeriesFunction[TA.chartType];
						const TAInstance = chartRef[chartFunc]({
							color: getRandomColor(),
							lineWidth: 1,
							title: TA.name,

						});
						const data = reFormatPastData(item.data, TA.chartType, TA.name);
						data.filter((item) => item.value !== '');
						TAInstance.setData(data);
						setTACarts({...TACarts, [item.name]: TAInstance});
						console.log('chart added');
					}
					
				}
			}
		});


	}, [props.TIdata]);

	useEffect(() => {
		const keyList = TACarts ? Object.keys(TACarts) : [];
		const keyChartList = TAChartInstances ? Object.keys(TAChartInstances) : [];
		keyList.forEach((key) => {
			if(!(props.selectedTAs.includes(key))) {
				console.log('chart removed', key, props.TIdata);
				// if()
				if (keyChartList.includes(key)) {
					TAChartInstances[key] = null;
					delete TAChartInstances[key];
				} else {
					if(key === 'bbands') {
						chart.removeSeries(TACarts[key].upper);
						chart.removeSeries(TACarts[key].middle);
						chart.removeSeries(TACarts[key].lower);
						delete TACarts[key];
					}else {
						chart.removeSeries(TACarts[key]);
						delete TACarts[key];
					}
				}
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
			props.getPastData(false, Math.floor((startTime - 19800)*1000), (endTime - 19800)*1000);

		}
	};

	const getRandomColor = () => {
		const randomIndex = Math.floor(Math.random() * colors.length);
		return colors[randomIndex];
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

	const logicalTimeRangeChangeHandler = (newVisibleLogicalRange) => {
		if(newVisibleLogicalRange !== null) {
			setNewLogicalRange(newVisibleLogicalRange);
		}
	};

	const handleOnClick = () => {
		findTimeRangeAndGetData(newLogicalRange);
	};

	//special technical indicators data setting
	const setMACDChart = (data, chart) => {
		const macdFastData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.macd_fast
			};
		});

		const macdSlowData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.macd_slow
			};
		});

		const macdHistogramData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.macd_histogram,
				color: item.macd_histogram > 0 ? '#11a632' : '#d53e3b'
			};
		});

		const macdFast = chart.addLineSeries({
			title: 'MACD Fast',
			color: '#1f5ed2',
			lineWidth: 1,
		});

		const macdSlow = chart.addLineSeries({
			title: 'MACD Slow',
			color: '#4d1b7e',
			lineWidth: 1,
		});

		const macdHistogram = chart.addHistogramSeries({
			title: 'MACD Histogram',
			lineWidth: 1,
		});

		macdFast.setData(macdFastData);
		macdSlow.setData(macdSlowData);
		macdHistogram.setData(macdHistogramData);

		setTACarts({...TACarts, ['macd']: {fast: macdFast, slow: macdSlow, histogram: macdHistogram}});

	};

	const setBBANDSChart = (data, chart) => {
		const bbandsUpperData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.bbands_upper
			};
		});

		const bbandsMiddleData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.bbands_middle
			};
		});

		const bbandsLowerData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.bbands_lower
			};
		});

		const bbandsUpper = chart.addLineSeries({
			title: 'BBANDS Upper',
			color: '#1f5ed2',
			lineWidth: 1,
		});

		const bbandsMiddle = chart.addLineSeries({
			title: 'BBANDS Middle',
			color: '#4d1b7e',
			lineWidth: 1,
		});

		const bbandsLower = chart.addLineSeries({
			title: 'BBANDS Lower',
			color: '#d53e3b',
			lineWidth: 1,
		});

		bbandsUpper.setData(bbandsUpperData);
		bbandsMiddle.setData(bbandsMiddleData);
		bbandsLower.setData(bbandsLowerData);

		setTACarts({...TACarts, ['bbands']: {upper: bbandsUpper, middle: bbandsMiddle, lower: bbandsLower}});
	};

	const setSTOCHChart = (data, chart) => {
		const stochKData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.stoch_k
			};
		});

		const stochDData = data.map((item) => {
			return {
				time: item.doc.open_time / 1000 + 19800,
				value: item.stoch_d
			};
		});

		const stochK = chart.addLineSeries({
			title: 'STOCH K',
			color: '#e53213',
			lineWidth: 1,
		});

		const stochD = chart.addLineSeries({
			title: 'STOCH D',
			color: '#0b8da9',
			lineWidth: 1,
		});

		stochK.setData(stochKData);
		stochD.setData(stochDData);

		setTACarts({...TACarts, ['stoch']: {k: stochK, d: stochD}});
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
					onScrollCapture={()=> console.log('scroll^^^^^^^^^^^^^^^^^^')}
				/>
			</div>
		</Fragment>

	);
};

export default Chart;