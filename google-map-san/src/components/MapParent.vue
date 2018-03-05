<template>
  <div>
    <slot />
  </div>
</template>

<script>
import Child from './Child'

export default {
  props: {
    google: Object
  },
  props: {
    makers: Array
  },

  components: {
    Child
  },
  provide() {
    return {
      google: this.google,
    }
  }
}
</script>
