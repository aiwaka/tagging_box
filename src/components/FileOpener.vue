<template>
  <!-- ファイル読み込みコンポーネント -->
  <div class="file-opener">
    <div
      class="input-field"
      :class="{ over: isDragOver }"
      v-on:dragover.prevent="onDrag('over')"
      v-on:dragleave="onDrag('leave')"
      v-on:drop.stop="onDrop"
    >
      <input type="file" title v-on:change="onFileChange" />
      <p v-if="!uploadedJSON">
        クリックして読み込か、ドラッグアンドドロップしてください。
      </p>
      <p v-else>{{ fileName }}を読み込みました。</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isDragOver: false,
      uploadedJSON: "",
      fileName: "",
    };
  },
  methods: {
    onDrag(eventType) {
      // "over"が渡されたときはtrue, それ以外のときはfalseになるようにする.
      this.isDragOver = eventType === "over";
    },
    onDrop(event) {
      this.isDragOver = false;
      const files = event.dataTransfer.files;
      if (files.length !== 1 || files[0].type.indexOf("json") === -1) {
        alert("データはJSON形式である必要があります。");
        return;
      }
      this.createData(files[0]);
    },
    onFileChange(event) {
      const files = event.target.files;
      if (files.length !== 1 || files[0].type.indexOf("json") === -1) {
        alert("データはJSON形式である必要があります。");
        return;
      }
      this.createData(files[0]);
      this.fileName = files[0].name;
    },
    createData(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.uploadedJSON = event.target.result;
        this.setData(this.uploadedJSON);
      };
      reader.readAsText(file);
    },
    setData(contents) {
      const loadedData = JSON.parse(contents);
      // dataが初回形式のときと2回目以降の場合で分ける.
      // itemData, boxData, nextBoxIdプロパティが含まれていれば一度保存されたものと判断する.
      if (
        "itemData" in loadedData &&
        "boxData" in loadedData &&
        "nextBoxId" in loadedData
      ) {
        this.$store.commit("setSavedData", {
          loadedData,
          fileName: this.fileName,
        });
        return;
      } else if ("name" in loadedData[0]) {
        // そうでなければ, オブジェクトにnameプロパティがあるか判断
        this.$store.commit("setFirstData", {
          firstData: loadedData,
          fileName: this.fileName,
        });
      } else {
        alert(
          "データの形式が誤っています。name属性を持つオブジェクトの配列である必要があります。"
        );
      }
    },
  },
};
</script>

<style>
.file-opener {
  background-color: #eee;
  width: 25%;
  height: auto;
  display: flex;
  justify-content: center;
}
.input-field {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-field.over {
  background-color: #777;
}
.input-field > input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
