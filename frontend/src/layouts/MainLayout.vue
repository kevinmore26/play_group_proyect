<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>
          <span class="text-h6 font-medium q-mx-md">PLAY GROUP LATAM</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- Aquí colocamos la tabla para manejar los productos -->
      <ProductTable />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ProductTable from 'components/ProductTable.vue';

defineOptions({
  name: 'MainLayout',
});
</script>
