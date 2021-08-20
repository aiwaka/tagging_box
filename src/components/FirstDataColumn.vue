<template>
  <!-- 元データが入った箱が置かれるカラム（一列目（左）） -->
  <div class="first-data-column">
    <div>
      <h2>元データ</h2>
    </div>
    <box-block :boxData="firstData" />
  </div>
</template>

<script>
import BoxBlock from "./BoxBlock.vue";
export default {
  name: "FirstDataColumn",
  components: {
    BoxBlock,
  },
  computed: {
    firstData() {
      return this.$store.state.firstData;
    },
  },
};
</script>

<style>
.first-data-column {
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background-color: #faf;
}
</style>
