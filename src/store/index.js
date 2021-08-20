import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileLoaded: false,
    itemData: [],
    boxData: [{ boxId: 0, boxName: "init", contents: [] }],
    nextBoxId: 1,
    fileName: "output.json",
  },
  mutations: {
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
        },
      ];
      state.nextBoxId = 1;
      state.fileLoaded = true;
      state.fileName = "output.json";
      console.log(state.itemData);
      console.log(state.boxData);
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
      });
    },
    removeBox(state, { boxId }) {
      if (boxId !== 0) {
        state.boxData = state.boxData.filter((box) => box.boxId !== boxId);
      }
    },
    renameBox(state, { boxId, newName }) {
      state.boxData[state.boxData.findIndex((e) => e.boxId === boxId)].boxName =
        newName;
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
