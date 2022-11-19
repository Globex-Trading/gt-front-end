import {createChart} from 'lightweight-charts';
import React, {createRef, Fragment, useEffect, useRef} from 'react';
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

	const [chartDivs, setChartDivs] = React.useState([]);

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

	//useEffect for assigning divs to TI
	useEffect(() => {
		assignDivsForTI();
	}, [props.techIndicators]);

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
			const timeRange = chart.timeScale().getVisibleRange();
			props.setLastTime((timeRange?.from - 19800)*1000);
			findTimeRangeAndGetData(logicalRange);

		}

		setIsLoading(false);
		chart?.timeScale()?.subscribeVisibleLogicalRangeChange(logicalTimeRangeChangeHandler);

	}, [props.chartType, props.interval, props.tradingPair, props.initData]);

	useEffect(() => {
		props.TIdata.forEach((item) => {
			const keys = TACarts? Object.keys(TACarts) : [];
			if(!(keys.includes(item.name))) {
				const TA = findTA(item.name);
				if(TA) {
					let chartRef;
					if(TA.newPane) {
						const element = findRef(item.name);
						chartRef = createChart(element.ref.current, {
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
						chartRef.timeScale().subscribeVisibleLogicalRangeChange(logicalTimeRangeChangeHandler);


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
						TAInstance.setData(data.filter((item) => item.value !== ''));
						setTACarts({...TACarts, [item.name]: TAInstance});
						console.log('chart added');
					}
					
				}
			}else {
				const chartSeries = TACarts[item.name];
				const TA = findTA(item.name);
				if(item.name === 'macd') {
					setMACDChart(item.data, {}, false, chartSeries);
				} else if (item.name === 'bbands') {
					setBBANDSChart(item.data, {}, false, chartSeries);
				} else if (item.name === 'stoch') {
					setSTOCHChart(item.data, {}, false, chartSeries);
				} else {
					const data = reFormatPastData(item.data, TA.chartType, TA.name);
					chartSeries.setData(data.filter((item) => item.value !== ''));
				}

			}
		});


	}, [props.TIdata]);

	useEffect(() => {
		const keyList = TACarts ? Object.keys(TACarts) : [];
		const keyChartList = TAChartInstances ? Object.keys(TAChartInstances) : [];
		keyList.forEach((key) => {
			if(!(props.selectedTAs.includes(key))) {
				if (keyChartList.includes(key)) {
					const indicator = findTA(key);
					if(indicator.newPane) {
						const chartDiv = findRef(key);
						chartDiv.ref.current.removeChild(chartDiv.ref.current.children[0]);
					}
					TAChartInstances[key] = null;
					delete TAChartInstances[key];
					delete TACarts[key];
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
			if (props.lastData.klineClosed) {
				const startTime = chart.timeScale().coordinateToTime(chart.timeScale().logicalToCoordinate(0));
				props.selectedTAs.map(item => {
					props.getTIData(item, startTime);
				});
			}
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
			props.getPastData(false, Math.floor((startTime - 19800)*1000), (fromTime - 19800)*1000);

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

	const findRef = (name) => {
		for (let i = 0 ; i < chartDivs.length; i++) {
			if(chartDivs[i].indicator === name) {
				return chartDivs[i];
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
		props.selectedTAs.map((ta) => {
			handleTI(ta);
		});
	};

	//special technical indicators data setting
	const setMACDChart = (data, chart, isInitial = true, chartSeries) => {
		let macdFastData = [];
		let macdSlowData = [];
		let macdHistogramData = [];


		data.map((item) => {
			if(item.macd_fast !== '' && item.macd_slow !== '' && item.macd_histogram !== '') {
				macdFastData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.macd_fast
				});
				macdSlowData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.macd_slow
				});
				macdHistogramData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.macd_histogram,
					color: item.macd_histogram > 0 ? '#11a632' : '#d53e3b'
				});
			}
		});

		if(isInitial) {
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
		} else {
			chartSeries.fast.setData(macdFastData);
			chartSeries.slow.setData(macdSlowData);
			chartSeries.histogram.setData(macdHistogramData);
		}
	};

	const setBBANDSChart = (data, chart, isInitial = true, chartSeries) => {
		let bbandsUpperData = [];
		let bbandsMiddleData = [];
		let bbandsLowerData = [];
		data.map((item) => {
			if(item.bbands_upper !== '' && item.bbands_middle !== '' && item.bbands_lower !== '') {
				bbandsUpperData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.bbands_upper
				});
				bbandsMiddleData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.bbands_middle
				});
				bbandsLowerData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.bbands_lower
				});
			}
		});


		if(isInitial) {

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
		} else {
			chartSeries.upper.setData(bbandsUpperData);
			chartSeries.middle.setData(bbandsMiddleData);
			chartSeries.lower.setData(bbandsLowerData);
		}
	};

	const setSTOCHChart = (data, chart, isInitial= true, chartSeries) => {
		let stochKData = [];
		let stochDData = [];
		data.map((item) => {
			if(item.stoch_k !== '' && item.stoch_d !== '') {
				stochKData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.stoch_k
				});
				stochDData.push({
					time: item.doc.open_time / 1000 + 19800,
					value: item.stoch_d
				});
			}
		});

		if(isInitial) {
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
		} else {
			chartSeries.k.setData(stochKData);
			chartSeries.d.setData(stochDData);
		}
	};

	const handleTI = (value) => {
		const TI = findTA(value);
		let chartIn = chart;
		if(TI?.newPane) {
			chartIn = TAChartInstances[value];
		}
		const timeRange = chartIn?.timeScale().getVisibleRange();
		const logicalRange = newLogicalRange;
		console.log(value, logicalRange, '!!!!!!!!!!!!!!', timeRange);
		if (logicalRange && logicalRange.from < 0 && timeRange) {
			const {from, to} = logicalRange;
			const {from: fromTime, to: toTime} = timeRange;
			const timeInterval = (toTime - fromTime) / to;
			const startTime = fromTime - (Math.ceil(Math.abs(from)) * (timeInterval + 5));
			props.getTIData(value, (startTime-19800)*1000);
			findTimeRangeAndGetData(newLogicalRange);
		}
	};

	//create divs for technical indicators which need a new pane to plot
	const assignDivsForTI = () => {
		const divList = [];
		props?.techIndicators?.forEach((item) => {
			const ref = createRef();
			item.newPane && divList.push(
				{
					indicator: item.name,
					ref: ref,
					element: <div ref={ref} style={{bottom: '0', right: '0'}}/>
				}
			);
		});
		setChartDivs(divList);
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
				/>
			</div>
			{chartDivs.map((item, index) => <div key={index} className='px-5 mt-3' onClick={()=> handleTI(item.indicator)}>{item.element}</div>)}
		</Fragment>

	);
};

export default Chart;