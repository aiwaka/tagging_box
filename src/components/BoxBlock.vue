<template>
  <!-- モノを放り込むためのそれぞれの箱 -->
  <div id="box-block">
    <item-block
      v-for="item of boxData.contents"
      :item="item"
      :key="item.name"
      draggable="true"
    />
  </div>
</template>

<script>
import ItemBlock from "./ItemBlock.vue";
export default {
  props: ["boxData"],
  components: { ItemBlock },
};
</script>

<style>
#box-block {
  background-color: #999;
  display: flex;
  flex-wrap: wrap;
  margin: 0.9rem;
}
</style>
