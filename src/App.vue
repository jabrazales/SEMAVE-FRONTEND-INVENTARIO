<script setup>
import { ref } from 'vue';
import Productos from './components/Productos.vue';
import Movimientos from './components/Movimientos.vue';
import Reporte from './components/Reporte.vue';
import Login from './components/Login.vue';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from './assets/rombo.png';
import * as XLSX from "xlsx";
const pagina = ref('productos');
const menuAbierto = ref(false);
const logueado = ref(false);
const menuPerfil = ref(false);

function cambiarPagina(p) {
  pagina.value = p;
  menuAbierto.value = false;
}


import autoTable from "jspdf-autotable";

async function exportarPDF() {
  if (pagina.value !== 'reporte') return;
  const reporte = document.getElementById('reporte-pdf');
  if (!reporte) return;

  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  // Logo
  const getBase64ImageFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
  const logoBase64 = await getBase64ImageFromURL(logo);
  doc.addImage(logoBase64, 'PNG', pageWidth / 2 - 30, 30, 60, 60);

  doc.setFontSize(22);
  doc.setTextColor('#ff6600');
  doc.text('Reporte de Inventario', pageWidth / 2, 110, { align: 'center' });

  let y = 130;
  // Recorre todas las tablas dentro de #reporte-pdf
  const tablas = reporte.querySelectorAll('table');
  tablas.forEach((tabla, idx) => {
    // Título de la tabla (busca el h3 anterior)
function buscarTituloTabla(tabla) {
  let el = tabla;
  while (el && el !== document) {
    // Busca hermanos anteriores
    let prev = el.previousElementSibling;
    while (prev) {
      if (/^H[1-6]$/i.test(prev.tagName)) return prev.innerText;
      // Busca dentro del hermano anterior si tiene hijos
      const h = prev.querySelector && prev.querySelector('h1,h2,h3,h4,h5,h6');
      if (h) return h.innerText;
      prev = prev.previousElementSibling;
    }
    // Sube al padre
    el = el.parentElement;
  }
  return "Tabla";
}
const titulo = buscarTituloTabla(tabla); 

    doc.setFontSize(14);
    doc.setTextColor('#333');
    doc.text(titulo, pageWidth / 2, y + 20, { align: 'center' });
    y += 30;
    autoTable(doc, {
      html: tabla,
      startY: y,
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: 'center',
        valign: 'middle',
      },
      headStyles: {
        fillColor: [255, 102, 0],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.1,
      margin: { left: 20, right: 20 },
    });
    y = doc.lastAutoTable.finalY + 30;
  });

  doc.save('reporte-inventario.pdf');
}
function exportarExcel() {
  if (pagina.value !== 'reporte') return;
  const reporte = document.getElementById('reporte-pdf');
  if (!reporte) return;

  const wb = XLSX.utils.book_new();
  const tablas = reporte.querySelectorAll('table');
  const nombresUsados = {};

  function buscarTituloTabla(tabla) {
    let el = tabla;
    while (el && el !== document) {
      let prev = el.previousElementSibling;
      while (prev) {
        if (/^H[1-6]$/i.test(prev.tagName)) return prev.innerText;
        const h = prev.querySelector && prev.querySelector('h1,h2,h3,h4,h5,h6');
        if (h) return h.innerText;
        prev = prev.previousElementSibling;
      }
      el = el.parentElement;
    }
    return "Tabla";
  }

  tablas.forEach((tabla, idx) => {
    let titulo = buscarTituloTabla(tabla);


    // Convierte la tabla a hoja
    const ws = XLSX.utils.table_to_sheet(tabla);

    // Inserta el título en la primera fila
    XLSX.utils.sheet_add_aoa(ws, [[titulo]], { origin: "A1" });

    // Ajusta el ancho de las columnas automáticamente
    const range = XLSX.utils.decode_range(ws['!ref']);
    ws['!cols'] = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let max_width = 10;
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell && cell.v) {
          max_width = Math.max(max_width, String(cell.v).length + 2);
        }
      }
      ws['!cols'][C] = { wch: max_width };
    }

    // Nombre de la hoja único
    let nombreHoja = titulo.replace(/\s+/g, '_').substring(0, 31);
    if (nombresUsados[nombreHoja]) {
      let i = 2;
      while (nombresUsados[`${nombreHoja}_${i}`]) i++;
      nombreHoja = `${nombreHoja}_${i}`;
    }
    nombresUsados[nombreHoja] = true;

    XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
  });
  XLSX.writeFile(wb, "reporte-inventario.xlsx");
}

