<template>
  <!-- 自分で作れる箱が用意されるカラム（二列目（右）） -->
  <div class="box-column">
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
.box-column {
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background-color: #c8f;
}
</style>
