<template>
  <!-- ファイル読み込みコンポーネント -->
  <div id="file-opener">
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
      <p v-else>{{ file_name }}を読み込みました。</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      isDragOver: false,
      uploadedJSON: "",
      file_name: "",
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
      this.file_name = files[0].name;
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
      if (!Array.isArray(loadedData)) {
        alert(
          "データの形式が誤っています。name属性を持つオブジェクトの配列である必要があります。"
        );
      }
      // dataが初回形式のときと2回目以降の場合で分ける.
      // nextBoxIdプロパティが含まれていれば一度保存されたものと判断する.
      if ("nextBoxId" in loadedData) {
        this.$store.commit("setSavedData", { loadedData });
      } else {
        // そうでなければ, オブジェクトにnameプロパティがあるか判断
        if ("name" in loadedData[0]) {
          this.$store.commit("setFirstData", { firstData: loadedData });
        } else {
          alert(
            "データの形式が誤っています。name属性を持つオブジェクトの配列である必要があります。"
          );
        }
      }
    },
  },
};
</script>

<style>
#file-opener {
  background-color: #eee;
  width: 50%;
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
