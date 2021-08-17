<template>
  <div id="menubar">
    <h1>Tagging Box</h1>
    <label>
      <input type="file" />
    </label>
  </div>
</template>

<script>
export default {
  name: "Menubar",
};
</script>

<style>
label > input {
  display: none;
}
label {
  padding: 0 1rem;
  border: solid 1px #888;
}
label::after {
  content: "Upload";
  font-size: 1rem;
  color: #666;
  padding-left: 1rem;
}
</style>
