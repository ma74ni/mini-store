<template>
  <div>
    <b-row class="my-5">
      <b-col cols="12" md="4" v-for="(item, index) of productos" :key="index">
        <b-card
          :title="item.name"
          :img-src="item.image"
          :img-alt="item.name"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text> {{ item.description }} </b-card-text>
          <b-row>
            <b-col cols="6">${{ item.price }}</b-col>
            <b-col cols="6" class="text-right"
              ><b-button
                @click="
                  agregarProducto(item);
                  aumentar();
                "
                variant="primary"
                ><b-icon icon="cart-plus"></b-icon></b-button
            ></b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "List",
  data() {
    return {
      incremental: 0,
    };
  },
  computed: {
    ...mapState(["productos", "contador"]),
  },
  methods: {
    ...mapActions(["listarProducto"]),
    ...mapMutations(["aumentar"]),
    agregarProducto(item) {
      this.lista.push({
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
      });
      this.contador++;
      localStorage.setItem("lista-agregada", JSON.stringify(this.lista));
    },
  },
  created() {
    this.listarProducto();
    const datosDB = JSON.parse(localStorage.getItem("lista-agregada"));
    if (datosDB === null) {
      this.lista = [];
    } else {
      this.lista = datosDB;
    }
  },
};
</script>
