<template>
  <div id="app">
    <CheckboxList
      class="plan-selectbox"
      name="service_type"
      :options="items"
      :selected="[1,3]"
    />

  </div>
</template>

<script>
import CheckboxList from "./CheckboxList"
export default {
  name: 'app',
  data(){
    return {
      items: [{
        label: "yokie",
        value: 1
      },{
        label: "samoyed",
        value: 2
      }, {
        label: "norfolk",
        value: 3
      }]
    }
  },
  components: {
    CheckboxList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
