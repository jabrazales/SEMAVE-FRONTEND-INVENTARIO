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
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ productos.length }}</p>
              <p class="text-sm font-medium text-gray-500">Total Productos</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ totalStock }}</p>
              <p class="text-sm font-medium text-gray-500">Stock Total</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ productosStockBajo }}</p>
              <p class="text-sm font-medium text-gray-500">Stock Bajo</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de productos -->
      <div v-if="productos.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Inventario de Productos
          </h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Disponible
                </th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="producto in productos" 
                :key="producto.id"
                :class="producto.stock < 10 ? 'bg-red-50' : 'hover:bg-gray-50'"
                class="transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ producto.nombre }}</div>
                      <div class="text-sm text-gray-500">ID: #{{ producto.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="text-lg font-bold" :class="producto.stock < 10 ? 'text-red-600' : 'text-green-600'">
                    {{ producto.stock }}
                  </div>
                  <div class="text-xs text-gray-500">unidades</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span v-if="producto.stock < 10" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    Stock Bajo
                  </span>
                  <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Disponible
                  </span>
                </td>
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
                  <h4 class="text-lg font-semibold text-gray-900">{{ item.nombre }}</h4>
                  <p class="text-sm text-gray-500">ID: #{{ item.id }}</p>
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
      productosOrdenados: []
    }
  },
  computed: {
    totalStock() {
      return this.productos.reduce((sum, p) => sum + p.stock, 0);
    },
    productosStockBajo() {
      return this.productos.filter(p => p.stock < 10).length;
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const [resProd, resMov] = await Promise.all([
          getProductos(),
          getMovimientos()
        ]);
        this.productos = resProd.data;
        this.movimientos = resMov.data;
        this.calcularMasVendidos();
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
    
    calcularMasVendidos() {
      // Filtrar movimientos de salida por el rango de fechas
      let movimientosFiltrados = this.movimientos.filter(m => m.tipo === 'salida');
      
      if (this.fechaInicio || this.fechaFin) {
        movimientosFiltrados = movimientosFiltrados.filter(m => {
          const fechaMovimiento = new Date(m.createdAt);
          const inicio = this.fechaInicio ? new Date(this.fechaInicio) : new Date('1900-01-01');
          const fin = this.fechaFin ? new Date(this.fechaFin + 'T23:59:59') : new Date();
          
          return fechaMovimiento >= inicio && fechaMovimiento <= fin;
        });
      }
      
      // Contar ventas por producto
      const ventasPorProducto = {};
      movimientosFiltrados.forEach(m => {
        const productoId = m.productoId || (m.Producto && m.Producto.id);
        if (!productoId) return;
        
        ventasPorProducto[productoId] = (ventasPorProducto[productoId] || 0) + m.cantidad;
      });
      
      // Crear array con productos y sus ventas
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
      
      this.calcularMasVendidos();
      
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
      this.calcularMasVendidos();
      
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
    }
  },
  
  mounted() {
    this.cargarDatos();
    // Opcional: establecer fechas por defecto
    // this.establecerFechasPorDefecto();
  }
}
</script>