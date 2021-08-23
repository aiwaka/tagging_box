import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileLoaded: false,
    itemViewSize: 1,
    boxViewSize: 1,
    itemData: [],
    boxData: [{ boxId: 0, boxName: "init", contents: [], folded: false }],
    nextBoxId: 1,
    fileName: "output.json",
  },
  mutations: {
    setItemViewSize(state, { value }) {
      state.itemViewSize = value;
    },
    setBoxViewSize(state, { value }) {
      state.boxViewSize = value;
    },

    setFirstData(state, { firstData, fileName }) {
      if (!("itemId" in firstData[0])) {
        // itemIdプロパティを持っていない場合番号を付与する
        let i = 0;
        for (let item of firstData) {
          item.itemId = i++;
        }
      }
      const idArray = [];
      for (let item of firstData) {
        idArray.push(item.itemId);
      }
      state.itemData = firstData;
      state.boxData = [
        {
          boxId: 0,
          boxName: fileName,
          contents: idArray,
          folded: false,
        },
      ];
      state.nextBoxId = 1;
      state.fileLoaded = true;
      state.fileName = "output.json";
    },
    setSavedData(state, { loadedData, fileName }) {
      state.itemData = loadedData.itemData;
      state.boxData = loadedData.boxData;
      state.nextBoxId = loadedData.nextBoxId;
      state.fileLoaded = true;
      state.fileName = fileName;
    },

    addNewBox(state, { name }) {
      state.boxData.push({
        boxId: state.nextBoxId++,
        boxName: name,
        contents: [],
        folded: false,
      });
    },
    removeBox(state, { boxId }) {
      if (boxId !== 0) {
        const boxIdx = state.boxData.findIndex((e) => e.boxId === boxId);
        state.boxData = state.boxData.filter((box) => box.boxId !== boxId);
        state.foldedBox.splice(boxIdx, 1);
      }
    },
    renameBox(state, { boxId, newName }) {
      state.boxData[state.boxData.findIndex((e) => e.boxId === boxId)].boxName =
        newName;
    },
    swapBox(state, { fromBoxId, toBoxId }) {
      const fromIdx = state.boxData.findIndex((e) => e.boxId === fromBoxId);
      const toIdx = state.boxData.findIndex((e) => e.boxId === toBoxId);
      if (fromIdx === -1 || toIdx === -1) {
        return;
      }
      state.boxData = state.boxData.reduce(
        (acc, cur, i, src) => [
          ...acc,
          i === fromIdx ? src[toIdx] : i === toIdx ? src[fromIdx] : cur,
        ],
        []
      );
    },
    foldBox(state, { boxId }) {
      state.boxData[
        state.boxData.findIndex((e) => e.boxId === boxId)
      ].folded = true;
    },
    unfoldBox(state, { boxId }) {
      state.boxData[
        state.boxData.findIndex((e) => e.boxId === boxId)
      ].folded = false;
    },

    addItem(state, { toBoxId, itemId }) {
      const box =
        state.boxData[state.boxData.findIndex((e) => e.boxId === toBoxId)];
      box.contents.push(itemId);
      // 重複は取り除く.
      box.contents = box.contents.filter((e, i, self) => self.indexOf(e) === i);
    },
    removeItem(state, { fromBoxId, itemId }) {
      const box =
        state.boxData[state.boxData.findIndex((e) => e.boxId === fromBoxId)];
      box.contents = box.contents.filter((e) => e !== itemId);
    },
  },
  actions: {},
  modules: {},
});
