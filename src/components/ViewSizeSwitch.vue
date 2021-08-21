<template>
  <div class="view-size-switch">
    <div class="switch-container">
      <h3>アイテムサイズ変更</h3>
      <div class="switch-box">
        <div
          v-for="(text, index) of labelText"
          class="size-button"
          :class="{ active: activeItemSize === index }"
          :key="index"
          v-on:click.prevent="setItemViewSize(index)"
        >
          {{ text }}
        </div>
      </div>
    </div>
    <div class="switch-container">
      <h3>箱サイズ変更</h3>
      <div class="switch-box">
        <div
          v-for="(text, index) of labelText"
          class="size-button"
          :class="{ active: activeBoxSize === index }"
          :key="index"
          v-on:click.prevent="setBoxViewSize(index)"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewSizeSwitch",
  data() {
    return {
      labelText: ["小", "中", "大"],
    };
  },
  computed: {
    activeItemSize() {
      return this.$store.state.itemViewSize;
    },
    activeBoxSize() {
      return this.$store.state.boxViewSize;
    },
  },
  methods: {
    setItemViewSize(value) {
      this.$store.commit("setItemViewSize", { value });
    },
    setBoxViewSize(value) {
      this.$store.commit("setBoxViewSize", { value });
    },
  },
};
</script>

<style>
h3 {
  font-size: 0.5rem;
}
.view-size-switch {
  display: flex;
  flex-direction: column;
}
.switch-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.switch-box {
  display: flex;
  padding: 0;
  margin: 0 auto;
}
.size-button {
  margin: 0;
  background-color: #bbb;
  cursor: pointer;
}
.size-button.active {
  background-color: #444;
  color: #ddd;
}
</style>
