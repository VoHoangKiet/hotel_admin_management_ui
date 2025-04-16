import axios, {  type AxiosInstance } from 'axios';
import { baseURL } from './constant';

export class Api {
    instance: AxiosInstance;
    constructor() {
        const token = localStorage.getItem('token');
        this.instance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
const api = new Api().instance;
export default api;
