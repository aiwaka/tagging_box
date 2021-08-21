<template>
  <!-- 画面上部の、アプリ名や読み込み書き出しを行うメニューバー -->
  <div class="menubar">
    <div class="menubar__tools-container">
      <file-opener />
      <add-box />
      <output-data />
      <view-size-switch />
    </div>
  </div>
</template>

<script>
import FileOpener from "./FileOpener.vue";
import AddBox from "./AddBox.vue";
import OutputData from "./OutputData.vue";
import ViewSizeSwitch from "./ViewSizeSwitch.vue";
export default {
  name: "Menubar",
  components: {
    FileOpener,
    AddBox,
    OutputData,
    ViewSizeSwitch,
  },
};
</script>

<style>
.menubar {
  width: calc(100% - 2rem);
  height: 10rem;
  margin: 0 1rem;
}
.menubar__tools-container {
  width: 100%;
  height: 9rem;
  display: flex;
}
</style>
