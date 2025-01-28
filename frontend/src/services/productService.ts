import axios from 'axios';

const API_URL = 'http://localhost:3000/api/productos';

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (product: { nombre: string; descripcion: string; imagen: string }) => {
    try {
        const response = await axios.post(API_URL, product, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};


export const updateProduct = async (id: number, product: { nombre: string; descripcion: string; imagen: string }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};


export const deleteProduct = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Esto asegura que TypeScript lo trate como un módulo
export { };
