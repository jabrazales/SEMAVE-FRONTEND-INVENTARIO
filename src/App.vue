<script setup>
import { ref } from 'vue';
import Productos from './components/Productos.vue';
import Movimientos from './components/Movimientos.vue';
import Reporte from './components/Reporte.vue';

const pagina = ref('productos');
</script>

<template>
  <nav class="w-full flex justify-between items-center bg-gradient-to-br from-gray-600 to-gray-700 px-8 py-4 sticky top-0 z-10 shadow-lg mb-6">
    <div>
      <h1 class="text-orange-500 text-3xl font-extrabold tracking-widest drop-shadow-lg">SEMAVE</h1>
    </div>
    <div class="flex gap-4">
      <button 
        :class="pagina === 'productos' ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20 hover:transform hover:-translate-y-0.5 hover:shadow-orange-500/30'" 
        @click="pagina = 'productos'"
        class="px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
      >
        Productos
      </button>
      <button 
        :class="pagina === 'movimientos' ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20 hover:transform hover:-translate-y-0.5 hover:shadow-orange-500/30'" 
        @click="pagina = 'movimientos'"
        class="px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
      >
        Movimientos
      </button>
      <button 
        :class="pagina === 'reporte' ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20 hover:transform hover:-translate-y-0.5 hover:shadow-orange-500/30'" 
        @click="pagina = 'reporte'"
        class="px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
      >
        Reporte
      </button>
    </div>
  </nav>
  <div>
    <Productos v-if="pagina === 'productos'" />
    <Movimientos v-else-if="pagina === 'movimientos'" />
    <Reporte v-else />
  </div>
</template>