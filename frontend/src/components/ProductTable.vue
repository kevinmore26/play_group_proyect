<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-section flat bordered>
        <q-card-section class="q-pa-md text-center">
          <div class="text-h4 text-primary font-bold">Gestión de Productos</div>
          <div class="text-caption text-secondary q-mt-sm">
            Gestiona tus productos: visualiza, edita y elimina fácilmente.
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <q-input
            v-model="search"
            outlined
            dense
            clearable
            debounce="300"
            placeholder="Buscar por nombre o descripción"
            class="q-mb-md   bg-white shadow-1 rounded-lg"
            style="max-width: 400px; margin: 20px auto "
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
            <template v-slot:append>
              <q-btn
                flat
                dense
                round
                color="primary"
                icon="close"
                v-if="search"
                @click="search = ''"
              />
            </template>
          </q-input>

          <q-btn
            label="Añadir Producto"
            icon="add_circle"
            color="primary"
            push
            class="q-mb-md"
            style="padding: 14px"
            @click="openProductModal('create')"
          />
          <q-table
            :rows="filteredProducts"
            :columns="columns"
            row-key="id"
            flat
            bordered
            class="shadow-1 rounded-lg"
          >
            <template v-slot:body-cell-imagen="props">
              <q-td>
                <q-img
                  :src="props.row.imagen"
                  style="max-width: 50px; max-height: 50px; border-radius: 8px"
                  :alt="props.row.nombre"
                />
              </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
              <q-td align="center">
                <q-btn
                  dense
                  round
                  flat
                  icon="edit"
                  color="primary"
                  @click="openProductModal('edit', props.row)"
                />
                <q-btn
                  dense
                  round
                  flat
                  icon="delete"
                  color="negative"
                  @click="openDeleteModal(props.row)"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-section>
    </div>

    <!-- Modal para Crear/Editar Producto -->
    <q-dialog v-model="productModalOpen" style="position: relative">
      <!-- Overlay de carga -->
      <q-overlay
        v-if="uploading"
        class="text-white flex flex-center"
        style="
          position: absolute;
          inset: 0;
          z-index: 10;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px);
        "
      >
        <div class="flex flex-col items-center">
          <q-spinner size="50px" color="white" />
          <div style="margin-top: 10px; font-size: 18px; font-weight: bold">
            Cargando...
          </div>
        </div>
      </q-overlay>

      <!-- Tarjeta del formulario -->
      <q-card
        class="shadow-3 rounded-lg"
        style="padding: 15px; min-width: 350px; position: relative"
      >
        <q-card-section class="q-pa-md">
          <div class="text-h5 font-medium text-primary">
            {{ isEditing ? 'Editar Producto' : 'Añadir Producto' }}
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <!-- Nombre -->
          <q-input
            v-model="form.nombre"
            label="Nombre"
            outlined
            dense
            class="q-mb-md"
          />
          <!-- Descripción -->
          <q-input
            v-model="form.descripcion"
            label="Descripción"
            outlined
            dense
            class="q-mb-md"
          />
          <!-- Mostrar imagen -->
          <div v-if="isEditing" class="q-mb-md">
            <div class="text-caption text-primary q-mb-sm">Imagen actual:</div>
            <q-img
              v-if="!useLocalImage || (useLocalImage && !form.imagen)"
              :src="form.imagen"
              style="max-width: 100%; max-height: 200px; border-radius: 8px"
              :alt="form.nombre"
            />
          </div>
          <!-- Toggle para decidir si cambiar la imagen -->
          <q-toggle
            v-model="useLocalImage"
            :label="
              useLocalImage ? '¿Usar imagen local?' : 'Usar URL de imagen'
            "
            dense
            class="q-mb-md"
          />

          <!-- Campo para URL -->
          <q-input
            v-if="!useLocalImage"
            v-model="form.imagen"
            label="URL de la Imagen"
            outlined
            dense
            class="q-mb-md"
          />
          <!-- Subir archivo -->
          <q-uploader
            v-else
            label="Selecciona una imagen"
            accept="image/*"
            class="q-mb-md"
            @added="(files) => (form.imagen = files[0])"
            :disable="uploading"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            flat
            label="Cancelar"
            color="negative"
            @click="closeProductModal"
          />
          <q-btn flat label="Guardar" color="primary" @click="saveProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Confirmación para Eliminar -->
    <q-dialog v-model="deleteModalOpen">
      <q-card class="shadow-3 rounded-lg q-pa-md">
        <q-card-section class="">
          <div class="text-h6 font-medium text-negative">
            Confirmar Eliminación
          </div>
          <p class="q-mt-sm">
            ¿Estás seguro de que deseas eliminar este producto?
          </p>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click="closeDeleteModal"
          />
          <q-btn
            flat
            label="Eliminar"
            color="negative"
            @click="confirmDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  getProducts,
  addProduct as apiAddProduct,
  updateProduct,
  deleteProduct as apiDeleteProduct,
} from '../services/productService';
import { uploadImage } from '../services/cloudinaryService';
import { useQuasar } from 'quasar';

