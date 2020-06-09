import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from "axios";

export default new Vuex.Store({
  state: {
    productos: [],
    lista: [],
    contador: 0,
  },
  mutations: {
    llenarProductos(state, productosAccion) {
      state.productos = productosAccion;
    },
    aumentar(state) {
      state.contador++;
    },
  },
  actions: {
    async listarProducto({ commit }) {
      const datos = await axios.get("productos.json");
      const productos = datos.data;
      commit("llenarProductos", productos);
    },
  },
  modules: {},
});
