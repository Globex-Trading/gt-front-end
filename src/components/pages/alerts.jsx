import React, {Fragment, useContext, useEffect, useState} from 'react';
import {getWatchList} from '../../services/profileService';
import Table from 'react-bootstrap/Table';
import PreLoader from '../common/loader';
import {StoreContext} from '../common/stateProvider';
import {sym} from 'enzyme/build/Utils';
import {getAvailableSymbols} from '../../services/chartService';
import {Button, Modal} from 'react-bootstrap';
import InputField from '../common/inputField';

let watchListData = {};

const Alerts = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setIsUpdate] = useState(false);
	const [watchlist, setWatchlist] = useState([
		{
			_id: 1,
			name: 'BTCUSDT',
			provider: 'binance',
		},
		{
			_id: 2,
			name: 'ETHUSDT',
			provider: 'binance',
		},
	]);
	// const [watchListData, setWatchListData] = useState({});
	const [subscriptions, setSubscriptions] = useState({});
	const [tradingPairs, setTradingPairs] = useState([]);
	const [show, setShow] = useState(false);
	const [modalType, setModalType] = useState({});
	const [selectedValue, setSelectedValue] = useState([]);

	const {state} = useContext(StoreContext);

	const stompClient = state?.stompClient;

	const funcMap = {
		'add': tradingPairs,
		'remove': watchlist
	};

	useEffect(() => {
		setIsLoading(true);
		getWatchlist();
		getAvailableTradingPairs();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

	}, []);

	setInterval(() => setIsUpdate(!isUpdate), 1000);


	useEffect(() => {
		if (stompClient) {
			watchlist.forEach((item) => {
				if (!(item in subscriptions)) {
					const topic = '/topic/' + item.provider + '_' + item.symbol;
					subscribeToTopic(topic, item.symbol);
				}
			});
		}


	}, [stompClient, watchlist]);

	const subscribeToTopic = (topic, symbol) => {
		stompClient?.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);
			if (!(symbol in subscriptions)) {
				setSubscriptions({...subscriptions, [symbol]: message.headers.subscription});
			}
			watchListData = {...watchListData, [symbol]: tradingData};
			console.log(tradingData);
		});
	};

	const getWatchlist = async () => {
		const userId = localStorage.getItem('userId');
		try{
			const watchlist = await getWatchList(userId);
			console.log(watchlist);
		}catch (e) {
			console.log(e);
		}
	};

	const getAvailableTradingPairs = async() => {
		try {
			const {data} = await getAvailableSymbols();
			setTradingPairs(data);
		}catch (e) {
			console.log(e);
		}
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleShow = (value) => {
		setModalType(value);
		setShow(true);
	};

	const handleSelect = (e) => {
		const checkList = [...selectedValue];
		const value = e.target.value;
		if (e.target.checked) {
			checkList.push(value);
		}else {
			const index = checkList.indexOf(value);
			checkList.splice(index, 1);
		}
		setSelectedValue(checkList);
	};

	const handleSubmit = () => {
		setShow(false);
		setSelectedValue([]);
		console.log('ddddd');
	};


	return (
		<Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
				id="watchlist"
				className="section bg-overlay overflow-hidden"
			>
				<div className='watchlist-container d-flex justify-content-center'>
					<div className='container'>
						<div className='row p-5 text-white'>
							<div className='col-6 d-flex d-flex justify-content-end'>
								<div className='font-weight-bold h6 bg-color-3 rounded p-2 cursor-1 w-50' onClick={()=> handleShow({type: 'add', name: 'Add Symbol'})}>Add Alert</div>
							</div>
							<div className='col-6'>
								<div className='font-weight-bold h6	bg-color-3 rounded p-2 cursor-1 w-50' onClick={()=> handleShow({type: 'remove', name: 'Remove Symbol'})}>Remove Alert</div>
							</div>
						</div>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Symbol</th>
									<th>Alert Price</th>
									<th>Current Price</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{watchlist.map((item) => {
									const data = watchListData[item.name];
									return (
										<tr key={item.id}>
											<td className='text-black-50'>{item.name}</td>
											<td className={data?.lastPrice < data?.openPrice ? 'text-success': 'text-danger'}>{data?.lastPrice}</td>
											<td>{data?.priceChange}</td>
											<td>{data?.priceChangePercent}</td>
										</tr>
									);
								}
								)}
							</tbody>
						</Table>
					</div>
				</div>
			</section>
			<section>
				<Modal show={show} onHide={handleClose}>

					<Modal.Body>
						<form className="w-100">
							{funcMap[modalType.type]?.length === 0 ? <div className='text-center'>No data</div> :
								funcMap[modalType.type]?.map((item) => (
									<div className="form-check" key={item._id}>
										<input
											type="checkbox"
											className="form-check-input"
											id={item._id}
											name="option1"
											onChange={handleSelect}
										/>
										<label
											className="form-check-label"
											htmlFor={item._id}
										>
											{item.name}
										</label>
									</div>
								))
							}
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
                            Close
						</Button>
						<Button
							variant="primary"
							onClick={handleSubmit}
						>
							{modalType.name}
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</Fragment>
	);
};

export default Alerts;