<template>
  <!-- モノを放り込むためのそれぞれの箱 -->
  <div id="box-block">
    <object-block v-for="item of boxData.contents" :key="item.name" />
  </div>
</template>

<script>
import ObjectBlock from "./ObjectBlock.vue";
export default {
  props: ["boxData"],
  components: { ObjectBlock },
};
</script>
