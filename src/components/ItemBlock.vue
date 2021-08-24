<template>
  <!-- 必ずname属性を持つと約束するオブジェクトを読み込むコンポーネント -->
  <div
    class="item-block"
    draggable="true"
    v-on:dragstart="dragItem($event, item.itemId, boxId)"
    :class="viewSizeClass"
  >
    <div class="item-block__container">
      <div>
        <p v-if="existSmallText && smallTextViewFlag" class="small-text">
          {{ item.smallText }}
        </p>
        <p>{{ item.name }}</p>
      </div>
      <div v-if="existDesc && descViewFlag" class="desc-text">
        {{ item.description }}
      </div>
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
    existSmallText() {
      return "smallText" in this.item;
    },
    smallTextViewFlag() {
      return this.$store.state.smallTextView === 1;
    },
    existDesc() {
      return "description" in this.item;
    },
    descViewFlag() {
      return this.$store.state.descView === 1;
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
  margin: 0.3rem 0.5rem;
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
  padding: 0.1rem 0.6rem;
  margin: 0.2rem 0.4rem;
}
.small .item-block__container {
  padding: 0px;
  margin: 0.1rem 0.1rem;
}
.item-block__container div p {
  margin: 0;
}
.small-text {
  font-size: 60%;
  margin-bottom: 0;
}
</style>
