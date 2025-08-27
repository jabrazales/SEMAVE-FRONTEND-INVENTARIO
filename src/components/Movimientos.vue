<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <svg class="w-12 h-12 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-800">Registro de Movimientos</h1>
        </div>
        <p class="text-gray-600 text-lg">Controla entradas y salidas de tu inventario</p>
      </div>

      <!-- Formulario de movimiento -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <svg class="w-6 h-6 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Registrar Nuevo Movimiento
          </h2>
        </div>
        <form @submit.prevent="registrarMovimiento" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Producto</label>
              <select 
                v-model="nuevo.productoId" 
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              >
                <option disabled value="">Seleccionar producto</option>
                <option v-for="p in productos" :key="p.id" :value="p.id">{{ p.codigo }} - {{ p.tipo }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Aplicación</label>
              <select 
                v-model="nuevo.aplicacionId" 
                :disabled="!nuevo.productoId"
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              >
                <option disabled value="">Seleccionar aplicación</option>
                <option v-for="app in aplicacionesProductoSeleccionado" :key="app.id" :value="app.id">{{ app.nombre }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Movimiento</label>
              <select 
                v-model="nuevo.tipo" 
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              >
                <option disabled value="">Seleccionar tipo</option>
                <option value="entrada">📥 Entrada</option>
                <option value="salida">📤 Salida</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
              <div class="relative">
                <input 
                  v-model.number="nuevo.cantidad" 
                  type="number" 
                  placeholder="0" 
                  min="1"
                  class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  required
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-sm">unidades</span>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Origen/Destino</label>
              <select 
                v-model="nuevo.origen_destino" 
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              >
                <option disabled value="">Seleccionar</option>
                <option value="percha">Percha</option>
                <option value="caja">Caja</option>
              </select>
            </div>
            <div class="flex items-end">
              <button 
                type="submit" 
                class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ movimientosFiltrados.length }}</p>
              <p class="text-sm font-medium text-gray-500">Total Movimientos</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ totalEntradas }}</p>
              <p class="text-sm font-medium text-gray-500">Total Entradas</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-red-100">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ totalSalidas }}</p>
              <p class="text-sm font-medium text-gray-500">Total Salidas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de movimientos -->
      <div v-if="movimientosFiltrados.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Historial de Movimientos
          </h3>
        </div>
        <div class="divide-y divide-gray-200">
          <div 
            v-for="m in movimientosFiltrados" 
            :key="m.id"
            class="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-lg" 
                       :class="m.tipo === 'entrada' ? 'bg-green-100' : 'bg-red-100'">
                    <span class="text-lg">
                      {{ m.tipo === 'entrada' ? '📥' : '📤' }}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">
                    <span v-if="m.Producto">
                      {{ m.Producto.codigo ? m.Producto.codigo : '' }}
                      <span v-if="m.Producto.tipo"> - {{ m.Producto.tipo }}</span>
                    </span>
                    <span v-if="m.Aplicacion && m.Aplicacion.nombre"> - {{ m.Aplicacion.nombre }}</span>
                  </h4>
                  <p class="text-sm text-gray-500">
                    {{ m.tipo === 'entrada' ? 'Entrada' : 'Salida' }} de inventario
                    <span v-if="m.origen_destino"> ({{ m.origen_destino === 'percha' ? 'Percha' : m.origen_destino === 'caja' ? 'Caja' : m.origen_destino }})</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-right">
                  <p class="text-xl font-bold" :class="m.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'">
                    {{ m.tipo === 'entrada' ? '+' : '-' }}{{ m.cantidad }}
                  </p>
                  <p class="text-xs text-gray-500">unidades</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">
                    {{ new Date(m.createdAt).toLocaleDateString() }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ new Date(m.createdAt).toLocaleTimeString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay movimientos -->
      <div v-else class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay movimientos registrados</h3>
        <p class="text-gray-500 mb-4">Comience registrando entradas y salidas de productos</p>
        <button 
          @click="scrollToForm"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Registrar primer movimiento
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovimientos, createMovimiento } from '../../services/movimientoService.js';
import { getProductos } from '../../services/productoService.js';
import Swal from 'sweetalert2';

export default {
  name: 'MovimientosComponent',
  data() {
    return {
      movimientos: [],
      productos: [],
  nuevo: { productoId: '', aplicacionId: '', tipo: '', cantidad: 0, origen_destino: '' },
      movimientosFiltrados: []
    }
  },
  computed: {
    aplicacionesProductoSeleccionado() {
      const prod = this.productos.find(p => p.id === this.nuevo.productoId);
      return prod && prod.aplicaciones ? prod.aplicaciones : [];
    },
    totalEntradas() {
      return this.movimientosFiltrados.filter(m => m.tipo === 'entrada').reduce((sum, m) => sum + m.cantidad, 0);
    },
    totalSalidas() {
      return this.movimientosFiltrados.filter(m => m.tipo === 'salida').reduce((sum, m) => sum + m.cantidad, 0);
    }
  },
  methods: {
    aplicacionesProductoSeleccionado() {
      const prod = this.productos.find(p => p.id === this.nuevo.productoId);
      return prod && prod.aplicaciones ? prod.aplicaciones : [];
    },
    async cargarMovimientos() {
      try {
        const res = await getMovimientos();
        this.movimientos = res.data;
        this.movimientosFiltrados = this.movimientos;
      } catch (error) {
        console.error('Error al cargar movimientos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los movimientos',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },
    
  async cargarProductos() {
      try {
        const res = await getProductos();
        // Mapear aplicaciones para compatibilidad con la UI y mostrar stock correctamente
        this.productos = res.data.map(p => ({
          ...p,
          aplicaciones: Array.isArray(p.aplicaciones)
            ? p.aplicaciones.map(app => ({
                id: app.id,
                nombre: app.nombre,
                stock: app.ProductoAplicacion && typeof app.ProductoAplicacion.stock !== 'undefined' ? app.ProductoAplicacion.stock : (app.stock ?? 0)
              }))
            : []
        }));
      } catch (error) {
        console.error('Error al cargar productos:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los productos',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },
    
  async registrarMovimiento() {
  if (!this.nuevo.productoId || !this.nuevo.aplicacionId || !this.nuevo.tipo || this.nuevo.cantidad <= 0 || !this.nuevo.origen_destino) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor, complete todos los campos correctamente',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      try {
        await createMovimiento({
          productoId: this.nuevo.productoId,
          aplicacionId: this.nuevo.aplicacionId,
          tipo: this.nuevo.tipo,
          cantidad: this.nuevo.cantidad,
          origen_destino: this.nuevo.origen_destino
        });
        this.nuevo = { productoId: '', aplicacionId: '', tipo: '', cantidad: 0, origen_destino: '' };
        await this.cargarMovimientos();
        Swal.fire({
          title: 'Éxito',
          text: 'Movimiento registrado correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error al registrar movimiento:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar el movimiento',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },

  // ...existing code...
  watch: {
    'nuevo.productoId'(nuevoVal, oldVal) {
      // Limpiar la aplicación seleccionada si se cambia el producto
      if (nuevoVal !== oldVal) {
        this.nuevo.aplicacionId = '';
      }
    }
  },

    scrollToForm() {
      // Función para scroll hasta el formulario cuando no hay movimientos
      const form = document.querySelector('form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  
  mounted() {
    this.cargarProductos();
    this.cargarMovimientos();
  }
}
</script>