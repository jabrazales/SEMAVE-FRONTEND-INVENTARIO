
<script setup>
import { ref } from 'vue';
import Productos from './components/Productos.vue';
import Movimientos from './components/Movimientos.vue';
import Reporte from './components/Reporte.vue';

const pagina = ref('productos');
const menuAbierto = ref(false);

function cambiarPagina(p) {
  pagina.value = p;
  menuAbierto.value = false;
}
</script>

<template>
  <nav class="w-full bg-gradient-to-br from-gray-600 to-gray-700 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-lg mb-6">
    <div class="flex justify-between items-center">
      <h1 class="text-orange-500 text-2xl md:text-3xl font-extrabold tracking-widest drop-shadow-lg">SEMAVE</h1>
      <!-- Botón hamburguesa solo en móvil -->
      <button @click="menuAbierto = !menuAbierto" class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Abrir menú">
        <span class="block w-7 h-1 bg-orange-500 rounded mb-1 transition-all duration-300" :class="menuAbierto ? 'rotate-45 translate-y-2' : ''"></span>
        <span class="block w-7 h-1 bg-orange-500 rounded mb-1 transition-all duration-300" :class="menuAbierto ? 'opacity-0' : ''"></span>
        <span class="block w-7 h-1 bg-orange-500 rounded transition-all duration-300" :class="menuAbierto ? '-rotate-45 -translate-y-2' : ''"></span>
      </button>
      <!-- Menú desktop -->
      <div class="hidden md:flex gap-4">
        <button 
          :class="pagina === 'productos' ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20 hover:transform hover:-translate-y-0.5 hover:shadow-orange-500/30'" 
          @click="cambiarPagina('productos')"
          class="px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Productos
        </button>
        <button 
          :class="pagina === 'movimientos' ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20 hover:transform hover:-translate-y-0.5 hover:shadow-orange-500/30'" 
          @click="cambiarPagina('movimientos')"
          class="px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Movimientos
        </button>
        <button 
          :class="pagina === 'reporte' ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20 hover:transform hover:-translate-y-0.5 hover:shadow-orange-500/30'" 
          @click="cambiarPagina('reporte')"
          class="px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Reporte
        </button>
      </div>
    </div>
    <!-- Menú móvil desplegable -->
    <transition name="fade">
      <div v-if="menuAbierto" class="md:hidden flex flex-col gap-2 mt-4 bg-gray-700/95 rounded-xl shadow-lg p-4 animate-fade-in">
        <button 
          :class="pagina === 'productos' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20'" 
          @click="cambiarPagina('productos')"
          class="w-full px-4 py-3 rounded-full font-semibold text-base transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg mb-2"
        >
          Productos
        </button>
        <button 
          :class="pagina === 'movimientos' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20'" 
          @click="cambiarPagina('movimientos')"
          class="w-full px-4 py-3 rounded-full font-semibold text-base transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg mb-2"
        >
          Movimientos
        </button>
        <button 
          :class="pagina === 'reporte' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20'" 
          @click="cambiarPagina('reporte')"
          class="w-full px-4 py-3 rounded-full font-semibold text-base transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Reporte
        </button>
      </div>
    </transition>
  </nav>
  <div>
    <Productos v-if="pagina === 'productos'" />
    <Movimientos v-else-if="pagina === 'movimientos'" />
    <Reporte v-else />
  </div>
</template>