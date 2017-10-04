import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Chat from "@/components/Chat"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat
    }
  ]
})
