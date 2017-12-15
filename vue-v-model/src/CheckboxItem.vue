<template>
  <div class="checkbox-item">
    <label>
      <input type="checkbox" :value="value" :name="name" :checked="checked" @change="onChange" />
      <span>{{label}}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: String | Number,
    label: String,
    name: String,
    checked: Boolean,
    onChange: Function
  }
}
</script>

<style scoped>
.checkbox-item{
  font-size: 0.8em;
  display: inline-block;
  padding: 1.2em;
  white-space: nowrap;
  min-width: 80px; /* TODO: これ外出したほうが良いかも？*/
  border-radius: 8px;
  /* TODO: color */
  border: #ddd solid 1px;
}
</style>
