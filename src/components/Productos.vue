<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-orange-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <svg class="w-12 h-12 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.5.866L10 15.132l-4.5 1.734A1 1 0 014 16V4z"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-800">Gestión de Inventario</h1>
        </div>
        <p class="text-gray-600 text-lg">Sistema de control de stock para empresa automotriz</p>
      </div>

      <!-- Buscador -->
      <div class="mb-8">
        <div class="max-w-md mx-auto relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input 
            v-model="busqueda" 
            @input="buscarProductos"
            placeholder="Buscar productos..." 
            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
          />
        </div>
      </div>

      <!-- Formulario para agregar producto -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <svg class="w-6 h-6 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Agregar Nuevo Producto
          </h2>
        </div>
        <form @submit.prevent="agregarProducto" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
              <input 
                v-model="nuevo.nombre" 
                placeholder="Ej: Filtro de aceite, Amortiguador delantero..." 
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <div class="relative">
                <input 
                  v-model.number="nuevo.stock" 
                  type="number" 
                  placeholder="0" 
                  min="0"
                  class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  required
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 text-sm">unidades</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end">
            <button 
              type="submit" 
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Agregar Producto
            </button>
          </div>
        </form>
      </div>

      <!-- Estadísticas -->
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

      <!-- Lista de productos -->
      <div v-if="productos.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="producto in productosFiltrados" 
          :key="producto.id"
          class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200"
          :class="{ 'border-l-4 border-l-red-500': producto.stock < 10 }"
        >
          <div v-if="editando !== producto.id" class="p-6">
            <!-- Header del producto -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7V6a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-semibold text-gray-900">{{ producto.nombre }}</h3>
                  <p class="text-sm text-gray-500">Código: #{{ producto.id }}</p>
                </div>
              </div>
              <div v-if="producto.stock < 10" class="flex-shrink-0">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  Stock Bajo
                </span>
              </div>
            </div>

            <!-- Stock info -->
            <div class="mb-6">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Stock disponible</span>
                <span class="text-2xl font-bold" :class="producto.stock < 10 ? 'text-red-600' : 'text-green-600'">
                  {{ producto.stock }}
                </span>
              </div>
              <div class="mt-2">
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  unidades en almacén
                </div>
              </div>
            </div>

            <!-- Acciones -->
            <div class="flex justify-end space-x-3">
              <button 
                @click="editarProducto(producto)" 
                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Editar
              </button>
              <button 
                @click="eliminarProducto(producto.id)" 
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Eliminar
              </button>
            </div>
          </div>

          <!-- Modo edición -->
          <div v-else class="p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
                <input 
                  v-model="editado.nombre" 
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder="Nombre del producto"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input 
                  v-model.number="editado.stock" 
                  type="number"
                  min="0"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder="Stock"
                />
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button 
                  @click="cancelarEdicion()" 
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Cancelar
                </button>
                <button 
                  @click="guardarEdicion(producto.id)" 
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay productos -->
      <div v-else class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay productos registrados</h3>
        <p class="text-gray-500 mb-4">Comience agregando productos a su inventario automotriz</p>
        <button 
          @click="scrollToForm"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Agregar primer producto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductos, createProducto, updateProducto, deleteProducto } from '../../services/productoService.js';
import Swal from 'sweetalert2';

export default {
  name: 'ProductosComponent',
  data() {
    return {
      productos: [],
      nuevo: { nombre: '', stock: 0 },
      editando: null,
      editado: { nombre: '', stock: 0 },
      busqueda: ''
    }
  },
  computed: {
    productosFiltrados() {
      if (!this.busqueda) return this.productos;
      return this.productos.filter(producto => 
        producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
    totalStock() {
      return this.productos.reduce((total, producto) => total + producto.stock, 0);
    },
    productosStockBajo() {
      return this.productos.filter(producto => producto.stock < 10).length;
    }
  },
  methods: {
    async cargarProductos() {
      try {
        const res = await getProductos();
        this.productos = res.data;
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
    
    async agregarProducto() {
      if (!this.nuevo.nombre.trim() || this.nuevo.stock < 0) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor, complete todos los campos correctamente',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      try {
        await createProducto(this.nuevo);
        this.nuevo = { nombre: '', stock: 0 };
        await this.cargarProductos();
        Swal.fire({
          title: 'Éxito',
          text: 'Producto agregado correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error al agregar producto:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar el producto',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },
    
    async eliminarProducto(id) {
      const result = await Swal.fire({
        title: '¿Confirmar eliminación?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
      
      if (!result.isConfirmed) return;
      
      try {
        await deleteProducto(id);
        await this.cargarProductos();
        Swal.fire({
          title: 'Eliminado',
          text: 'El producto ha sido eliminado',
          icon: 'success',
          confirmButtonColor: '#ea580c',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el producto',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },
    
    editarProducto(producto) {
      this.editando = producto.id;
      this.editado = { nombre: producto.nombre, stock: producto.stock };
    },
    
    cancelarEdicion() {
      this.editando = null;
      this.editado = { nombre: '', stock: 0 };
    },
    
    async guardarEdicion(id) {
      if (!this.editado.nombre.trim() || this.editado.stock < 0) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor, complete todos los campos correctamente',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      try {
        await updateProducto(id, this.editado);
        this.cancelarEdicion();
        await this.cargarProductos();
        Swal.fire({
          title: 'Actualizado',
          text: 'Producto actualizado correctamente',
          icon: 'success',
          confirmButtonColor: '#ea580c',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error al actualizar producto:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el producto',
          icon: 'error',
          confirmButtonColor: '#ea580c'
        });
      }
    },

    buscarProductos() {
      // La búsqueda se maneja automáticamente por el computed productosFiltrados
    },

    scrollToForm() {
      // Función para scroll hasta el formulario cuando no hay productos
      const form = document.querySelector('form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  
  mounted() {
    this.cargarProductos();
  }
}
</script>