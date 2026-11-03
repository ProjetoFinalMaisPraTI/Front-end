import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptor para adicionar o token Bearer em cada requisição
api.interceptors.request.use((config) => {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    try {
      const usuarioObj = JSON.parse(usuario);
      if (usuarioObj.token) {
        config.headers.Authorization = `Bearer ${usuarioObj.token}`;
      }
    } catch (e) {
      // Se o token for guardado como string direta
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

export default api;