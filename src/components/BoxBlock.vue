<template>
  <!-- モノを放り込むためのそれぞれの箱 -->
  <div
    id="box-block"
    :class="{ dragover: isDragOver }"
    v-on:dragover.prevent="onDrag('over')"
    v-on:dragleave="onDrag('leave')"
    v-on:drop.stop="dropItem($event, boxData.boxId)"
  >
    <p>{{ boxData.boxName }}</p>
    <div class="item-container">
      <item-block
        v-for="item of boxDataContents"
        :item="item"
        :boxId="boxData.boxId"
        :key="item.itemId"
      />
    </div>
  </div>
</template>

<script>
import ItemBlock from "./ItemBlock.vue";
export default {
  props: ["boxData"],
  data() {
    return {
      isDragOver: false,
    };
  },
  components: { ItemBlock },
  computed: {
    boxDataContents() {
      // boxIdが0のときはそのままcontentsを渡す.
      if (this.boxData.boxId === 0) {
        return this.boxData.contents;
      } else {
        const numSets = this.boxData.contents;
        const itemSets = [];
        for (let num of numSets) {
          itemSets.push(
            this.$store.state.firstData.contents.find((e) => e.itemId === num)
          );
        }
        return itemSets;
      }
    },
  },
  methods: {
    onDrag(eventType) {
      // "over"が渡されたときはtrue, それ以外のときはfalseになるようにする.
      this.isDragOver = eventType === "over";
    },
    dropItem(event, toBoxId) {
      // ここでアイテムの位置を更新する処理を書く.
      this.isDragOver = false;
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      const { itemId, fromBoxId } = data;
      // 送り先idが0か否かで場合分け
      if (toBoxId === 0) {
        if (fromBoxId !== 0) {
          this.$store.commit("removeItem", { fromBoxId, itemId });
        }
      } else {
        this.$store.commit("addItem", { toBoxId, itemId });
      }
      // const dragList = this.boxData.content.find((list) => list.id == dragId);
      // dragList.category = dropCategory;
    },
  },
};
</script>

<style>
#box-block {
  background-color: #999;
  margin: 0.9rem;
  min-height: 5rem;
}
#box-block.dragover {
  background-color: #555;
}
.item-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
