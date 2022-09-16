import React, {Fragment, useEffect, useState} from 'react';
import Chart from '../common/chart';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';

let stompClient = null;

const TradingChart = () => {
	const [chartType, setChartType] = useState('line');
	const [interval, setInterval] = useState('1d');
	const [symbol, setSymbol] = useState('BTC');
	const [data, setData] = useState([]);
	const [tradeType, setTradeType] = useState('crypto');


	useEffect(() => {
		console.log('useEffect 2 ', stompClient);

		if(!stompClient) {
			connectToServer();
		}

	}, [chartType, interval, symbol, tradeType, stompClient]);


	const connectToServer = () => {
		let sock = new SockJS('http://ec2-52-23-157-217.compute-1.amazonaws.com:8080/ws');
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
			if(!tradingData.klineClosed) {

				console.log('------------', message);

				const chartData = {
					time: tradingData.openTime,
					open: tradingData.openPrice,
					high: tradingData.highPrice,
					low: tradingData.lowPrice,
					close: tradingData.closePrice
				};

				console.log('data',data);
				const newData = data;
				newData.push(chartData);
				console.log('newData',newData);
				setData(newData);
				// console.log('data', [...data, chartData]);
			}
		});
	};

	return (
		<Fragment>
			<Chart data={data} chartType={'candleStick'}/>
			<button className='mt-5 p-5' onClick={() => {
				console.log(data);
				setData([...data, 'test']);
			}}
			>
				Connect to server
			</button>
			<span>{stompClient?.toString()}</span>
		</Fragment>
	);
};

export default TradingChart;