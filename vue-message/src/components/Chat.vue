<template>
  <div>
    <div>hello</div>

    <!-- message -->
    <template class="msg-box" v-for="(msg, i) in messages">
      <div :key="i">
        <span>{{msg.user}}</span>:<span>{{msg.message}}</span>
      </div>
      <message-box v-bind="msg" :key="i"></message-box>
    </template>
  </div>
</template>

<script>

const MessageBox = {
  template: `<div>{{ this.props }}</div>`
  
}

export default {
  components: { MessageBox },
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

