import React, { Fragment, useContext, useEffect, useState } from 'react';
import Chart from '../common/chart';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import {
	addNewAlert,
	getAvailableProviders,
	getIndicatorList,
	getPastTradingData, getTechnicalIndicators,
} from '../../services/chartService';
import PreLoader from '../common/loader';
import { StoreContext } from '../common/stateProvider';
import toast from 'react-hot-toast';
import InputField from '../common/inputField';


const TradingChart = () => {
	const [selectedChartType, setSelectedChartType] = useState('candleStick');
	const [selectedInterval, setSelectedInterval] = useState('');
	const [selectedTradingPair, setSelectedTradingPair] = useState({});
	const [selectedProvider, setSelectedProvider] = useState({});
	const [selectedTAs, setSelectedTAs] = useState([]);

	const [tradingPairs, setTradingPairs] = useState([]);
	const [chartTypes, setChartTypes] = useState([
		{ name: 'CandleStick', slug: 'candleStick' },
		{ name: 'Line', slug: 'line' },
	]);
	const [intervals, setIntervals] = useState([]);
	const [techIndicators, setTechIndicators] = useState();
	const [providers, setProviders] = useState([]);

	const [initData, setInitData] = useState([]);
	const [lastData, setLastData] = useState(null);
	const [TIData, setTIData] = useState([]);

	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [isUpdated, setIsUpdated] = useState(false);
	const [alertPrice, setAlertPrice] = useState(0);

	const [subscription, setSubscription] = useState(null);
	const [lastTimeValue, setLastTimeValue] = useState(Date.now() - 200000);

	const { stompClient, user } = useContext(StoreContext);

	//useEffect for get initial data
	useEffect(() => {
		getProviders();
		getIndicators();
	}, []);

	useEffect(() => {
		if (subscription) {
			stompClient?.unsubscribe(subscription);
			setSubscription(null);
		}

		if (selectedTradingPair && selectedInterval && stompClient) {
			getPastData();
			setIsUpdated(true);
			const baseURL = '/topic/';
			const topic = baseURL + selectedProvider.slug  + '_' + selectedTradingPair.providedName + '_' + selectedInterval;
            if(selectedProvider.slug === 'binance'){
                subscribeToTopic(topic);
            }

		}

	}, [selectedTradingPair, selectedInterval, selectedChartType, stompClient]);

	const subscribeToTopic = (topic) => {
		stompClient?.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);
			setSubscription(message.headers.subscription);
			setLastData(tradingData);
		});
	};

	const getPastData = async (initial = true, start= Date.now() - 20000000, end = Date.now(), symbol = selectedTradingPair._id, interval = selectedInterval) => {
		console.log('adding new data', selectedProvider, start, end);
		initial && setIsLoading(true);
		const data = {
			symbol: symbol,
			interval: interval,
			start: start,
			end: Date.now(),
		};

		try {
			const {data: tradingData} = await getPastTradingData(data);
			// const tradeData = [...initData];
			setInitData(tradingData);
			setIsUpdated(true);
		} catch (e) {
			console.log(e);
		}
		initial && setIsLoading(false);
	};

	const getProviders = async () => {
		try {
			const { data } = await getAvailableProviders();
			setProviders(data);
			setSelectedProvider(data[0]);
			setTradingPairs(data[0]?.symbols);
			setIntervals(data[0]?.providedTimeFrames);
			setSelectedTradingPair(data[0]?.symbols[0]);
			setSelectedInterval(data[0]?.providedTimeFrames[0]);
		} catch (ex) {
			console.log(ex);
		}
	};

	const getIndicators = async () => {
		try {
			const { data } = await getIndicatorList();
			setTechIndicators(data?.data);
		} catch (ex) {
			console.log(ex);
		}
	};

	const handleChangeChartType = (value) => {
		setSelectedChartType(value);
	};

	const handleChangeTradingPair = (value) => {
		setTIData([]);
		setSelectedTradingPair(value);
		setInitData([]);
		setLastTimeValue(Date.now() - 200000);
		const tempSelectedTAs = [...selectedTAs];
		setSelectedTAs([]);
		// setSelectedTAs(tempSelectedTAs);
		// tempSelectedTAs.map((ta) => {
		// 	getTIData(ta, Date.now() - 20000000, []);
		// });

		const tempTechIndicators = [...techIndicators];
		setTechIndicators(tempTechIndicators);
	};

	const handleChangeInterval = (value) => {
		setSelectedInterval(value);
		setInitData([]);
	};

	const handleSelectTAs = async (ta) => {
		setIsLoading(true);
		const value = ta.name;
		if (selectedTAs.includes(value)) {
			setSelectedTAs(selectedTAs.filter((item) => item !== value));
			setTIData(TIData.filter((item) => item.name !== value));
		} else {
			setSelectedTAs([...selectedTAs, value]);
			await getTIData(value);
		}
		setIsLoading(false);
	};

	const getTIData =async (tiName, startTime = lastTimeValue-200000, TIDataList = TIData) => {
		try {
			const {data} = await getTechnicalIndicators({
				symbolId: selectedTradingPair._id,
				timeframe: selectedInterval,
				TI: tiName,
				startTime: startTime,
				endTime: Date.now(),
			});

			setTIData([...TIDataList, {name: data.TI, data: data.data}]);
		} catch (ex) {
			console.log(ex);
		}
	};



	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

	const handleChangeProvider = (value) => {
		setSelectedProvider(value);
		setTradingPairs(value.symbols);
		setIntervals(value.providedTimeFrames);
		setSelectedTradingPair(value.symbols[0]);
		setSelectedInterval(value.providedTimeFrames[0]);
		setInitData([]);
	};

	//adding new alert
	const handleAddNewAlert = async () => {
		setIsLoading(true);
		const userID = localStorage.getItem('user_id');
		if(!userID) {
			toast.error('Somthing Went Wrong!, Please Login Again');
		}
		const alert = {
			trigger_price: alertPrice,
			symbol: selectedTradingPair._id,
			user: userID,
			alert_type: 'Crossing',
		};
		try {
			const response = await addNewAlert(alert);
			if (response.status === 200) {
				setShow(false);
				toast.success('Alert added successfully');
			} else {
				toast.error('Something went wrong');
			}
		} catch (err) {
			toast.error('Something went wrong');
		}

		setIsLoading(false);
	};

	const handleAlertPriceChange = (e) => {
		setAlertPrice(e.target.value);
	};

	return (
		<Fragment>
			<PreLoader isLoading={isLoading} />
			<section id="chart" className="section overflow-hidden">
				<div className="chart-container">
					<div className="shadow my-md-2 my-sm-0">
						<div className="row">
							<div className="col-lg-2 col-md-4 col-sm-6 p-1">
								<div className="dropdown drop-item">
									<button
										className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
                    Providers |{' '}
										<span className="font-weight-bold">
											{selectedProvider?.name}
										</span>
									</button>
									<ul className="dropdown-menu">
										{providers?.map((provider) => (
											<li
												key={provider.slug}
												className={
													selectedProvider === provider
														? 'dropdown-item bg-warning'
														: 'dropdown-item'
												}
												onClick={() => handleChangeProvider(provider)}
											>
												{provider.name}
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-4 col-sm-6 p-1">
								<div className="dropdown drop-item ">
									<button
										className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
                    Trading Pair |{' '}
										<span className="font-weight-bold">
											{selectedTradingPair?.name}
										</span>
									</button>
									<ul className="dropdown-menu">
										{tradingPairs?.map((pair) => (
											<li
												className={
													selectedTradingPair === pair
														? 'dropdown-item bg-warning'
														: 'dropdown-item'
												}
												onClick={() => handleChangeTradingPair(pair)}
												key={pair._id}
											>
												{pair.name}
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-4 col-sm-6 p-1">
								<div className="dropdown drop-item">
									<button
										className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
                    Chart Type |{' '}
										<span className="font-weight-bold">
											{selectedChartType}
										</span>
									</button>
									<ul className="dropdown-menu">
										{chartTypes?.map((type) => (
											<li
												className={
													selectedChartType === type.slug
														? 'dropdown-item bg-warning'
														: 'dropdown-item'
												}
												onClick={() => handleChangeChartType(type.slug)}
												key={type.slug}
											>
												{type.name}
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-4 col-sm-6 p-1">
								<div className="dropdown drop-item">
									<button
										className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
                    Time Interval |{' '}
										<span className="font-weight-bold">{selectedInterval}</span>
									</button>
									<ul className="dropdown-menu">
										{intervals?.map((interval) => (
											<li
												className={
													selectedInterval === interval
														? 'dropdown-item bg-warning'
														: 'dropdown-item'
												}
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
								<div className="dropdown drop-item">
									<button
										className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
                    Technical Indicators
									</button>
									<ul className="dropdown-menu">
										{techIndicators?.map((indicator) => (
											<li className="dropdown-item" key={indicator._id}>
												<div className="form-check">
													<input
														type="checkbox"
														className="form-check-input"
														id={indicator._id}
														name="option1"
														checked={selectedTAs.includes(indicator.name)}
														onClick={() => handleSelectTAs(indicator)}
													/>
													<label
														className="form-check-label"
														htmlFor={indicator._id}
													>
														{indicator.name}
													</label>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="col-lg-2 col-md-4 col-sm-6 p-1">
								<div className="dropdown drop-item">
									<button
										className=" dropdown-toggle
									text-black-50 border-0 border-shape bg-white p-2"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
                    Alerts
									</button>
									<ul className="dropdown-menu">
										<li className="dropdown-item" style={{cursor: 'pointer'}} onClick={handleShow}>
                      Add alert
										</li>
										<li>
											<Link className="dropdown-item" to="/profile/alerts">
                        View alerts
											</Link>
										</li>
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
						TIdata={TIData}
						techIndicators={techIndicators}
						selectedTAs={selectedTAs}
						getPastData={getPastData}
						setLastTime={setLastTimeValue}
						getTIData={getTIData}
					/>
				</div>
			</section>
			<section>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Alert</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form className="w-100">
							{!user && (
								<div className="text-danger text-center">
                  You need to login to add alerts.
								</div>
							)}

							<InputField
								type="price"
								name="alert-price"
								label="Alert Price"
								value={alertPrice}
								onChange={handleAlertPriceChange}
								error={''}
								disabled={!user}
								labelStyle=""
								inputStyle=""
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
              Close
						</Button>
						<Button
							variant="primary"
							onClick={handleAddNewAlert}
							disabled={!user}
						>
              Add Alert
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</Fragment>
	);
};

export default TradingChart;
