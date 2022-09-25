import React, {Fragment, useEffect, useState, useRef} from 'react';
import Chart from '../common/chart';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import {Link} from 'react-router-dom';

let stompClient = null;


const TradingChart = () => {
	const [selectedChartType, setSelectedChartType] = useState('line');
	const [selectedInterval, setSelectedInterval] = useState('1d');
	const [selectedSymbol, setSelectedSymbol] = useState('BTC');
	const [selectedTradeType, setselectedTradeType] = useState('crypto');

	const [tradingPairs, setTradingPairs] = useState(['BTCUSDT', 'BTCUSD', 'ETHBTC', 'ETHUSDT', 'ETHUSD', 'LTCBTC', 'LTCUSDT', 'LTCUSD', 'XRPBTC', 'XRPUSDT', 'XRPUSD']);
	const [chartTypes, setChartTypes] = useState(['CandleStick', 'Line',]);
	const [intervals, setIntervals] = useState(['1m', '5m', '30m', '1h',  '1d', '1w', '1M']);
	const [techIndicators, setTechIndicators] = useState(['BBANDS', 'EMA' , 'MA' , 'SMA' , 'WMA' , 'MACD' , 'ROC', 'RSI', 'STOCH', 'OBV' ]);

	const [initData, setInitData] = useState([]);
	const [lastData, setLastData] = useState(null);

	let candleData = [
		{time: 1664038980000, open: 19101.73, high: 19108.05, low: 19100.27, close: 19105.14},
		// {time: 1664039040000, open: 19104.31, high: 19105.74, low: 19104.24, close: 19105.27},
		// {time: 1664039040000, open: 19104.31, high: 19105.74, low: 19104.24, close: 19105.25},
		// {time: 1664039040000, open: 19104.31, high: 19106.86, low: 19103.24, close: 19103.5},
		{time: 1664039100000, open: 19118.77, high: 19120.29, low: 19117.94, close: 19119.48},
		// {time: 1664039100000, open: 19118.77, high: 19120.29, low: 19113.98, close: 19114.69},
		// {time: 1664039100000, open: 19118.77, high: 19120.29, low: 19111.92, close: 19112.9},
		// {time: 1664039100000, open: 19118.77, high: 19120.29, low: 19109.23, close: 19111.99}
	];
	let lineData = [ { time: '2019-04-11', value: 80.01 },
		{ time: '2019-04-12', value: 96.63 },
		{ time: '2019-04-13', value: 76.64 },
		{ time: '2019-04-14', value: 81.89 },
		{ time: '2019-04-15', value: 74.43 },
		{ time: '2019-04-16', value: 80.01 },
		{ time: '2019-04-17', value: 96.63 },
		{ time: '2019-04-18', value: 76.64 },
		{ time: '2019-04-19', value: 81.89 },
		{ time: '2019-04-20', value: 74.43 }];



	useEffect(() => {
		console.log('useEffect 2 ', stompClient);

		if(!stompClient) {
			connectToServer();
		}

	}, []);


	const connectToServer = () => {
		let sock = new SockJS('http://ec2-54-82-7-139.compute-1.amazonaws.com:8080/ws');
		stompClient = over(sock);
		stompClient.connect({}, onConnected, onError);
		console.log('stompClient', stompClient);
	};

	const onConnected = (frame) => {
		console.log('onConnected', frame);
		console.log('onConnected', stompClient);
		subscribeToTopic('/topic/binance_BTCUSDT_1m');
	};

	const onError = (error) => {
		console.log(error,'00000000000000000');

	};

	const subscribeToTopic = (topic) => {
		stompClient.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);



			// console.log('tradingData', tradingData);
			// if(tradingData.klineClosed) {
			//
			// 	console.log('------------', message);
			//
			const chartData = {
				time: tradingData.openTime,
				open: tradingData.openPrice,
				high: tradingData.highPrice,
				low: tradingData.lowPrice,
				close: tradingData.closePrice
			};

			setLastData(chartData);

			console.log(chartData);

			// console.log('data',data);
			// const newData = data;
			// newData.push(chartData);
			// console.log('newData',newData);
			// setData(newData);
			// console.log('data', [...data, chartData]);
			// }
		});
	};

	// useEffect(() => {
	// 	console.log('running useEffect', lastData);
	// 	data = candleData;
	// 	console.log('data', data);
	// });
	useEffect(() => {
		getPastData();
		console.log('running useEffect', initData);
	},[]);

	const getPastData = () => {
		//TODO: call api to get past data
		// setInitData(candleData);
	};

	const handleChangeChartType = (value) => {
		setSelectedChartType(value);
		if(value === 'CandleStick') {
			setLastData(candleData);
		}else if (value === 'Line') {
			setLastData(lineData);
		}
	};

	return (
		<Fragment>
			<section
				id="chart"
				className="section bg-overlay overflow-hidden"
			>
				<div className="container my-lg-3 my-md-2 my-sm-0">
					<div className="row">
						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
										Actions
								</button>
								<ul className="dropdown-menu">
									<li><Link className="dropdown-item" to="/">Home</Link></li>
									<li><Link className="dropdown-item" to="/login">Login</Link></li>
									<li><Link className="dropdown-item" to="/services">Service</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
									Trading Pair
								</button>
								<ul className="dropdown-menu">
									{tradingPairs.map((pair) => (<li className="dropdown-item" key={pair}>{pair}</li>))}
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
									Chart Type
								</button>
								<ul className="dropdown-menu">
									{chartTypes.map((type) => (<li className="dropdown-item" onClick={() => handleChangeChartType(type)} key={type}>{type}</li>))}
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
									Time Interval
								</button>
								<ul className="dropdown-menu">
									{intervals.map((interval) => (<li className="dropdown-item" key={interval}>{interval}</li>))}
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
									Technical Indicators
								</button>
								<ul className="dropdown-menu">{techIndicators.map((indicator) => (
									<li className="dropdown-item" key={indicator}>
										<div className="form-check">
											<input type="checkbox" className="form-check-input" id={indicator} name="option1" value={indicator}/>
											<label className="form-check-label" htmlFor={indicator}>{indicator}</label>
										</div>
									</li>
								))}
								</ul>
							</div>
						</div>

						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
									Alerts
								</button>
								<ul className="dropdown-menu">
									<li><Link className="dropdown-item" to="/">Add alert</Link></li>
									<li><Link className="dropdown-item" to="/login">View alerts</Link></li>
									<li><Link className="dropdown-item" to="/login">View alerts</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Chart initData={initData} lastData={lastData}  chartType={'candleStick'}/>
			</section>
		</Fragment>
	);
};

export default TradingChart;