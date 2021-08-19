import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    firstData: Array,
    currentData: Object,
  },
  mutations: {
    setFirstData(state, { firstData }) {
      if (!("itemId" in firstData[0])) {
        // itemIdプロパティを持っていない場合番号を付与する
        let i = 0;
        for (let item of firstData) {
          item.itemId = i++;
        }
      }
      state.firstData = {
        boxId: 0,
        boxName: "firstData",
        contents: firstData,
      };
      console.log(state.firstData);
      state.currentData = {};
    },
    setSavedData(state, { data }) {
      console.log(data);
      state.firstData = data.firstData;
      state.currentData = data.savedData;
    },
  },
  actions: {},
  modules: {},
});
