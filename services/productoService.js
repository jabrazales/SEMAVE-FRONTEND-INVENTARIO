import axios from 'axios';

// Configuración de la API
const API_URL = 'https://semave-backend-inventario-production.up.railway.app/api/productos';

// Configurar interceptores para manejo de errores globales
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    // Aquí podrías agregar notificaciones de error
    return Promise.reject(error);
  }
);

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Servicios de productos
export const productoService = {
  // Obtener todos los productos
  getProductos: async () => {
    try {
      const response = await apiClient.get('/');
      return response;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  // Obtener un producto por ID
  getProducto: async (id) => {
    try {
      if (!id) throw new Error('ID es requerido');
      const response = await apiClient.get(`/${id}`);
      return response;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  },

  // Crear nuevo producto
  createProducto: async (data) => {
    try {
      if (!data.codigo || !data.tipo || !Array.isArray(data.aplicaciones) || data.aplicaciones.length === 0) {
        throw new Error('Faltan datos obligatorios para crear el producto');
      }
      const payload = {
        codigo: data.codigo,
        tipo: data.tipo,
        aplicaciones: data.aplicaciones.map(app => ({
          nombre: app.nombre,
          stock_percha: Number(app.stock_percha),
          stock_caja: Number(app.stock_caja),
          linea: app.linea,
          codigo_aplicacion: app.codigo_aplicacion
        }))
      };
      const response = await apiClient.post('/', payload);
      return response;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  },

  // Actualizar producto
  updateProducto: async (id, data) => {
    try {
      if (!id) throw new Error('ID es requerido');
      if (!data.codigo || !data.tipo || !Array.isArray(data.aplicaciones) || data.aplicaciones.length === 0) {
        throw new Error('Faltan datos obligatorios para actualizar el producto');
      }
      const payload = {
        codigo: data.codigo,
        tipo: data.tipo,
        aplicaciones: data.aplicaciones.map(app => ({
          nombre: app.nombre,
          stock_percha: Number(app.stock_percha),
          stock_caja: Number(app.stock_caja),
          linea: app.linea,
          codigo_aplicacion: app.codigo_aplicacion
        }))
      };
      const response = await apiClient.put(`/${id}`, payload);
      return response;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  },

  // Eliminar producto
  deleteProducto: async (id) => {
    try {
      if (!id) throw new Error('ID es requerido');
      const response = await apiClient.delete(`/${id}`);
      return response;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  },

  // Buscar productos por nombre
  buscarProductos: async (termino) => {
    try {
      const response = await apiClient.get(`/buscar?q=${encodeURIComponent(termino)}`);
      return response;
    } catch (error) {
      throw new Error(`Error al buscar productos: ${error.message}`);
    }
  },

  // Obtener productos con stock bajo
  getProductosStockBajo: async (limite = 10) => {
    try {
      const response = await apiClient.get(`/stock-bajo?limite=${limite}`);
      return response;
    } catch (error) {
      throw new Error(`Error al obtener productos con stock bajo: ${error.message}`);
    }
  }
};

// Exportar funciones individuales para compatibilidad
export const getProductos = productoService.getProductos;
export const getProducto = productoService.getProducto;
export const createProducto = productoService.createProducto;
export const updateProducto = productoService.updateProducto;
export const deleteProducto = productoService.deleteProducto;