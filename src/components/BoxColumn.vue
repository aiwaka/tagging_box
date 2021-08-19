<template>
  <!-- 自分で作れる箱が用意されるカラム（二列目（右）） -->
  <div id="box-column">
    <div>
      <h2>箱</h2>
    </div>
    <div class="box-column__container">
      <box-block v-for="box of boxes" :boxData="box" :key="box.name" />
    </div>
  </div>
</template>

<script>
import BoxBlock from "./BoxBlock.vue";
export default {
  computed: {
    boxes() {
      return this.$store.state.currentData;
    },
  },
  components: { BoxBlock },
};
</script>

<style>
#box-column {
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
.box-column__container {
  display: flex;
  flex-wrap: wrap;
  width: calc(50% - 1rem);
  margin: 2rem 0.5rem;
  background-color: #faf;
}
</style>
