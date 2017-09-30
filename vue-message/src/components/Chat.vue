<template>
  <div>
    <div>hello</div>

    <!-- message -->
    <div class="msg-box" v-for="msg in messages">
      <span>{{msg.user}}</span>:<span>{{msg.message}}</span>
    </div>

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

