import React, {Fragment, useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import PreLoader from '../common/loader';
import {StoreContext} from '../common/stateProvider';
import {getExistingAlertsByUserID, removeAlert} from '../../services/chartService';
import toast from 'react-hot-toast';
import {Button, Modal} from 'react-bootstrap';
import DataTable from 'react-data-table-component';

let alertData = {};
let subs = [];

const Alerts = () => {

	const [isLoading, setIsLoading] = useState(true);
	const [subscriptions, setSubscriptions] = useState({});
	const [alerts, setAlerts] = useState([]);
	const [isDeleteShow, setIsDeleteShow] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState({});

	const {stompClient} = useContext(StoreContext);

	const userId = localStorage.getItem('user_id');


	useEffect(() => {
		setIsLoading(true);
		getExistingAlerts();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => {
			subs.forEach( (sub) => {
				sub.unsubscribe();
			});
		};


	}, []);

	// setInterval(() => setIsUpdate(!isUpdate), 1000);

	const columns = [
		{
			name: 'Symbol',
			selector: row=>row.symbol,
			sortable: true,
		},
		{
			name: 'Alert Price',
			selector: row=>row.alertPrice,
			sortable: true,
		},
		{
			name: 'Current Price',
			selector: row=>row.currentPrice,
			sortable: true,
			conditionalCellStyles: [
				{
					when: row=>alertData[row.symbol]?.priceChange < 0,
					style: {
						color: 'red',
					}
				},
				{
					when: row=>alertData[row.symbol]?.priceChange > 0,
					style: {
						color: 'green',
					}
				}
				
			]
		},
		{
			name: 'Status',
			cell: row => <span className={row.isTriggered ? 'bg-danger p-2 text-white rounded-lg' : 'bg-success' + ' p-2 text-white rounded-lg'}>{row.isTriggered ? 'Triggered' : 'Available'}</span>,
			ignoreRowClick: true,
			allowOverClick: true,
			button: true
		},
		{
            cell: row => <div onClick={() => handleIsDeleteShow(row)}><i className={'fa fa-trash'} style={{cursor: 'pointer'}}/></div>,
            ignoreRowClick: true,
            allowOverClick: true,
            button: true
        }

	];


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

	const handleDelete = async () => {
// 	    TODO: test deleting alert
        setIsDeleteShow(false);
        const preAlerts = [...alerts];
        const remainingAlerts = alerts.filter((item) => item._id !== selectedToDelete.id);

        setAlerts(remainingAlerts);

        try {
            console.log('selectedToDelete', selectedToDelete);
            const response = await removeAlert(selectedToDelete.id);

            if(response.status === 200) {
                toast.success('Symbol removed successfully');
            }else {
                toast.error(`Error occurred when deleting ${selectedToDelete.symbol}`);
                setAlerts(preAlerts);
            }

        }catch (e) {
            console.log(e);
            toast.error(`Error occurred when deleting ${selectedToDelete.symbol} from watchlist`);
            setAlerts(preAlerts);
        }
    };

    const handleIsDeleteShow = (item = null) => {
            setSelectedToDelete(item);
            setIsDeleteShow(!isDeleteShow);
            console.log('handle Is delete show is calling');
        };



	const myStyle1={
		backgroundImage: 'url(/assets/img/white-bg.jpg)',
		backgroundSize: 'cover',
		height: '100vh',
		opacity: '0.9'
	};

	return (
		<Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
				id="alerts"
				className="section bg-overlay overflow-hidden"
				data-testid={'alerts'}
			>
				<div className='watchlist-container d-flex justify-content-center' style={myStyle1}>
					<div className='container'>
						<DataTable
							columns={columns}
							data={
								alerts.map((item) => {
									return (
										{
											id: item._id,
											symbol: item.symbol,
											alertPrice: item.trigger_price,
											currentPrice: alertData[item.symbol]?.lastPrice,
											isTriggered: item.is_triggered
										}
									);
								})
							}
							pagination
							fixedHeader
							fixedHeaderScrollHeight="300px"
							// progressPending={isPending}
						/>

					</div>
				</div>
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

export default Alerts;
