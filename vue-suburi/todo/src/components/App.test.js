import Vue from 'vue'
import App from './App.vue'
import assert from 'assert'

it('does not crash', () => {
  const Ctor = Vue.extend(App)
  const vm = new Ctor().$mount()
  assert(/Welcome to Vue\.js/.test(vm.$el.textContent))
})
