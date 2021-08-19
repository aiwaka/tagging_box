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
      console.log(firstData);
      state.firstData = firstData;
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
