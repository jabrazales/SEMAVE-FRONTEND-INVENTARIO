<script setup>
import { ref } from 'vue';
import logo from '../assets/rombo.png';

const usuario = ref('');
const contrasena = ref('');
const errorLogin = ref('');

const emit = defineEmits(['login-success']);

function login() {
  if (usuario.value === 'admin' && contrasena.value === 'admin') {
    emit('login-success');
    errorLogin.value = '';
    usuario.value = '';
    contrasena.value = '';
  } else {
    errorLogin.value = 'Usuario o contraseña incorrectos';
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-700 to-gray-900">
    <div class="bg-gray-800/90 p-8 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-xs">
      <img :src="logo" alt="Logo" class="h-20 w-20 object-contain mb-4 select-none" />
      <h2 class="text-orange-500 text-2xl font-bold mb-6 tracking-widest">SEMAVE</h2>
      <form @submit.prevent="login" class="w-full flex flex-col gap-4">
        <input v-model="usuario" type="text" placeholder="Usuario" class="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" autocomplete="username" />
        <input v-model="contrasena" type="password" placeholder="Contraseña" class="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" autocomplete="current-password" />
        <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition-all duration-200">Iniciar sesión</button>
        <div v-if="errorLogin" class="text-red-400 text-sm text-center">{{ errorLogin }}</div>
      </form>

    </div>
  </div>
</template>
