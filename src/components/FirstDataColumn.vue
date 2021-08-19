<template>
  <!-- 元データが入った箱が置かれるカラム（一列目（左）） -->
  <div id="first-data-column">
    <div>
      <h2>元データ</h2>
    </div>
    <div class="first-data-column__container">
      <object-block v-for="item of dataList" :obj="item" :key="item.name">
        {{ item.name }}
      </object-block>
    </div>
  </div>
</template>

<script>
// import BoxBlock from "./BoxBlock.vue";
import ObjectBlock from "./ObjectBlock.vue";
export default {
  name: "FirstDataColumn",
  components: {
    ObjectBlock,
    // BoxBlock,
  },
  computed: {
    dataList() {
      return this.$store.state.firstData;
    },
  },
};
</script>

<style>
#first-data-column {
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
.first-data-column__container {
  width: 98%;
  margin: 0.5rem 1%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #faf;
}
</style>
