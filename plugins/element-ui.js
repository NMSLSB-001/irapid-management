// element-ui.js
import Vue from 'vue'
import {
  Dialog, Button, MessageBox
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Dialog,
  Button
]

const Element = {
  install (Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })
Vue.prototype.$eleconfirm = MessageBox.confirm
