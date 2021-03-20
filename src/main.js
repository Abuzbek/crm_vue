import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from './components/app/Loader'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min' 

import firebase from 'firebase/app'
import 'firebase/auth' 
import 'firebase/database' 
Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyC76vY0wNEquurFlhDhZF0Aojf--qJ9rlQ",
  authDomain: "vue-crm-c99a3.firebaseapp.com",
  projectId: "vue-crm-c99a3",
  storageBucket: "vue-crm-c99a3.appspot.com",
  messagingSenderId: "733345308426",
  appId: "1:733345308426:web:47de57da99ac4519f7e4f3",
  measurementId: "G-JLDCH2TLCW"
};
firebase.initializeApp(firebaseConfig)
let app ;
firebase.auth().onAuthStateChanged(()=>{
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