interface Product {
  id?: number; // Hacemos que sea opcional para la creación
  nombre: string;
  descripcion: string;
  imagen: string;
}

interface Column {
  name: string;
  label: string;
  field: keyof Product | 'actions' | ((row: Product) => string | number);
  required?: boolean;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

const products = ref<Product[]>([]);
const loading = ref(false);
const columns: Column[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  {
    name: 'nombre',
    label: 'Nombre',
    field: 'nombre',
    align: 'left',
    sortable: true,
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    field: 'descripcion',
    align: 'left',
  },
  { name: 'imagen', label: 'Imagen', field: 'imagen', align: 'left' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' },
];

// Estados del modal
const search = ref('');
const productModalOpen = ref(false);
const deleteModalOpen = ref(false);
const uploading = ref(false);
const useLocalImage = ref(false);
const $q = useQuasar();

// Modal para producto
const form = ref<Product>({
  nombre: '',
  descripcion: '',
  imagen: '',
});
const isEditing = ref(false);

// Producto seleccionado para eliminar
const selectedProduct = ref<Product | null>(null);

async function fetchProducts() {
  try {
    products.value = await getProducts();
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

function openProductModal(
  mode: 'create' | 'edit',
  product: Product | null = null
) {
  isEditing.value = mode === 'edit';

  if (product) {
    // Mantener datos del producto actual en el formulario
    form.value = { ...product };
    useLocalImage.value = false; // Por defecto, no cambiar la imagen
  } else {
    // Limpiar el formulario para un nuevo producto
    form.value = { nombre: '', descripcion: '', imagen: '' };
    useLocalImage.value = true; // Por defecto, permitir subir una nueva imagen
  }

  productModalOpen.value = true;
}

function closeProductModal() {
  productModalOpen.value = false;
}

async function saveProduct() {
  try {
    // Mostrar indicador de carga
    loading.value = true;
    uploading.value = true;
    // Verificar si es necesario subir la imagen a Cloudinary
    if (useLocalImage.value && form.value.imagen) {
      console.log('Subiendo imagen a Cloudinary...');
      const file = form.value.imagen as unknown as File; // Asegurar el tipo
      const imageUrl = await uploadImage(file);
      console.log(imageUrl);
      form.value.imagen = imageUrl; // Actualizar la URL generada
      console.log(form.value.imagen, 'form.value.imagen');
    }

    // Verificar que la URL de la imagen esté presente
    if (!form.value.imagen) {
      $q.notify('Debes ingresar una URL o subir una imagen.');
      console.error('Debes ingresar una URL o subir una imagen.');
      uploading.value = false; // Detener indicador de carga
      return;
    }

    // Preparar los datos para enviar al backend
    const productData = {
      nombre: form.value.nombre,
      descripcion: form.value.descripcion,
      imagen: form.value.imagen,
    };

    console.log('Datos enviados al backend:', productData);

    // Crear o actualizar el producto
    if (isEditing.value && form.value.id) {
      await updateProduct(form.value.id, productData);
    } else {
      await apiAddProduct(productData);
    }

    // Refrescar la lista de productos y cerrar el modal
    fetchProducts();
    closeProductModal();
  } catch (error) {
    $q.notify('Error al guardar el producto');
    console.error('Error al guardar el producto:', error);
  } finally {
    $q.notify({
      message: 'Producto guardado exitosamente.',
      timeout: 3000, // Duración en milisegundos
      color: 'green',
    });

    uploading.value = false;
    loading.value = false; // Ocultar indicador de carga
  }
}

function openDeleteModal(product: Product) {
  selectedProduct.value = product;
  deleteModalOpen.value = true;
}

function closeDeleteModal() {
  deleteModalOpen.value = false;
  selectedProduct.value = null;
}

async function confirmDelete() {
  try {
    if (selectedProduct.value && selectedProduct.value.id) {
      await apiDeleteProduct(selectedProduct.value.id);
      fetchProducts();
      closeDeleteModal();
      $q.notify({
        message: 'Producto borrado exitosamente.',
        timeout: 3000, // Duración en milisegundos
        color: 'green',
      });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}

onMounted(() => {
  fetchProducts();
});
const filteredProducts = computed(() => {
  if (!search.value) return products.value;

  return products.value.filter((product) => {
    const lowerSearch = search.value.toLowerCase();
    return (
      product.nombre.toLowerCase().includes(lowerSearch) ||
      product.descripcion.toLowerCase().includes(lowerSearch)
    );
  });
});
</script>
