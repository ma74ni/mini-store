<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand :to="{ name: 'Catalogo' }" exact
          >Tu tienda</b-navbar-brand
        >
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Carrito' }"
            ><b-icon icon="cart" scale="2" variant="secondary"></b-icon
            ><b-badge variant="light">{{
              $store.state.contador
            }}</b-badge></b-nav-item
          >
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
      cont: 0,
    };
  },
  computed: {
    ...mapState(["contador"]),
  },
  created() {
    const datosDB = JSON.parse(localStorage.getItem("lista-agregada"));
    if (datosDB === null) {
      this.cont = 0;
    } else {
      this.$store.state.contador = datosDB.length;
    }
  },
};
</script>
