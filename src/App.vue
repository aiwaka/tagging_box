<template>
  <div id="app">
    <h1>Tagging Box</h1>
    <menubar />
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <board />
  </div>
</template>

<script>
import Board from "./components/Board.vue";
// import HelloWorld from "./components/HelloWorld.vue";
import Menubar from "./components/Menubar.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    Menubar,
    Board,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
