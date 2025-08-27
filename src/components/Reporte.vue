<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <svg class="w-12 h-12 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-800">Reporte de Stock</h1>
        </div>
        <p class="text-gray-600 text-lg">Visualiza el inventario y productos más vendidos</p>
      </div>

      <!-- Estadísticas generales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
          <svg class="w-10 h-10 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <p class="text-3xl font-bold text-gray-900">{{ productos.length }}</p>
          <p class="text-base font-medium text-gray-500">Total de Productos</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
          <svg class="w-10 h-10 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <p class="text-3xl font-bold text-gray-900">{{ totalStock }}</p>
          <p class="text-base font-medium text-gray-500">Stock Total (todas las aplicaciones)</p>
        </div>
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center justify-center">
          <svg class="w-10 h-10 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <p class="text-3xl font-bold text-gray-900">{{ aplicacionesStockBajo.length }}</p>
          <p class="text-base font-medium text-gray-500">Aplicaciones con Stock Bajo (&lt; 10)</p>
        </div>
      </div>

      <!-- Tabla de stock total por producto -->
      <div v-if="productos.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Stock Total por Producto
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Total</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="producto in productos" :key="producto.id">
                <td class="px-6 py-4 whitespace-nowrap font-mono text-orange-700">{{ producto.codigo }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ producto.nombre || producto.tipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ producto.tipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right font-bold">{{ producto.stockTotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tabla de aplicaciones con stock bajo -->
      <div v-if="aplicacionesStockBajo.length > 0" class="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-red-200 bg-red-50">
          <h3 class="text-lg font-semibold text-red-700 flex items-center">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            Aplicaciones con Stock Bajo (&lt; 10)
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-red-200">
            <thead class="bg-red-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Código Producto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Aplicación</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider">Stock Percha</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider">Stock Caja</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider">Stock Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Código Aplicación</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-red-100">
              <tr v-for="app in aplicacionesStockBajo" :key="app.codigo_aplicacion + '-' + app.productoCodigo">
                <td class="px-6 py-4 whitespace-nowrap font-mono text-orange-700">{{ app.productoCodigo }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ app.productoTipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ app.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right">{{ app.stock_percha }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right">{{ app.stock_caja }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right font-bold text-red-700">{{ app.stockTotal }}</td>
                <td class="px-6 py-4 whitespace-nowrap font-mono">{{ app.codigo_aplicacion }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tabla de productos ordenados por menor stock -->
      <div v-if="productosMenorStock.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Productos con Menor Stock Total
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Total</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="producto in productosMenorStock" :key="producto.id">
                <td class="px-6 py-4 whitespace-nowrap font-mono text-orange-700">{{ producto.codigo }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ producto.nombre || producto.tipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ producto.tipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right font-bold">{{ producto.stockTotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Productos más vendidos con filtros de fecha -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center mb-4 sm:mb-0">
              <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Productos Más Vendidos
            </h3>
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex items-center">
                <label class="text-sm font-medium text-gray-700 mr-2">Desde:</label>
                <input 
                  v-model="fechaInicio" 
                  type="date" 
                  class="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
              <div class="flex items-center">
                <label class="text-sm font-medium text-gray-700 mr-2">Hasta:</label>
                <input 
                  v-model="fechaFin" 
                  type="date" 
                  class="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
              <button 
                @click="aplicarFiltros"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Filtrar
              </button>
              <button 
                @click="limpiarFiltros"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <!-- Período seleccionado -->
        <div v-if="fechaInicio || fechaFin" class="px-6 py-3 bg-orange-50 border-b border-gray-200">
          <div class="flex items-center text-sm text-orange-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <strong>Período:</strong>
            <span class="ml-1">
              {{ fechaInicio ? new Date(fechaInicio).toLocaleDateString() : 'Inicio' }} - 
              {{ fechaFin ? new Date(fechaFin).toLocaleDateString() : 'Fin' }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <!-- Top 10 productos más vendidos -->
          <div v-if="productosOrdenados.length > 0" class="space-y-4">
            <div 
              v-for="(item, index) in productosOrdenados.slice(0, 10)" 
              :key="item.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            >
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-lg" 
                       :class="index === 0 ? 'bg-yellow-100 text-yellow-600' : index === 1 ? 'bg-gray-100 text-gray-600' : index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'">
                    <span class="text-lg font-bold">#{{ index + 1 }}</span>
                  </div>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">{{ item.nombre || item.tipo }}</h4>
                  <p class="text-sm text-gray-500">Código: {{ item.codigo }}</p>
                  <span v-if="item.aplicaciones && item.aplicaciones.length > 0" class="text-xs text-gray-600">
                    Aplicación más vendida: {{ obtenerAplicacionMasVendida(item) }}
                  </span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xl font-bold text-orange-600">{{ item.totalVendido }}</p>
                <p class="text-xs text-gray-500">unidades vendidas</p>
              </div>
            </div>
          </div>

          <!-- Mensaje cuando no hay ventas -->
          <div v-else class="text-center py-12">
            <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay ventas en el período seleccionado</h3>
            <p class="text-gray-500 mb-4">Ajusta las fechas o verifica que existan movimientos de salida registrados</p>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay productos -->
      <div v-if="productos.length === 0" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay productos registrados</h3>
        <p class="text-gray-500 mb-4">Agregue productos para generar reportes de inventario</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductos } from '../../services/productoService.js';
import { getMovimientos } from '../../services/movimientoService.js';
import Swal from 'sweetalert2';

export default {
  name: 'ReporteStockComponent',
  data() {
    return {
      productos: [],
      movimientos: [],
      fechaInicio: '',
      fechaFin: '',
      productosOrdenados: [],
      aplicacionesStockBajo: [],
      productosStockBajo: [],
      productosMenorStock: [],
      totalStockGeneral: 0
    }
  },
  computed: {
    // Stock total de todas las aplicaciones de todos los productos
    totalStock() {
      // Sumar el stockTotal ya calculado en cada producto para mantener consistencia con la tabla
      return this.productos.reduce((sum, p) => sum + (p.stockTotal || 0), 0);
    },
    // Productos ordenados por menor stock total (de todas sus aplicaciones)
    productosOrdenadosPorStock() {
      return this.productos
        .map(p => ({
          ...p,
          stockTotal: Array.isArray(p.aplicaciones) ? p.aplicaciones.reduce((a, app) => a + (Number(app.stock_percha || 0) + Number(app.stock_caja || 0)), 0) : 0
        }))
        .sort((a, b) => a.stockTotal - b.stockTotal);
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const [resProd, resMov] = await Promise.all([
          getProductos(),
          getMovimientos()
        ]);
        // Mapear productos para asegurar estructura de aplicaciones y stock correcto (igual que en Productos.vue)
        this.productos = resProd.data.map(p => ({
          ...p,
          aplicaciones: Array.isArray(p.aplicaciones)
            ? p.aplicaciones.map(app => ({
                nombre: app.nombre,
                stock_percha: app.stock_percha ?? (app.ProductoAplicacion ? app.ProductoAplicacion.stock_percha : 0),
                stock_caja: app.stock_caja ?? (app.ProductoAplicacion ? app.ProductoAplicacion.stock_caja : 0),
                linea: app.linea ?? (app.ProductoAplicacion ? app.ProductoAplicacion.linea : ''),
                codigo_aplicacion: app.codigo_aplicacion ?? (app.ProductoAplicacion ? app.ProductoAplicacion.codigo_aplicacion : ''),
                stockTotal: Number((app.stock_percha ?? (app.ProductoAplicacion ? app.ProductoAplicacion.stock_percha : 0)) || 0) +
                           Number((app.stock_caja ?? (app.ProductoAplicacion ? app.ProductoAplicacion.stock_caja : 0)) || 0)
              }))
            : []
        }));
        this.movimientos = resMov.data;
        this.calcularReportes();
      } catch (error) {
        console.error('Error al cargar datos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los datos del reporte',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },
    calcularReportes() {
      // 1. Stock bajo por aplicación (menor a 10)
      this.aplicacionesStockBajo = [];
      this.productosStockBajo = [];
      this.totalStockGeneral = 0;
      this.productos.forEach(producto => {
        let stockTotalProducto = 0;
        let tieneStockBajo = false;
        (producto.aplicaciones || []).forEach(app => {
          app.stockTotal = Number(app.stock_percha || 0) + Number(app.stock_caja || 0);
          stockTotalProducto += app.stockTotal;
          if (app.stockTotal < 10) {
            this.aplicacionesStockBajo.push({
              ...app,
              productoCodigo: producto.codigo,
              productoTipo: producto.tipo
            });
            tieneStockBajo = true;
          }
        });
        producto.stockTotal = stockTotalProducto;
        this.totalStockGeneral += stockTotalProducto;
        if (tieneStockBajo) {
          this.productosStockBajo.push(producto);
        }
      });
      // 2. Productos ordenados por menor stock total
      this.productosMenorStock = [...this.productos].sort((a, b) => a.stockTotal - b.stockTotal);
      // 3. Productos más vendidos (con filtro de fechas)
      let movimientosFiltrados = this.movimientos.filter(m => m.tipo === 'salida');
      if (this.fechaInicio || this.fechaFin) {
        movimientosFiltrados = movimientosFiltrados.filter(m => {
          const fechaMovimiento = new Date(m.createdAt);
          const inicio = this.fechaInicio ? new Date(this.fechaInicio) : new Date('1900-01-01');
          const fin = this.fechaFin ? new Date(this.fechaFin + 'T23:59:59') : new Date();
          return fechaMovimiento >= inicio && fechaMovimiento <= fin;
        });
      }
      const ventasPorProducto = {};
      movimientosFiltrados.forEach(m => {
        const productoId = m.productoId || (m.Producto && m.Producto.id);
        if (!productoId) return;
        ventasPorProducto[productoId] = (ventasPorProducto[productoId] || 0) + m.cantidad;
      });
      this.productosOrdenados = this.productos
        .map(producto => ({
          ...producto,
          totalVendido: ventasPorProducto[producto.id] || 0
        }))
        .filter(producto => producto.totalVendido > 0)
        .sort((a, b) => b.totalVendido - a.totalVendido);
    },
    aplicarFiltros() {
      if (this.fechaInicio && this.fechaFin && this.fechaInicio > this.fechaFin) {
        Swal.fire({
          title: 'Fechas inválidas',
          text: 'La fecha de inicio debe ser anterior a la fecha fin',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      this.calcularReportes();
      Swal.fire({
        title: 'Filtros aplicados',
        text: 'El reporte ha sido actualizado con el período seleccionado',
        icon: 'success',
        confirmButtonColor: '#ea580c',
        timer: 1500,
        showConfirmButton: false
      });
    },
    limpiarFiltros() {
      this.fechaInicio = '';
      this.fechaFin = '';
      this.calcularReportes();
      Swal.fire({
        title: 'Filtros limpiados',
        text: 'Mostrando todos los datos históricos',
        icon: 'info',
        confirmButtonColor: '#ea580c',
        timer: 1500,
        showConfirmButton: false
      });
    },
    // Establecer fechas por defecto (último mes)
    establecerFechasPorDefecto() {
      const hoy = new Date();
      const haceUnMes = new Date();
      haceUnMes.setMonth(hoy.getMonth() - 1);
      this.fechaFin = hoy.toISOString().split('T')[0];
      this.fechaInicio = haceUnMes.toISOString().split('T')[0];
    },
    obtenerAplicacionMasVendida(producto) {
      if (!producto.aplicaciones || producto.aplicaciones.length === 0) return '';
      // Busca la aplicación con mayor stockTotal (como proxy de la más vendida)
      let appMasVendida = producto.aplicaciones[0];
      for (const app of producto.aplicaciones) {
        if ((app.stockTotal || 0) > (appMasVendida.stockTotal || 0)) {
          appMasVendida = app;
        }
      }
      return appMasVendida.nombre + (appMasVendida.codigo_aplicacion ? ' (' + appMasVendida.codigo_aplicacion + ')' : '');
    }
  },
  
  mounted() {
    this.cargarDatos();
  }
}
</script>