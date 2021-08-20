<template>
  <div class="output-data">
    <pulldown-menu ref="menu">
      <pull-down-menu-list v-on:list-clicked="outputAsAppData">
        このアプリの形式で出力
      </pull-down-menu-list>
      <pull-down-menu-list v-on:list-clicked="outputAsTaggedData">
        タグ付けモードで出力
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
      this.downloadFile(contents);
    },
    outputAsTaggedData() {
      alert(
        "ここで書き出されたファイルは再読み込みできません。再度作業をする際は必ずこのアプリの形式で保存してください。"
      );
      const itemArray = [];
      console.log(this.$store.state.itemData);
      for (let item of this.$store.state.itemData) {
        const itemData = new Object({ name: item.name, tags: [] });
        for (let box of this.$store.state.boxData.slice(1)) {
          if (box.contents.indexOf(item.itemId) !== -1) {
            itemData.tags.push(box.boxName);
          }
        }
        itemArray.push(itemData);
      }
      const contents = new Blob([JSON.stringify(itemArray)], {
        type: "text/plain",
      });
      this.downloadFile(contents);
    },
    downloadFile(contents) {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(contents);
      link.download = this.$store.state.fileName;
      link.click();
      this.$refs.menu.close();
    },
  },
};
</script>
