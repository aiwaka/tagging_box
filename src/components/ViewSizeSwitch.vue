<template>
  <div class="view-size-switch">
    <div class="item-size-switch">
      <h3>アイテムサイズ変更</h3>
      <div class="switch-container">
        <div class="size-button" :class="{ active: activeSize === 0 }">大</div>
        <div class="size-button" :class="{ active: activeSize === 1 }">中</div>
        <div class="size-button" :class="{ active: activeSize === 2 }">小</div>
      </div>
    </div>
    <div class="box-size-switch">
      <h3>箱サイズ変更</h3>
      <div class="switch-container">
        <div class="size-button" :class="{ active: activeBox === 0 }">大</div>
        <div class="size-button" :class="{ active: activeBox === 1 }">中</div>
        <div class="size-button" :class="{ active: activeBox === 2 }">小</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewSizeSwitch",
  data() {
    return {
      activeSize: 1,
      activeBox: 1,
    };
  },
};
</script>

<style scoped>
.view-size-switch {
  display: flex;
  flex-direction: column;
}
.switch-container {
  display: flex;
  padding: 0;
}
.size-button {
  margin: 0;
  background-color: #bbb;
}
.size-button.active {
  background-color: #444;
}
</style>
