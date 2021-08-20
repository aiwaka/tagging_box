<template>
  <div class="output-data">
    <pulldown-menu>
      <pull-down-menu-list v-on:list-clicked="outputAsAppData">
        出力
      </pull-down-menu-list>
      <pull-down-menu-list v-on:list-clicked="outputAsTaggedData">
        出力
      </pull-down-menu-list>
    </pulldown-menu>
  </div>
</template>

<script>
import PulldownMenu from "./PullDownMenu.vue";
import PullDownMenuList from "./PullDownMenuList.vue";
export default {
  components: { PulldownMenu, PullDownMenuList },
  name: "OutputData",
  methods: {
    outputAsAppData() {
      const contents = new Blob(
        [
          JSON.stringify({
            itemData: this.$store.state.itemData,
            boxData: this.$store.state.boxData,
            nextBoxId: this.$store.state.nextBoxId,
          }),
        ],
        { type: "text/plain" }
      );
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(contents);
      link.download = this.$store.state.fileName;
      link.click();
    },
    outputAsTaggedData() {},
  },
};
</script>
