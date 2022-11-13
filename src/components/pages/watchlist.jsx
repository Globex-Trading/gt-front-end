import React, {Fragment, useContext, useEffect, useState} from 'react';
import {getWatchList, saveItemToWatchList} from '../../services/profileService';
import Table from 'react-bootstrap/Table';
import PreLoader from '../common/loader';
import {StoreContext} from '../common/stateProvider';
import {getAvailableSymbols} from '../../services/chartService';
import {Button, Modal} from 'react-bootstrap';
import toast from 'react-hot-toast';

let watchListData = {};
let subs = [];

const Watchlist = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setIsUpdate] = useState(false);
	const [watchlist, setWatchlist] = useState([
	]);
	const [subscriptions, setSubscriptions] = useState({});
	const [tradingPairs, setTradingPairs] = useState([]);
	const [show, setShow] = useState(false);
	const [modalType, setModalType] = useState({});
	const [selectedValue, setSelectedValue] = useState([]);

	const {stompClient} = useContext(StoreContext);


	useEffect(() => {
		setIsLoading(true);
		getWatchlist();
		getAvailableTradingPairs();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => {
			console.log('unmounting---------------------------------------------------------------', subs);
			subs.forEach( (sub) => {
				sub.unsubscribe();
			});
		};

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
		const sub = stompClient?.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);
			if (!(symbol in subscriptions)) {
				setSubscriptions({...subscriptions, [symbol]: message.headers.subscription});
			}
			watchListData = {...watchListData, [symbol]: tradingData};
			console.log(tradingData);
		});

		subs.push(sub);
	};

	const getWatchlist = async () => {
		const userId = localStorage.getItem('user_id');
		try{
			const watchlist = await getWatchList(userId);
			if(watchlist?.data){
				setWatchlist(watchlist?.data);
			}else {
				setWatchlist([]);
			}
		}catch (e) {
			console.log(e);
		}
	};

	const getAvailableTradingPairs = async() => {
		try {
			const {data} = await getAvailableSymbols();

			setTradingPairs(data?.data);
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
		console.log('++++++++++++++', checkList, value);
		setSelectedValue(checkList);
	};

	const handleSubmit = async() => {
		if(selectedValue.length > 0) {
			setIsLoading(true);
			setShow(false);
			selectedValue?.map(async (item) => {
				try {
					const response = await saveItemToWatchList({
						symbolId: item,
						userId: localStorage.getItem('user_id')
					});
				}catch (e) {
					console.log(e);
					toast.error(`Error adding ${item} to watchlist`);
				}
			});
			await getWatchlist();
			setIsLoading(false);
			setSelectedValue([]);
		}
	};

	const handleDelete = async (item) => {
		setIsLoading(true);
		try {
			const response = await saveItemToWatchList({
				symbolId: item.symbolId,
				userId: localStorage.getItem('user_id'),
				isDeleted: true
			});
			await getWatchlist();
			setIsLoading(false);
		}catch (e) {
			console.log(e);
			toast.error(`Error deleting ${item.symbol} from watchlist`);
		}
	};

	const myStyle1={
		backgroundSize: 'cover',
		height: '100vh',
		opacity: '0.9'
	};

	const myStyle2={
		backgroundColor:'rgba(255, 255, 255, 0.65)',
		// backgroundSize: 'cover',
		// height: '100vh',
		// opacity: '0.7'
	};


	return (
		<Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
				id="watchlist"
				className="section overflow-hidden"
				style={{backgroundImage: 'url("assets/img/back3.webp")'}}
			>
				<div className='watchlist-container d-flex justify-content-center' style={myStyle1}>
					<div className='container font-weight-bolder'>
						<div className='row justify-content-end m-3'>
							<button className='btn' onClick={handleShow}>
								Add symbols
							</button>
						</div>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Symbol</th>
									<th>Last value</th>
									<th>Change</th>
									<th>Change %</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{watchlist.map((item) => {
									const data = watchListData[item.symbol];
									return (
										<tr key={item.id}>
											<td className='text-black-50'>{item.symbol}</td>
											<td>{data?.lastPrice}</td>
											<td className={data?.priceChange < 0 ? 'text-danger': 'text-success'}>{data?.priceChange}</td>
											<td className={data?.priceChange < 0 ? 'text-danger': 'text-success'}>{data?.priceChangePercent}</td>
											<td className={'text-center'}> <i className={'fa fa-trash'}/> </td>
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
							{tradingPairs.length === 0 ? <div className='text-center'>No data</div> :
								tradingPairs?.map((item) => (
									<div className="form-check" key={item._id}>
										<input
											type="checkbox"
											className="form-check-input"
											id={item._id}
											name="option1"
											value={item._id}
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
							Add
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</Fragment>
	);
};

export default Watchlist;