import axios from 'axios';

const API_URL = 'https://semave-backend-inventario-production.up.railway.app/api/movimientos'; // cambia si usas localhost

export const getMovimientos = () => axios.get(API_URL);

export const createMovimiento = (data) => axios.post(API_URL, data);

export const getMovimiento = (id) => axios.get(`${API_URL}/${id}`);