</script>

<template>
  <!-- Pantalla de login -->
  <Login v-if="!logueado" @login-success="logueado = true" />

  <!-- Dashboard -->
  <div v-else class="min-h-screen flex bg-gray-100">
    <!-- Aside Desktop -->
    <aside
      class="hidden md:flex flex-col w-64 min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl px-4 py-8 gap-4 sticky top-0 z-20 border-r border-gray-700"
    >
      <div class="flex flex-col items-center gap-3 mb-10">
        <div class="bg-white rounded-full shadow-lg p-2 mb-2">
          <img :src="logo" alt="Logo" class="h-14 w-14 object-contain select-none" />
        </div>
        <h1 class="text-2xl font-extrabold tracking-widest text-orange-500 drop-shadow-lg">SEMAVE</h1>
      </div>

      <nav class="flex flex-col gap-2 flex-1">
        <button
          :class="
            pagina === 'productos'
              ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg scale-105'
              : 'bg-gray-800 text-gray-200 hover:bg-orange-500/80 hover:text-white'
          "
          @click="cambiarPagina('productos')"
          class="w-full px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200"
        >
          Productos
        </button>
        <button
          :class="
            pagina === 'movimientos'
              ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg scale-105'
              : 'bg-gray-800 text-gray-200 hover:bg-orange-500/80 hover:text-white'
          "
          @click="cambiarPagina('movimientos')"
          class="w-full px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200"
        >
          Movimientos
        </button>
        <button
          :class="
            pagina === 'reporte'
              ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg scale-105'
              : 'bg-gray-800 text-gray-200 hover:bg-orange-500/80 hover:text-white'
          "
          @click="cambiarPagina('reporte')"
          class="w-full px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200"
        >
          Reporte
        </button>
      </nav>

    </aside>

    <!-- Aside Móvil (drawer) -->
    <aside
      class="md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl p-6 z-30 transition-transform duration-300"
      :class="menuAbierto ? 'translate-x-0' : '-translate-x-full'"
      aria-label="Menú lateral"
    >
      <div class="flex flex-col items-center gap-2 mb-8">
        <img :src="logo" alt="Logo" class="h-16 w-16 object-contain select-none mb-2" />
        <h1 class="text-orange-500 text-2xl font-extrabold tracking-widest drop-shadow-lg">SEMAVE</h1>
      </div>
      <nav class="flex flex-col gap-4 flex-1">
        <button
          :class="pagina === 'productos' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20'"
          @click="cambiarPagina('productos')"
          class="w-full px-4 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Productos
        </button>
        <button
          :class="pagina === 'movimientos' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20'"
          @click="cambiarPagina('movimientos')"
          class="w-full px-4 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Movimientos
        </button>
        <button
          :class="pagina === 'reporte' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/10 text-orange-500 border-2 border-orange-500 hover:bg-orange-500/20'"
          @click="cambiarPagina('reporte')"
          class="w-full px-4 py-3 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out backdrop-blur-sm hover:shadow-lg"
        >
          Reporte
        </button>
      </nav>

    </aside>

    <!-- Botón hamburguesa móvil -->
    <button
      @click="menuAbierto = !menuAbierto"
      class="md:hidden fixed top-4 left-4 z-40 bg-orange-500 text-white rounded-full p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      aria-label="Abrir menú"
      :aria-expanded="menuAbierto.toString()"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Contenido principal -->
  <!-- Contenido principal -->
