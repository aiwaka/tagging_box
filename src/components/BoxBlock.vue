<template>
  <!-- モノを放り込むためのそれぞれの箱 -->
  <div
    class="box-block"
    :class="{ dragover: isDragOver }"
    v-on:dragover.prevent="onDrag('over')"
    v-on:dragleave="onDrag('leave')"
    v-on:drop.stop="dropItem($event, boxData.boxId)"
  >
    <div class="box-block__toolbar">
      <p v-if="!inputtingNewBoxName">
        {{ boxData.boxName }} [(debug)id:{{ boxData.boxId }}]
      </p>
      <template v-else>
        <input v-model="newBoxName" />
        <button v-on:click.prevent="renameBox(newBoxName)">決定</button>
      </template>
      <pull-down-menu ref="menu" v-on:menu-closed="inputtingNewBoxName = false">
        <pull-down-menu-list
          :list-disabled="isFirstBox"
          v-on:list-clicked="removeBox"
        >
          この箱を削除する
        </pull-down-menu-list>
        <pull-down-menu-list v-on:list-clicked="inputNewBoxName">
          名前を変更する
        </pull-down-menu-list>
        <pull-down-menu-list v-if="folded" v-on:list-clicked="unfoldBox">
          展開する
        </pull-down-menu-list>
        <pull-down-menu-list v-else v-on:list-clicked="foldBox">
          折りたたむ
        </pull-down-menu-list>
      </pull-down-menu>
    </div>
    <div v-if="!folded" class="item-container">
      <item-block
        v-for="item of boxDataContents"
        :item="item"
        :boxId="boxData.boxId"
        :key="item.itemId"
      />
    </div>
    <!-- 折りたたまれている場合はプレビュー表示する. -->
    <div v-else class="item-container folded">
      <div class="folded-item-thumbnail">x{{ boxDataContents.length }}</div>
    </div>
  </div>
</template>

<script>
import ItemBlock from "./ItemBlock.vue";
import PullDownMenu from "./PullDownMenu.vue";
import PullDownMenuList from "./PullDownMenuList.vue";
export default {
  components: { ItemBlock, PullDownMenu, PullDownMenuList },
  props: ["boxData"],
  data() {
    return {
      isDragOver: false,
      inputtingNewBoxName: false,
      newBoxName: "",
      folded: false,
    };
  },
  computed: {
    isFirstBox() {
      return this.boxData.boxId === 0;
    },
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
    closeMenu() {
      this.$refs.menu.close();
    },
    foldBox() {
      this.folded = true;
      this.closeMenu();
    },
    unfoldBox() {
      this.folded = false;
      this.closeMenu();
    },
    removeBox() {
      this.closeMenu();
      this.$store.commit("removeBox", { boxId: this.boxData.boxId });
    },
    inputNewBoxName() {
      this.newBoxName = this.boxData.boxName;
      this.inputtingNewBoxName = true;
    },
    renameBox(newName) {
      this.$store.commit("renameBox", { boxId: this.boxData.boxId, newName });
      this.inputtingNewBoxName = false;
      this.closeMenu();
    },
  },
};
</script>

<style>
.box-block {
  background-color: #999;
  margin: 0.9rem;
  height: auto;
  min-height: 5rem;
}
.box-block.dragover {
  background-color: #555;
}
.box-block__toolbar {
  display: flex;
  justify-content: space-around;
}
.item-container {
  display: flex;
  flex-wrap: wrap;
}
.folded-item-thumbnail {
  background-color: #ee2;
  padding: 0.2rem 0.8rem;
  margin: 0.7rem 0.4rem;
}
</style>
