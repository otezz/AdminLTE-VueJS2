import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'

import routes from './routes'
import store from './store'

// Resource logic
Vue.use(Resource)
Vue.http.options.emulateJSON = true

Vue.use(VueRouter)

// Import top level component
import App from './App.vue'

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.token !== window.localStorage.getItem('token')) {
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && (store.state.token === null)) {
    next('/login')
  } else if ((store.state.token !== null) && to.path === '/login') {
    next('/dashboard')
  } else {
    next()
  }
})

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

require('bootstrap')
require('admin-lte')
require('../node_modules/admin-lte/dist/js/demo.js')
