<template>
  <!-- 必ずname属性を持つと約束するオブジェクトを読み込むコンポーネント -->
  <div
    class="item-block"
    draggable="true"
    v-on:dragstart="dragItem($event, item.itemId, boxId)"
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
  margin: 0.2rem 0.6rem;
}
.item-block__container {
  background-color: #ee2;
  padding: 0.2rem 0.8rem;
  margin: 0.7rem 0.4rem;
}
</style>
