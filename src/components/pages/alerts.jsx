import React, {Fragment, useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import PreLoader from '../common/loader';
import {StoreContext} from '../common/stateProvider';
import {getExistingAlertsByUserID} from '../../services/chartService';
import toast from 'react-hot-toast';

let alertData = {};
let subs = [];

const Alerts = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [isUpdate, setIsUpdate] = useState(false);
	const [subscriptions, setSubscriptions] = useState({});
	const [alerts, setAlerts] = useState([]);
	const [isDeleteshow, setIsDeleteshow] = useState(false);

	const {stompClient} = useContext(StoreContext);

	const userId = localStorage.getItem('user_id');


	useEffect(() => {
		setIsLoading(true);
		getExistingAlerts();
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

	// setInterval(() => setIsUpdate(!isUpdate), 1000);


	useEffect(() => {
		if (stompClient) {
			alerts.forEach((item) => {
				if (!(item in subscriptions)) {
					const topic = '/topic/' + item.provider + '_' + item.symbol;
					subscribeToTopic(topic, item.symbol);
				}
			});
		}


	}, [stompClient, alerts]);

	const subscribeToTopic = (topic, symbol) => {
		const sub = stompClient?.subscribe(topic, (message) => {
			const tradingData = JSON.parse(message.body);
			if (!(symbol in subscriptions)) {
				setSubscriptions({...subscriptions, [symbol]: message.headers.subscription});
			}
			alertData = {...alertData, [symbol]: tradingData};
			// console.log(alertData, '----------------------');
		});

		subs.push(sub);
	};


	const getExistingAlerts = async() => {
		try {
			const {data} = await getExistingAlertsByUserID(userId);
			if(data.status === 'SUCCESS'){
				setAlerts(data.data);
			}else {
				toast.error(data.data);
			}
		}catch (e) {
			console.log(e);
			toast.error('Error occurred!');
		}
	};


	return (
		<Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
				id="alerts"
				className="section bg-overlay overflow-hidden"
				data-testid={'alerts'}
			>
				<div className='watchlist-container d-flex justify-content-center'>
					<div className='container'>
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
								{alerts.map((item) => {
									const data = alertData[item.symbol];
									// console.log(item);
									return (
										<tr key={item.id} onMouseEnter={()=>setIsDeleteshow(true)} onMouseLeave={()=>setIsDeleteshow(false)}>
											<td className='text-black-50'>{item.symbol}</td>
											<td>{item.trigger_price}</td>
											<td className={data?.priceChange>0 ? 'text-success': 'text-danger'}>{data?.lastPrice}</td>
											<td >
												<span className={item.is_triggered? 'bg-danger':'bg-success' + ' p-2 text-white rounded-lg'}>{item.is_triggered?'Triggered': 'Available'}</span>
											</td>
											
										</tr>
										
									);
								}
								)}
							</tbody>
						</Table>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default Alerts;