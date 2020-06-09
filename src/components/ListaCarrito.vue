<template>
  <div class="my-5">
    <div v-if="listaPrevia.length === 0" class="content-mensaje text-center">
      <h3 class="">Aún no tienes artículos agregados a tu carrito</h3>
      <button class="btn btn-primary" @click="catalogo">Comprar aquí</button>
    </div>
    <div class="my-5" v-if="listaPrevia.length > 0">
      {{ listaPrevia }}
      <b-card
        no-body
        class="overflow-hidden"
        v-for="(item, index) of listaPrevia"
        :key="index"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="item.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="item.name">
              <b-card-text>
                {{ item.description }}
              </b-card-text>
              <b-row align-v="center">
                <b-col col
                  ><b>${{ item.price * item.cantidad }}</b></b-col
                >
                <b-col col>
                  <b-button-group size="sm">
                    <b-button @click="aumentaCantidad(index)">+</b-button>
                    <b-button>{{ item.cantidad }}</b-button>
                    <b-button
                      v-if="item.cantidad >= 2"
                      @click="disminuyeCantidad(index)"
                      >-</b-button
                    >
                  </b-button-group>
                </b-col>
                <b-col col
                  ><button @click="eliminar(index)" class="btn btn-danger">
                    <b-icon icon="trash"></b-icon></button
                ></b-col>
              </b-row>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="totals" v-if="listaPrevia.length > 0">
      <b-container>
        <h4>Total</h4>
        <b-row>
          <b-col col>SUBTOTAL</b-col>
          <b-col col class="text-right">${{ calcSubtotal }}</b-col>
        </b-row>
        <b-row>
          <b-col col>IMPUESTO ({{ impuesto * 100 }}%)</b-col>
          <b-col col class="text-right">${{ calcImpuesto }}</b-col>
        </b-row>
        <b-row>
          <b-col col></b-col>
          <b-col col class="text-right"
            ><b>${{ calcSubtotal + calcImpuesto }}</b></b-col
          >
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaCarrito",
  data() {
    return {
      listaPrevia: [],
      subtotal: 0,
      impuesto: 0.12,
      valImpuesto: 0,
      cantidad: 1,
      numeros: [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
        { value: 8, text: 8 },
        { value: 9, text: 9 },
        { value: 10, text: 10 },
      ],
    };
  },
  computed: {
    calcSubtotal() {
      this.listaPrevia.forEach((element) => {
        this.subtotal += element.price * element.cantidad;
      });
      return this.subtotal;
    },
    calcImpuesto() {
      return this.impuesto * this.calcSubtotal;
    },
  },
  methods: {
    catalogo() {
      this.$router.push("/");
    },
    aumentaCantidad(index) {
      this.listaPrevia[index].cantidad++;
      this.subtotal = 0;
    },
    disminuyeCantidad(index) {
      this.listaPrevia[index].cantidad--;
      this.subtotal = 0;
    },
    eliminar(index) {
      this.subtotal = 0;
      this.listaPrevia.splice(index, 1);
      this.$store.state.contador--;
      localStorage.setItem("lista-agregada", JSON.stringify(this.listaPrevia));
    },
  },
  created() {
    const datosDB = JSON.parse(localStorage.getItem("lista-agregada"));
    if (datosDB === null) {
      this.listaPrevia = [];
    } else {
      this.listaPrevia = datosDB;
    }
  },
};
</script>
