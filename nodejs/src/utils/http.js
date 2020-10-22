import axios from 'axios';
// import Cookies from 'js-cookie';
// import {accessTokenKey, userNameKey} from './constant.js';

axios.interceptors.request.use(config => {
	config.headers.Username = 'wwwwww'; // TODO
	return config;
}, error => {
	return Promise.reject(error);
});

export default axios;
