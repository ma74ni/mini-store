<template>
  <div id="app">
    <Nav />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>
