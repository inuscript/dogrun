<template>
  <div class="checkbox-list">
    <template v-for="item in list" >
      <div class="checkbox-item" :key="item.value">
        <checkbox-item
          v-model="input"
          :name="checkboxName"
          :value="item.value"
          :label="item.label"
          :checked="isChecked(item.value)"
          :onChange="onChange"
        />
      </div>
    </template>
  </div>
</template>

<script>
import CheckboxItem from './CheckboxItem'

export default {
  name: 'checkbox-list',
  props: {
    name: String,
    list: Array,
    defaultValues: Array, // 初期値でtrueになるvalueを格納する配列
    onChange: Function
  },
  computed: {
    checkboxName: function () {
      return `${this.name}[]`
    },
  },
  data(){
    return {
      input: {}
    }
  },
  methods: {
    isChecked (targetValue) {
      if (!this.defaultValues) {
        return false
      }
      return (this.defaultValues.indexOf(targetValue.toString()) > -1)
    },
    checked(){
      return this.checkState
    },
    onChange(e){
      this.checkState[e.value] = e
    }
  },
  components: {
    CheckboxItem,
  }
}
</script>

<style scoped>
.checkbox-list{
  display: flex;
}
.checkbox-item{
  margin: 0 4px;
}

@media (--sp){
  .checkbox-list{
    flex-wrap: wrap;
  }
  .checkbox-item{
    margin: 2px 4px;
  }
}
</style>
