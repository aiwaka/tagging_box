<template>
  <div class="add-box">
    <input v-model="newBoxName" placeholder="input new box name." />
    <p>id:{{ newBoxId }}</p>
    <button v-on:click="addNewBox(newBoxName)" :disabled="disabled">Add</button>
  </div>
</template>

<script>
export default {
  name: "AddBox",
  data: function () {
    return {
      newBoxName: "",
    };
  },
  computed: {
    newBoxId() {
      return this.$store.state.nextBoxId;
    },
    disabled() {
      return !this.$store.state.fileLoaded;
    },
  },
  methods: {
    addNewBox(name) {
      if (!name) {
        alert("名前を入力してください。");
        return;
      }
      this.$store.commit("addNewBox", { name });
    },
  },
};
</script>
