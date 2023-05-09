// element-ui.js
import Vue from 'vue'
import {
  Dialog,
  Button,
  MessageBox,
  Form,
  FormItem,
  Input,
  Select,
  Option
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [Dialog, Button, Form, FormItem, Input, Select, Option]

const Element = {
  install (Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })
Vue.prototype.$eleconfirm = MessageBox.confirm
