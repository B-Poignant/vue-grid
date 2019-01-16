import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import Notifications from 'vue-notification'
import i18n from './plugins/i18n'

Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    i18n,
    render: h => h(App)
})