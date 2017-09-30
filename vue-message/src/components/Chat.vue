<template>
  <div>
    <div>hello</div>

    <!-- message -->
    <template class="msg-box" v-for="(msg, i) in messages">
      <div :key="i">
        <span>{{msg.user}}</span>:<span>{{msg.message}}</span>
      </div>
    </template>

  </div>
</template>

<script>

export default {
  // components: { MessageBox },
  data: () => {
    return {
      messages: [{
        id: 1,
        user: "foo",
        message: "Hello"
      }]
    }
  }
}
</script>

