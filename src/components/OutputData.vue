<template>
  <div class="output-data">
    <button v-on:click="output">出力</button>
  </div>
</template>

<script>
export default {
  name: "OutputData",
  methods: {
    output() {
      const outputData = [this.$store.state.firstData];
      for (let box of this.$store.state.currentData) {
        outputData.push(box);
      }
      console.log(outputData);
      const contents = new Blob(
        [
          JSON.stringify({
            data: outputData,
            nextBoxId: this.$store.state.nextBoxId,
          }),
        ],
        { type: "text/plain" }
      );
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(contents);
      link.download = this.$store.state.fileName;
      link.click();
    },
  },
};
</script>
