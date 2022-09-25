import React, {Fragment, useEffect, useState, useRef} from 'react';
import Chart from '../common/chart';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import {Link} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';

let stompClient = null;


const TradingChart = () => {
	const [selectedChartType, setSelectedChartType] = useState('candleStick');
	const [selectedInterval, setSelectedInterval] = useState('1m');
	const [selectedTradingPair, setSelectedTradingPair] = useState('BTCUSDT');
	const [selectedTradeType, setselectedTradeType] = useState('crypto');

	const [tradingPairs, setTradingPairs] = useState(['BTCUSDT', 'BTCUSD', 'ETHBTC', 'ETHUSDT', 'ETHUSD', 'LTCBTC', 'LTCUSDT', 'LTCUSD', 'XRPBTC', 'XRPUSDT', 'XRPUSD']);
	const [chartTypes, setChartTypes] = useState([{name:'CandleStick', slug:'candleStick'},  {name:'Line', slug:'line'}]);
	const [intervals, setIntervals] = useState(['1m', '5m', '30m', '1h',  '1d', '1w', '1M']);
	const [techIndicators, setTechIndicators] = useState(['BBANDS', 'EMA' , 'MA' , 'SMA' , 'WMA' , 'MACD' , 'ROC', 'RSI', 'STOCH', 'OBV' ]);

	const [initData, setInitData] = useState([]);
	const [lastData, setLastData] = useState(null);

	const [show, setShow] = useState(false);



	useEffect(() => {
		console.log('useEffect 2 ', stompClient);

		if(stompClient)  stompClient.disconnect();
		connectToServer();

	}, [selectedTradingPair, selectedInterval]);


	const connectToServer = () => {
		let sock = new SockJS('http://ec2-54-82-7-139.compute-1.amazonaws.com:8080/ws');
		stompClient = over(sock);
		stompClient.connect({}, onConnected, onError);
		console.log('stompClient', stompClient);
	};

	const onConnected = (frame) => {

		const baseURL = '/topic/';
		const topic = baseURL + 'binance_' + selectedTradingPair + '_' + selectedInterval;
		console.log('topic', topic);
		subscribeToTopic(topic);
	};

	const onError = (error) => {
		console.log(error,'00000000000000000');

	};

	const subscribeToTopic = (topic) => {
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', selectedTradingPair);
		stompClient.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);

			console.log('tradingData', tradingData);

			setLastData(tradingData);

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
	};

	const handleChangeTradingPair = (value) => {
		setSelectedTradingPair(value);
	};

	const handleChangeInterval = (value) => {
		setSelectedInterval(value);
	};

	const handleAddAlert = () => {
		console.log('handleAddAlert');
	};

	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

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
									{tradingPairs.map((pair) => (
										<li
											className="dropdown-item"
											onClick={() => handleChangeTradingPair(pair)}
											key={pair}>{pair}
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
									Chart Type
								</button>
								<ul className="dropdown-menu">
									{chartTypes.map((type) => (<li className="dropdown-item" onClick={() => handleChangeChartType(type.slug)} key={type.slug}>{type.name}</li>))}
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
									{intervals.map((interval) => (
										<li
											className="dropdown-item"
											key={interval}
											onClick={() => handleChangeInterval(interval)}
										>
											{interval}
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
									<li className="dropdown-item" onClick={handleShow}>Add alert</li>
									<li><Link className="dropdown-item" to="/login">View alerts</Link></li>
									<li><Link className="dropdown-item" to="/login">View alerts</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Chart initData={initData} lastData={lastData}  chartType={selectedChartType} interval={selectedInterval}/>
			</section>
			<section>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Alert</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<div className="mb-3">
								<label htmlFor="price" className="form-label">Price</label>
								<input type="price" className="form-control" id="price" aria-describedby="emailHelp"/>
							</div>

							<div className="mb-3">
								<label htmlFor="type" className="form-label">Type</label>
								<select className="form-control" id="type" aria-label="Default select example">
									<option selected>Open this select menu</option>
									<option value="1">Crossing</option>
								</select>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Add Alert
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</Fragment>
	);
};

export default TradingChart;