<main class="flex-1 min-h-screen transition-all duration-300 flex flex-col">
  <!-- Header / Topbar -->
  <header class="w-full border-b border-gray-200 bg-white/70 backdrop-blur sticky top-0 z-10">
    <div class="w-full max-w-5xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/>
          </svg>
          {{ pagina === 'productos' ? 'Gestión de Productos' : (pagina === 'movimientos' ? 'Movimientos' : 'Reporte de Stock') }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ pagina === 'productos'
              ? 'Administra el catálogo y sus aplicaciones'
              : (pagina === 'movimientos'
                  ? 'Entradas, salidas y ajustes de inventario'
                  : 'Visualiza el inventario y métricas clave') }}
        </p>
<div class="flex items-center gap-2" v-if="pagina === 'reporte'">
  <button
    @click="exportarPDF"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium transition"
    title="Exportar reporte a PDF"
  >
    <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V9h5.5L13 3.5zM8 13h1.5v6H8v-6zm3 0h1.25c.966 0 1.75.784 1.75 1.75S13.216 16.5 12.25 16.5H11v-3.5zm1.25 2.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM16 13h1v6h-1v-6z"/>
    </svg>
    Exportar PDF
  </button>
  <button
    @click="exportarExcel"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-sm font-medium transition"
    title="Exportar reporte a Excel"
  >
    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 18H8V4h11v16zm-7-7.5l2.25 3.5h-1.5l-1.5-2.5-1.5 2.5h-1.5L9 12.5l-2.25-3.5h1.5l1.5 2.5 1.5-2.5h1.5L12 12.5z"/>
    </svg>
    Exportar Excel
  </button>
   </div>
</div>


 <!-- Perfil usuario -->
<div class="relative" tabindex="0" @blur="menuPerfil = false">
  <button
    @click="menuPerfil = !menuPerfil"
    class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
    type="button"
  >
    <img :src="logo" alt="Perfil" class="h-8 w-8 rounded-full border border-gray-300" />
    <span class="hidden sm:inline text-gray-700 font-medium">Admin🎀</span>
    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </button>

  <!-- Menú desplegable -->
  <div
    v-if="menuPerfil"
    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
  >
    <button
      @click="logueado = false"
      class="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-700 flex items-center gap-2"
    >
      <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
      Cerrar sesión
    </button>
  </div>
</div>
</div>

</header>

  <!-- Wrapper centrado y con ancho máximo -->
  <div class="w-full max-w-5xl mx-auto px-4 md:px-6 py-8 flex-1">
    <section>
      <Productos v-if="pagina === 'productos'" />
      <Movimientos v-else-if="pagina === 'movimientos'" />
      <Reporte v-else />
    </section>
  </div>

  <!-- Footer -->
  <footer class="w-full border-t border-gray-200 bg-white">
    <div class="w-full max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between text-sm text-gray-500">
      <span>© {{ new Date().getFullYear() }} SEMAVE · Todos los derechos reservados Desarrollado por JABC </span>
      <span class="hidden sm:inline">v1.0.0 · Estado: Operativo</span>
    </div>
  </footer>
<a
  href="https://wa.me/593991791165?text=Hola%20Andres,%20necesito%20soporte%20de%20mantenimiento%20de%20la%20página"
  target="_blank"
  rel="noopener"
  class="fixed bottom-6 right-6 z-50 group"
  title="Soporte por WhatsApp"
>
  <!-- Tooltip -->
  <span
    class="absolute right-20 bottom-1/2 translate-y-1/2 bg-gray-900 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
  >
    ¿Necesitas soporte?
  </span>
  <div class="bg-green-500 hover:bg-green-600 rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-all">
    <svg class="w-9 h-9 text-white" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.31A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.89-.52-5.54-1.5l-.39-.23-4.28 1.38 1.4-4.16-.25-.4A9.97 9.97 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.85c.14.18 1.92 2.94 4.66 4.01.65.28 1.16.45 1.56.58.65.21 1.24.18 1.7.11.52-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
    </svg>
  </div>
</a>
</main>
  </div>
</template>
