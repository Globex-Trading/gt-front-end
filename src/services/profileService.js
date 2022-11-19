import config from '../config.json';
import axios from 'axios';
import axiosAPIInstance from "./httpService";

const apiURL = config.apiURL;

const access_token = localStorage.getItem('user_token');

export async function getWatchList(userId) {
	console.log('getWatchList', { userId: userId });
	try {
		return await axiosAPIInstance.post(
			apiURL + '/watchlist/getitemlist',
			{userId: userId},
			{headers: {'Authorization': `Bearer ${access_token}`}}
		);
	}catch (e) {
		console.log(e);
		return null;
	}
}

export async function saveItemToWatchList(item) {
	try {
		return await axiosAPIInstance.post(
			apiURL + '/watchlist/saveitem',
			item,
			{headers: {'Authorization': `Bearer ${access_token}`}}
		);
	}catch (e) {
		console.log(e);
		return null;
	}
}

export async function deleteItemFromWatchList(symbolId, userId) {
	console.log('-------------', symbolId,userId);
	try {
		return await axiosAPIInstance.post(
			apiURL + '/watchlist/removeitem',
			{symbolId: symbolId, userId: userId},
			{headers: {'Authorization': `Bearer ${access_token}`}}
		);
	}catch (e) {
		console.log(e);
		return null;
	}
}

export async function getNotifications(userId) {
	try {
		return await axiosAPIInstance.post(
			apiURL + '/notification/getnotification',
			{userid: userId},
			{headers: {'Authorization': `Bearer ${access_token}`}}
		);
	}catch (e) {
		console.log(e);
		return null;
	}
}
