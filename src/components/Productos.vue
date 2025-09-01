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

      <!-- Formulario para agregar producto con aplicaciones dinámicas -->
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
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Código</label>
              <input
                v-model="nuevo.codigo"
                placeholder="Ej: PH 3593"
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <input
                v-model="nuevo.tipo"
                placeholder="Ej: FILTRO ACEITE"
                class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                required
              />
            </div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Aplicaciones (autos y stock por aplicación)</label>
            <div v-for="(app, idx) in nuevo.aplicaciones" :key="idx" class="flex gap-2 mb-2 items-end">
              <div class="flex-1">
                <label class="block text-xs text-gray-500 mb-1">Aplicación</label>
                <input v-model="app.nombre" placeholder="Nombre de la aplicación" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Stock Percha</label>
                <input v-model.number="app.stock_percha" type="number" min="0" placeholder="Percha" class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Stock Caja</label>
                <input v-model.number="app.stock_caja" type="number" min="0" placeholder="Caja" class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Línea</label>
                <input v-model.number="app.linea" type="number" min="0" placeholder="Línea" class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Código Aplicación</label>
                <input v-model="app.codigo_aplicacion" placeholder="Código único" class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
              </div>
              <button type="button" @click="nuevo.aplicaciones.splice(idx,1)" class="text-red-500 hover:text-red-700 font-bold mb-5">✕</button>
            </div>
            <button type="button" @click="nuevo.aplicaciones.push({nombre:'',stock_percha:0,stock_caja:0,linea:0,codigo_aplicacion:''})" class="mt-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200">+ Agregar Aplicación</button>
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

      </div>

      <!-- Tabla de productos: cada producto con su propia tabla de aplicaciones -->
      <div v-if="productos.length > 0" class="space-y-8">
        <div v-for="producto in productosFiltrados" :key="producto.id" class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <span class="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mr-2">Código: {{ producto.codigo }}</span>
              <span class="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold mr-2">Tipo: {{ producto.tipo }}</span>
              <span class="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-bold">Total aplicaciones: {{ producto.aplicaciones.length }}</span>
            </div>
            <div class="flex gap-2">
              <button @click="editarProducto(producto)" class="p-2 rounded hover:bg-orange-100" title="Editar">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button @click="eliminarProducto(producto.id)" class="p-2 rounded hover:bg-red-100" title="Eliminar">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
          <div v-if="editando === producto.id" class="p-6 bg-orange-50 border-t border-orange-200">
            <form @submit.prevent="guardarEdicion(producto.id)">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Código</label>
                  <input v-model="editado.codigo" class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <input v-model="editado.tipo" class="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Aplicaciones</label>
                <div v-for="(app, idx) in editado.aplicaciones" :key="idx" class="flex gap-2 mb-2 items-end">
                  <div class="flex-1">
                    <label class="block text-xs text-gray-500 mb-1">Aplicación</label>
                    <input v-model="app.nombre" placeholder="Nombre de la aplicación" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Stock Percha</label>
                    <input v-model.number="app.stock_percha" type="number" min="0" placeholder="Percha" class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Stock Caja</label>
                    <input v-model.number="app.stock_caja" type="number" min="0" placeholder="Caja" class="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Línea</label>
                    <input v-model.number="app.linea" type="number" min="0" placeholder="Línea" class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Código Aplicación</label>
                    <input v-model="app.codigo_aplicacion" placeholder="Código único" class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                  </div>
                  <button type="button" @click="editado.aplicaciones.splice(idx,1)" class="text-red-500 hover:text-red-700 font-bold mb-5">✕</button>
                </div>
                <button type="button" @click="editado.aplicaciones.push({nombre:'',stock_percha:0,stock_caja:0,linea:0,codigo_aplicacion:''})" class="mt-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200">+ Agregar Aplicación</button>
              </div>
              <div class="mt-6 flex justify-end gap-2">
                <button type="button" @click="cancelarEdicion" class="px-6 py-3 rounded-lg border border-gray-400 text-gray-700 bg-white hover:bg-gray-100">Cancelar</button>
                <button type="submit" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Línea</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aplicación</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Percha</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Caja</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Aplicación</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Total</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(app, idx) in producto.aplicaciones" :key="app.id || app.nombre || idx">
                  <td class="px-4 py-2 whitespace-nowrap">{{ app.linea }}</td>
                  <td class="px-4 py-2 whitespace-nowrap">{{ app.nombre }}</td>
                  <td class="px-4 py-2 whitespace-nowrap font-bold text-gray-800">{{ Number(app.stock_percha) || 0 }}</td>
                  <td class="px-4 py-2 whitespace-nowrap font-bold text-gray-800">{{ Number(app.stock_caja) || 0 }}</td>
                  <td class="px-4 py-2 whitespace-nowrap">{{ app.codigo_aplicacion }}</td>
                  <td class="px-4 py-2 whitespace-nowrap font-bold text-orange-700">{{ (Number(app.stock_percha) || 0) + (Number(app.stock_caja) || 0) }}</td>
                </tr>
              </tbody>
            </table>
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
  nuevo: { codigo: '', tipo: '', aplicaciones: [] },
  editando: null,
  editado: { nombre: '', stock: 0, aplicacionesTexto: '' },
  busqueda: ''
    }
  },
  computed: {
    productosFiltrados() {
      if (!this.busqueda) return this.productos;
      const term = this.busqueda.toLowerCase();
      return this.productos.filter(producto =>
        (producto.codigo && producto.codigo.toLowerCase().includes(term)) ||
        (producto.tipo && producto.tipo.toLowerCase().includes(term)) ||
        (producto.aplicaciones && producto.aplicaciones.some(app => app.nombre && app.nombre.toLowerCase().includes(term)))
      );
    },
    totalStock() {
      // Suma el stock total (percha + caja) de todas las aplicaciones de todos los productos
      return this.productos.reduce((total, producto) => {
        if (!producto.aplicaciones) return total;
        return total + producto.aplicaciones.reduce((sum, app) => sum + (Number(app.stock_percha) || 0) + (Number(app.stock_caja) || 0), 0);
      }, 0);
    },
    productosStockBajo() {
      // Cuenta cuántas aplicaciones tienen stock menor a 10
      return this.productos.reduce((count, producto) => {
        if (!producto.aplicaciones) return count;
        return count + producto.aplicaciones.filter(app => Number(app.stock) < 10).length;
      }, 0);
    }
  },
  methods: {
    async cargarProductos() {
      try {
        const res = await getProductos();
        // Mapear aplicaciones para compatibilidad con la UI y mostrar stock correctamente
        this.productos = res.data.map(p => ({
          ...p,
          aplicaciones: Array.isArray(p.aplicaciones)
            ? p.aplicaciones.map(app => ({
                nombre: app.nombre,
                stock_percha: app.stock_percha ?? (app.ProductoAplicacion ? app.ProductoAplicacion.stock_percha : 0),
                stock_caja: app.stock_caja ?? (app.ProductoAplicacion ? app.ProductoAplicacion.stock_caja : 0),
                linea: app.linea ?? (app.ProductoAplicacion ? app.ProductoAplicacion.linea : ''),
                codigo_aplicacion: app.codigo_aplicacion ?? (app.ProductoAplicacion ? app.ProductoAplicacion.codigo_aplicacion : '')
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
    
    async agregarProducto() {
      if (
        !this.nuevo.codigo ||
        !this.nuevo.tipo ||
        !Array.isArray(this.nuevo.aplicaciones) ||
        this.nuevo.aplicaciones.length === 0 ||
        this.nuevo.aplicaciones.some(app =>
          !app.nombre ||
          app.stock_percha === undefined || app.stock_percha === null || app.stock_percha < 0 ||
          app.stock_caja === undefined || app.stock_caja === null || app.stock_caja < 0 ||
          app.linea === undefined || app.linea === null || app.linea === '' ||
          !app.codigo_aplicacion
        )
      ) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor, complete todos los campos correctamente (incluye nombre, stock percha, stock caja, línea y código aplicación en cada aplicación)',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      try {
        await createProducto({
          codigo: this.nuevo.codigo,
          tipo: this.nuevo.tipo,
          aplicaciones: this.nuevo.aplicaciones
        });
        this.nuevo = { codigo: '', tipo: '', aplicaciones: [] };
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
        let mensaje = 'No se pudo agregar el producto';
        // Detectar error de código repetido
        if (error.response && error.response.data && typeof error.response.data === 'object') {
          if (error.response.data.message && error.response.data.message.toLowerCase().includes('codigo') && error.response.data.message.toLowerCase().includes('repetido')) {
            mensaje = 'El código de producto ya existe. Usa un código único.';
          }
        } else if (error.message && error.message.toLowerCase().includes('codigo') && error.message.toLowerCase().includes('repetido')) {
          mensaje = 'El código de producto ya existe. Usa un código único.';
        }
        Swal.fire({
          title: 'Error',
          text: mensaje,
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
      // Copiar todos los campos y aplicaciones para edición completa
      this.editado = {
        codigo: producto.codigo,
        tipo: producto.tipo,
        aplicaciones: producto.aplicaciones.map(app => ({
          nombre: app.nombre,
          stock_percha: app.stock_percha,
          stock_caja: app.stock_caja,
          linea: app.linea,
          codigo_aplicacion: app.codigo_aplicacion
        }))
      };
    },
    cancelarEdicion() {
      this.editando = null;
      this.editado = { nombre: '', stock: 0, aplicacionesTexto: '' };
    },
    async guardarEdicion(id) {
      // Validar campos
      if (!this.editado.codigo || !this.editado.tipo || !Array.isArray(this.editado.aplicaciones) || this.editado.aplicaciones.length === 0 ||
        this.editado.aplicaciones.some(app =>
          !app.nombre ||
          app.stock_percha === undefined || app.stock_percha === null || app.stock_percha < 0 ||
          app.stock_caja === undefined || app.stock_caja === null || app.stock_caja < 0 ||
          app.linea === undefined || app.linea === null || app.linea === '' ||
          !app.codigo_aplicacion
        )
      ) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor, complete todos los campos correctamente (incluye nombre, stock percha, stock caja, línea y código aplicación en cada aplicación)',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      try {
        await updateProducto(id, {
          codigo: this.editado.codigo,
          tipo: this.editado.tipo,
          aplicaciones: this.editado.aplicaciones
        });
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