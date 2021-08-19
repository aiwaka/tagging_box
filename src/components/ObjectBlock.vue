<template>
  <!-- 必ずname属性を持つと約束するオブジェクトを読み込むコンポーネント -->
  <div id="object-block">
    <div class="object-block_container">
      <p>{{ obj.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObjectBlock",
  props: ["obj"],
};
</script>

<style>
.object-block_container {
  background-color: #ee2;
  padding: 0.2rem 1.2rem;
  margin: 0.7rem 2rem;
}
</style>
