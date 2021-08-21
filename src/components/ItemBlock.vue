<template>
  <!-- 必ずname属性を持つと約束するオブジェクトを読み込むコンポーネント -->
  <div
    class="item-block"
    draggable="true"
    v-on:dragstart="dragItem($event, item.itemId, boxId)"
    :class="viewSizeClass"
  >
    <div class="item-block__container">
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemBlock",
  props: ["item", "boxId"],
  computed: {
    itemViewSize() {
      return this.$store.state.itemViewSize;
    },
    viewSizeClass() {
      return {
        small: this.itemViewSize === 0,
        middle: this.itemViewSize === 1,
        large: this.itemViewSize === 2,
      };
    },
  },
  methods: {
    dragItem(event, itemId, boxId) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ itemId, fromBoxId: boxId })
      );
    },
  },
};
</script>

<style>
.item-block {
  margin: 0.4rem 0.6rem;
}
.item-block.small {
  width: 3.5rem;
  font-size: 0.5rem;
}
.item-block.middle {
  width: 6rem;
  font-size: 0.8rem;
}
.item-block.large {
  width: 7.5rem;
  font-size: 1.2rem;
}
.item-block__container {
  border: 4px ridge #880;
  background-color: #ee2;
  padding: 0.1rem 0.8rem;
  margin: 0.2rem 0.4rem;
}
.small .item-block__container {
  padding: 0px;
  margin: 0.1rem 0.1rem;
}
</style>
