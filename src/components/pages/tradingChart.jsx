import React, {Fragment, useContext, useEffect, useState} from 'react';
import Chart from '../common/chart';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import {Link} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import {getAvailableProviders, getAvailableSymbols, getPastTradingData} from '../../services/trader/chartService';
import PreLoader from '../common/loader';
import {store} from '../../App';

let stompClient = null;


const TradingChart = () => {
	const [selectedChartType, setSelectedChartType] = useState('candleStick');
	const [selectedInterval, setSelectedInterval] = useState('');
	const [selectedTradingPair, setSelectedTradingPair] = useState({});
	const [selectedProvider, setSelectedProvider] = useState({});

	const [tradingPairs, setTradingPairs] = useState([]);
	const [chartTypes, setChartTypes] = useState([{name:'CandleStick', slug:'candleStick'},  {name:'Line', slug:'line'}]);
	const [intervals, setIntervals] = useState([]);
	const [techIndicators, setTechIndicators] = useState([]);
	const [providers, setProviders] = useState([]);

	const [initData, setInitData] = useState(null);
	const [lastData, setLastData] = useState(null);

	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [isUpdated, setIsUpdated] = useState(false);

	const {state} = useContext(store);
	const {user} = state;


	useEffect(() => {
		console.log('useEffect 1 - set isloading to true');
		const fetchdata = async () => {
			setIsLoading(true);
			await getProviders();
		};
		fetchdata();

	},[]);



	useEffect(() => {
		const fetchPastData = async () => {
			await getPastData();
			setIsUpdated(true);
		};

		if(stompClient)  stompClient.disconnect();

		if(selectedTradingPair && selectedInterval) {
			fetchPastData();
			connectToServer();
		}

		return () => {
			if(stompClient)  stompClient.disconnect();
		};
	}, [selectedTradingPair, selectedInterval, selectedChartType]);



	//function for connecting to WebSocket server
	const connectToServer = () => {
		let sock = new SockJS('http://ec2-54-82-7-139.compute-1.amazonaws.com:8080/ws');
		stompClient = over(sock);
		stompClient.connect({}, onConnected, onError);
		console.log('stompClient', stompClient);
	};

	const onConnected = (frame) => {

		const baseURL = '/topic/';
		const topic = baseURL + selectedProvider.slug  + '_' + selectedTradingPair.providedName + '_' + selectedInterval;
		console.log('topic', topic);
		subscribeToTopic(topic);
	};

	const onError = (error) => {
		console.log(error);

	};

	const subscribeToTopic = (topic) => {
		stompClient.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);

			console.log('tradingData', tradingData);

			setLastData(tradingData);

		});
	};

	const getPastData = async () => {
		setIsLoading(true);
		const data = {
			symbol: selectedTradingPair._id,
			interval: selectedInterval,
			start: Date.now() - 200000000,
			end: Date.now()
		};
		const {data: tradingData} = await getPastTradingData(data);
		console.log('tradingData', tradingData);
		setInitData(tradingData);
		setIsLoading(false);
		// setInitData();
	};

	const getProviders = async () => {
		const {data} = await getAvailableProviders();
		setProviders(data);
		setSelectedProvider(data[0]);
		setTradingPairs(data[0].symbols);
		setIntervals(data[0].providedTimeFrames);
		setSelectedTradingPair(data[0].symbols[0]);
		setSelectedInterval(data[0].providedTimeFrames[0]);
		console.log('response', data);
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

	const handleChangeProvider = (value) => {
		setSelectedProvider(value);
		setTradingPairs(value.symbols);
		setIntervals(value.providedTimeFrames);
		setSelectedTradingPair(value.symbols[0]);
		setSelectedInterval(value.providedTimeFrames[0]);
	};



	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<section
				id="chart"
				className="section bg-overlay overflow-hidden"
			>
				<div className="container mt-lg-5 my-md-2 my-sm-0 top-pad">
					<div className="row">
						<div className="col-lg-2 col-md-4 col-sm-6 p-1">
							<div className="dropdown ">
								<button
									className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
									type="button"
									data-bs-toggle="dropdown" aria-expanded="false"
								>
										Providers
								</button>
								<ul className="dropdown-menu">
									{providers.map(provider => (
										<li key={provider.slug} className="dropdown-item"
											onClick={() => handleChangeProvider(provider)}>
											{provider.name}
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
									Trading Pair
								</button>
								<ul className="dropdown-menu">
									{tradingPairs.map((pair) => (
										<li
											className="dropdown-item"
											onClick={() => handleChangeTradingPair(pair)}
											key={pair._id}>{pair.name}
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
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Chart
					initData={initData}
					lastData={lastData}
					chartType={selectedChartType}
					interval={selectedInterval}
					tradingPair={selectedTradingPair}
					isUpdate={isUpdated}
					setIsUpdate={setIsUpdated}
				/>
			</section>
			<section>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Alert</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						{!user && <div className="text-danger text-center">You need to login to add alerts.</div>}

						<form>
							<div className="mb-3">
								<label htmlFor="price" className="form-label">Price</label>
								<input type="price" className="form-control" id="price" aria-describedby="emailHelp" disabled={!user}/>
							</div>

							<div className="mb-3">
								<label htmlFor="type" className="form-label">Type</label>
								<select className="form-control" id="type" aria-label="Default select example" disabled={!user}>
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
						<Button variant="primary" onClick={handleClose} disabled={!user}>
							Add Alert
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</Fragment>
	);
};

export default TradingChart;