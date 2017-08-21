<template>
  <ul>
    <li v-for="item in items" :key="item">
      {{ item.msg }}
    </li>
    <li v-for="n in 10" :key="n" >{{ n }}</li>
  </ul>
</template>

<script>

export default {
  data: () => {
    return {
      items: [
        { msg: 'foo' },
        { msg: 'baz' }
      ]
    }
  }
}
</script>