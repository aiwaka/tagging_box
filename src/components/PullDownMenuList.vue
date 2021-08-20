<template>
  <!--
    プルダウンメニューのリストコンポーネント. テキストをslotに入れる.
    listDisabledでクリック不可を設定可能. クリックされるとlist-clickedを発火する.
  -->
  <div
    class="pull-down-menu-list"
    :class="{ disabled: listDisabled }"
    v-on:click.prevent="clicked"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PullDownMenuList",
  props: ["listDisabled"],
  methods: {
    clicked() {
      if (!this.listDisabled) {
        this.$emit("list-clicked");
      }
    },
  },
};
</script>

<style>
.pull-down-menu-list {
  border: 1px solid #333;
  background-color: #aaa;
}
.pull-down-menu-list:hover {
  background-color: #fff;
}
.pull-down-menu-list.disabled {
  color: #888;
}
</style>
