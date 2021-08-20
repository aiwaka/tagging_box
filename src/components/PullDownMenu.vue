<template>
  <!-- プルダウンメニューの箱コンポーネント。使うときはslotにPullDownMenuListを入れる. -->
  <div class="pull-down-menu">
    <div class="toggle-button" v-if="!opened" v-on:click.prevent="toggle">
      {{ buttonText }}
    </div>
    <div class="toggle-button" v-else v-on:click.prevent="close">x</div>
    <div v-if="opened" class="menu-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PullDownMenu",
  props: {
    buttonText: {
      default: "-",
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    close() {
      this.opened = false;
      this.$emit("menu-closed");
    },
  },
};
</script>

<style>
.pull-down-menu {
  position: relative;
  right: 0.2rem;
}
.toggle-button {
  position: absolute;
  right: 0;
  min-width: 1rem;
  height: 1rem;
  line-height: 1rem;
  cursor: pointer;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  user-select: none;
}
.menu-container {
  position: relative;
  z-index: 100;
  height: 1rem;
  top: 1rem;
  padding: 0;
}
</style>
