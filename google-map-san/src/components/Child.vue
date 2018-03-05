<template>
  <div>child</div>
</template>

<script>
export default {
  inject: ["google"], //, "map"]
  mounted(){
    console.log(this.google)
  }
}
</script>

