import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faMinus, faFileImport, faArrowRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons'

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import store from "./store"

library.add(faPlus, faMinus, faFileImport, faArrowRotateLeft, faXmark)

createApp(App)
.use(Antd)
.use(store)
.use(PerfectScrollbar)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

