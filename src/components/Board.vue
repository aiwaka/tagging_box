<template>
  <!-- 作業ボードコンポーネント -->
  <div id="board">
    <first-data-column />
    <box-column />
  </div>
</template>

<script>
import FirstDataColumn from "./FirstDataColumn.vue";
import BoxColumn from "./BoxColumn.vue";
export default {
  components: {
    FirstDataColumn,
    BoxColumn,
  },
};
</script>

<style>
#board {
  width: calc(100% - 1rem);
  height: calc(100vh - 14rem);
  margin: 0.4rem 0.5rem;
  display: flex;
}
</style>
