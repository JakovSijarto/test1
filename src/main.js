import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import StripeCheckout from "vue-stripe-checkout";

createApp(App).use(StripeCheckout).mount('#app')
