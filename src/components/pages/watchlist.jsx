import React, {Fragment, useContext, useEffect, useState} from 'react';
import {deleteItemFromWatchList, getWatchList, saveItemToWatchList} from '../../services/profileService';
import Table from 'react-bootstrap/Table';
import PreLoader from '../common/loader';
import {StoreContext} from '../common/stateProvider';
import {getAvailableSymbols} from '../../services/chartService';
import {Button, Modal} from 'react-bootstrap';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';

let watchListData = {};
let subs = [];

const Watchlist = () => {
	const {user} = useContext(StoreContext);

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setIsUpdate] = useState(false);
	const [watchlist, setWatchlist] = useState([
	]);
	const [subscriptions, setSubscriptions] = useState({});
	const [tradingPairs, setTradingPairs] = useState([]);
	const [show, setShow] = useState(false);
	const [modalType, setModalType] = useState({});
	const [selectedValue, setSelectedValue] = useState([]);
	const [isPending, setIsPending] = useState(false);

	const [isDeleteShow, setIsDeleteShow] = useState(false);
	const [selectedToDelete, setSelectedToDelete] = useState({});
	const [columns, setColumns] = useState([
		{
			name: 'Symbol',
			selector: row=>row.symbol,
			sortable: true,
		},
		{
			name: 'Last value',
			selector: row=>row.lastValue,
			sortable: true,
		},
		{
			name: 'Change',
			selector: row=>row.priceChange,
			sortable: true,
			conditionalCellStyles: [
				{
					when: row=>row.priceChange < 0,
					style: {
						color: 'red',
					}
				}]
		},
		{
			name: 'Change %',
			selector: row=>row.priceChangePercent,
			conditionalCellStyles: [
				{
					when: row=>row.priceChangePercent < 0,
					style: {
						color: 'red',
					}
				}]
		},
		{
			cell: row => <div onClick={() => handleIsDeleteShow(row)}><i className={'fa fa-trash'} style={{cursor: 'pointer'}}/></div>,
			ignoreRowClick: true,
			allowOverClick: true,
			button: true
		}
	]);

	const {stompClient} = useContext(StoreContext);

	useEffect(() => {
		setIsLoading(true);
		getWatchlist();
		getAvailableTradingPairs();
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => {
			subs.forEach( (sub) => {
				sub.unsubscribe();
			});
		};

	}, []);


	
	useEffect(() => {
		if (stompClient) {
			setIsPending(true);
			watchlist.forEach((item) => {
				if (!(item in subscriptions)) {
					const topic = '/topic/' + item.provider + '_' + item.symbol;
					// subscribeToTopic(topic, item.symbol);
				}
			});
			setIsPending(false);
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
		setIsLoading(true);
		const userId = localStorage.getItem('user_id');

		console.log('user_id------------', userId);
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
		setIsLoading(false);
	};

	const getAvailableTradingPairs = async() => {
		try {
			const {data} = await getAvailableSymbols();

			const tradingPairs = data?.data.filter(item => item.provider.slug === 'binance');

			setTradingPairs(tradingPairs);
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

			const preWatchList = [...watchlist];
			const selectedTradingPairs = tradingPairs.filter((item) => selectedValue.includes(item._id));
			setWatchlist([...preWatchList, ...selectedTradingPairs]);

			selectedValue?.map(async (item) => {
				try {
					const response = await saveItemToWatchList({
						symbolId: item,
						userId: localStorage.getItem('user_id')
					});
					console.log('------------response', response);

				}catch (e) {
					console.log(e);
					toast.error(`Error adding ${item} to watchlist`);
					setWatchlist(preWatchList);
				}
			});
			await getWatchlist();
			setIsLoading(false);
			setSelectedValue([]);
		}
	};

	const handleDelete = async () => {
		setIsLoading(true);
		setIsDeleteShow(false);
		const preWatchList = [...watchlist];
		const remainingWatchlist = watchlist.filter((item) => item.id !== selectedToDelete.id);

		console.log('0000000000000', remainingWatchlist);
		setWatchlist(remainingWatchlist);

		try {
			const userId = localStorage.getItem('user_id');
			console.log(selectedToDelete.id, userId, '---------------------------');
			const response = await deleteItemFromWatchList(selectedToDelete.id, userId);

			if(response.status === 200) {
				toast.success('Symbol removed successfully');
			}else {
				toast.error(`Error occurred when deleting ${selectedToDelete.symbol}`);
				setWatchlist(preWatchList);
			}

		}catch (e) {
			console.log(e);
			toast.error(`Error occurred when deleting ${selectedToDelete.symbol} from watchlist`);
		}
		setIsLoading(false);
	};

	const myStyle1={
		backgroundSize: 'cover',
		height: '100vh',
		opacity: '0.9'
	};

	const handleIsDeleteShow = (item = null) => {
		setSelectedToDelete(item);
		setIsDeleteShow(!isDeleteShow);
		console.log('handle Is delete show is calling');
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

						<DataTable 
							columns={columns} 
							data={
								watchlist.map((item, index) => {
									return (
										{
											id: item.id,
											symbol: item.symbol,
											lastValue: watchListData[item.symbol]?.lastPrice,
											priceChange: watchListData[item.symbol]?.priceChange,
											priceChangePercent: watchListData[item.symbol]?.priceChangePercent,
											// actions: <i className={'fa fa-trash'} style={{cursor: 'pointer'}} onClick={() => handleIsDeleteShow(item)}/>
										}
									);
								})}
							pagination
							fixedHeader
							fixedHeaderScrollHeight="300px"
							progressPending={isPending}
						/>

					</div>
				</div>
			</section>
			<section>
				<Modal show={show} onHide={handleClose}>

					<Modal.Body>
						<form className="w-100">
							{tradingPairs.length === 0 ? <div className='text-center'>No data</div> :
								tradingPairs?.map((item) => {
									let isContain = false;
									for(let i = 0; i < watchlist.length; i++) {
										if(watchlist[i].id === item._id) {
											isContain = true;
											break;
										}
									}

									return (!isContain ? (
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
									): null);
								})
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

			<section>
				<Modal show={isDeleteShow} onHide={handleIsDeleteShow}>
					<Modal.Body>
						Are you sure you want to delete this item?
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleIsDeleteShow}>
							Close
						</Button>
						<Button
							variant="primary"
							onClick={handleDelete}
						>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>

			</section>
		</Fragment>
	);
};

export default Watchlist;