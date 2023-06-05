import axios, { AxiosError } from 'axios';

interface ListaItem {
  id: string;
  fullName: string;
  precio: string;
}
interface User {
  Usuario: string;
  Pss: string;
  Correo: string;
  numeroTarjeta: string;
  codigoSeguridad: number;
  fechaVencimiento: string;
}
interface compra {
  usuario: string;
  total: number;
  fecha:string;
}

export const carritoTem = async (data: ListaItem) => {
  try {
    const response = await axios.post('http://192.168.1.109:8000/tbTem', data);
    console.log('Datos guardados exitosamente', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error al guardar los datos:', axiosError.message);
    } else {
      console.error('Error al guardar los datos:', error);
    }
  }
};

export const addUser = async (user: User) => {
  try {
    const response = await axios.post('http://192.168.1.109:8000/addUser', user);
    console.log('Datos guardados exitosamente', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error al guardar los datos:', axiosError.message);
    } else {
      console.error('Error al guardar los datos:', error);
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get('http://192.168.1.109:8000/getUsers');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

export const getCarrito = async () => {
  try {
    const response = await axios.get('http://192.168.1.109:8000/carritoTem');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

export const deleteCarritoItem = async (id: string) => {
  try {
    const response = await axios.delete(`http://192.168.1.109:8000/carrito/${id}`);
    console.log('Elemento eliminado exitosamente', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error al eliminar el elemento:', axiosError.message);
    } else {
      console.error('Error al eliminar el elemento:', error);
    }
  }
};

export const compra = async (data: compra) => {
  try {
    const response = await axios.post('http://192.168.1.109:8000/compra', data);
    console.log('Datos guardados exitosamente', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error al guardar los datos:', axiosError.message);
    } else {
      console.error('Error al guardar los datos:', error);
    }
  }
};


