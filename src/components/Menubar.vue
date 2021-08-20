<template>
  <!-- 画面上部の、アプリ名や読み込み書き出しを行うメニューバー -->
  <div id="menubar">
    <h1>Tagging Box</h1>
    <div class="menubar__tools-container">
      <file-opener />
    <add-box />
    </div>
  </div>
</template>

<script>
import FileOpener from "./FileOpener.vue";
import AddBox from "./AddBox.vue";
export default {
  name: "Menubar",
  components: {
    FileOpener,
    AddBox,
  },
};
</script>

<style>
#menubar {
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
