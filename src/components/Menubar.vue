<template>
  <!-- 画面上部の、アプリ名や読み込み書き出しを行うメニューバー -->
  <div id="menubar">
    <h1>Tagging Box</h1>
    <file-opener />
  </div>
</template>

<script>
import FileOpener from "./FileOpener.vue";
export default {
  name: "Menubar",
  components: {
    FileOpener,
  },
};
</script>

<style>
#menubar {
  width: calc(100% - 2rem);
  height: 10rem;
  margin: 0 1rem;
}
</style>
