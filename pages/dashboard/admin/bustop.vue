<template>
  <div>
    <div>
      <a-row :gutter="16" type="flex" justify="start">
        <a-col v-for="(item, index) in bustopList" :key="index" :span="8">
          <a-card hoverable style="width: 300px">
            <img
              slot="cover"
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            >
            <template slot="actions">
              <a-icon key="setting" type="setting" />
              <a-icon key="edit" type="edit" @click="showUpdateDrawer" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta
              :title="'Bus Route: Line ' + item['routes']"
              description="This is the description"
            >
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-button type="primary" @click="showAddDrawer">
        <a-icon type="plus" /> New Bus Route
      </a-button>
      <a-drawer
        title="Add a new bus route"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="busRouteForm" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Bus Route Name">
                <a-input
                  v-decorator="[
                    'routes',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter bus route name'
                        }
                      ]
                    }
                  ]"
                  addon-before="Line"
                  placeholder="Please enter bus route name"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Route Type">
                <a-select
                  v-decorator="[
                    'routesType',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please choose the type'
                        }
                      ]
                    }
                  ]"
                  placeholder="Please choose the type"
                >
                  <a-select-option value="linear-line">
                    Linear line
                  </a-select-option>
                  <a-select-option value="loop-line">
                    Loop Line
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Description">
                <a-textarea
                  v-decorator="[
                    'description',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter bus route/line description'
                        }
                      ]
                    }
                  ]"
                  :rows="4"
                  placeholder="Please enter bus route/line description"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-form
          id="components-form-demo-normal-login"
          :form="busStopForm"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item
                v-for="(k, index) in busStopForm.getFieldValue('keys')"
                :key="k"
                v-bind="
                  index === 0 ? formItemLayout : formItemLayoutWithOutLabel
                "
                :label="index === 0 ? 'Bus Stop/Station' : ''"
                :required="false"
              >
                <a-input
                  v-decorator="[
                    `names[${k}]`,
                    {
                      validateTrigger: ['change', 'blur'],
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message:
                            'Please input Bus Stop\'s name or delete this field.'
                        }
                      ]
                    }
                  ]"
                  placeholder="Bus Stop Name"
                  style="width: 60%; margin-right: 8px"
                />
                <a-icon
                  v-if="busStopForm.getFieldValue('keys').length > 1"
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  :disabled="busStopForm.getFieldValue('keys').length === 1"
                  @click="() => remove(k)"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayoutWithOutLabel">
                <a-button type="dashed" style="width: 60%" @click="add">
                  <a-icon type="plus" /> Add Bus Stop
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '20px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="handleSubmit">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>
let id = 0
export default {
  name: 'BustopPage',
  data () {
    return {
      collapsed: false,
      bustopListCount: 0,
      bustopList: [],
      busRouteForm: this.$form.createForm(this),
      visible: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    }
  },
  beforeCreate () {
    this.busStopForm = this.$form.createForm(this, {
      name: 'dynamic_form_item'
    })
    this.busStopForm.getFieldDecorator('keys', {
      initialValue: [],
      preserve: true
    })
  },
  created () {},
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await this.$indexApi.getBustopList()
      if (res.body !== null) {
        const items = res.body
        console.log('items' + JSON.stringify(items))
        this.bustopListCount = items.Count
        this.bustopList = items.Items
      }
    },
    showUpdateDrawer () {
      this.visible = true
      this.$nextTick(() => {
        this.busRouteForm.setFieldsValue({
          routes: '1',
          routesType: 'linear-line',
          description: '1'
        })
      })
    },
    showAddDrawer () {
      this.visible = true
      this.$nextTick(() => {
        this.busRouteForm.setFieldsValue({
          routes: '',
          routesType: '',
          description: ''
        })
      })
    },
    onClose () {
      this.visible = false
    },
    remove (k) {
      const { busStopForm } = this
      // can use data-binding to get
      const keys = busStopForm.getFieldValue('keys')
      // We need at least one passenger
      if (keys.length === 1) {
        return
      }

      // can use data-binding to set
      busStopForm.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },
    add () {
      const { busStopForm } = this
      // can use data-binding to get
      const keys = busStopForm.getFieldValue('keys')
      const nextKeys = keys.concat(id++)
      // can use data-binding to set
      // important! notify form to detect changes
      busStopForm.setFieldsValue({
        keys: nextKeys
      })
    },
    //
    handleSubmit (e) {
      e.preventDefault()
      this.busRouteForm.validateFields((err, values) => {
        if (!err) {
          const { keys, names } = values
          console.log('Received values of form: ', values)
          console.log(
            'Merged values:',
            keys.map(key => names[key])
          )
        }
      })
    },
    openNotification (eventName) {
      const placement = 'bottomLeft'
      this.$notification.success({
        message: ` ${eventName}`,
        description: 'Add successful',
        placement,
        duration: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
