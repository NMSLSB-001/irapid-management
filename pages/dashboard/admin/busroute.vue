<template>
  <div>
    <div>
      <a-row :gutter="16" type="flex" justify="start">
        <a-col
          v-for="(item, index) in bustopList"
          :key="index"
          v-model="bustopList"
          :span="8"
        >
          <a-card hoverable style="width: 300px" :loading="loading">
            <img
              slot="cover"
              alt="example"
              :src="coverSrc"
              :loading="loading"
            >
            <template slot="actions">
              <a-icon
                key="view"
                type="eye"
                @click="handleClose()"
              />
              <a-icon
                key="edit"
                type="edit"
                @click="showUpdateBusRouteDrawer(item)"
              />
              <a-icon
                key="delete"
                type="delete"
                @click="showDeleteBusRoute(item)"
              />
            </template>
            <a-card-meta
              :title="'Bus Route: Line ' + item['routes']"
              :description="item['description']"
            >
              <a-avatar slot="avatar" :src="avatarSrc" />
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <a-button type="primary" @click="showAddBusRouteDrawer">
        <a-icon type="plus" /> New Bus Route
      </a-button>
      <a-button type="primary" @click="test">
        <a-icon type="plus" /> test
      </a-button>
    </div>
    <div>
      <a-drawer
        :title="formTitle"
        :width="720"
        :visible="drawerVisible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onDrawerClose"
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
                  :disabled="formItemDisabled"
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
                  v-show="busStopForm.getFieldValue('keys').length > 1"
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
          <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose">
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
  name: 'BusRoutePage',
  data () {
    return {
      collapsed: false,
      bustopListCount: 0,
      bustopList: [
        {
          routes: '',
          routesType: '',
          description: ''
        }
      ],
      coverSrc: require('@/static/images/iRapid.png'),
      avatarSrc: require('@/static/images/bus.svg'),
      loading: true,
      busRouteForm: this.$form.createForm(this),
      formTitle: 'Add a new bus route',
      formItemDisabled: false,
      formItemButton: 'Submit',
      formActivity: 'add',
      dialogVisible: false,
      drawerVisible: false,
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
  created () {
    this.currentPath = this.$route.path
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.bustopList = await this.getBusRouteData()
      this.sleep(500)
      this.loading = false
    },
    async update () {
      this.bustopList = []
      this.bustopList = await this.getBusRouteData()
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    test () {
      this.bustopList.push({
        routes: '9',
        routesType: '9',
        description: '9'
      })
    },
    async getBusRouteData () {
      const res = await this.$indexApi.getBusRouteData()
      if (res.body !== null) {
        const items = res.body
        console.log('items' + JSON.stringify(items.Items))
        return items.Items
      }
    },
    async updateBusRouteData (data) {
      const res = await this.$indexApi.updateBusRoute(data)
      console.log(res)
      this.onDrawerClose()
    },
    async deleteBusRouteData (routes) {
      const data = {
        key: {
          routes
        }
      }
      const res = await this.$indexApi.deleteBusRoute(data)
      console.log(res)
      this.update()
    },
    //
    showViewBusRouteModal (item) {},
    handleClose (done) {
      this.$eleconfirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    showUpdateBusRouteDrawer (item) {
      this.formTitle = 'Update a new bus route'
      this.formItemDisabled = true
      this.formActivity = 'update'
      this.drawerVisible = true
      this.$nextTick(() => {
        this.busRouteForm.setFieldsValue({
          routes: item.routes,
          routesType: item.routesType,
          description: item.description
        })
      })
    },
    showDeleteBusRoute (item) {
      console.log(item.routes)
      this.showDeleteConfirm(item)
    },
    showDeleteConfirm (item) {
      this.$confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.deleteBusRouteData(item.routes)
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    showAddBusRouteDrawer () {
      this.formTitle = 'Add a new bus route'
      this.formItemDisabled = false
      this.formActivity = 'add'
      this.drawerVisible = true
      this.$nextTick(() => {
        this.busRouteForm.setFieldsValue({
          routes: '',
          routesType: '',
          description: ''
        })
      })
    },
    remove (k) {
      const { busStopForm } = this
      // can use data-binding to get
      const keys = busStopForm.getFieldValue('keys')
      // We need at least one bus stop
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
    onDrawerClose () {
      this.update()
      this.drawerVisible = false
      // this.$router.push(this.$router.path)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.busRouteForm.validateFields((err, values) => {
        if (!err) {
          // const { keys, names } = values
          console.log('Received values of form: ', values)
          const data = {
            operation: this.formActivity,
            item: values
          }
          this.updateBusRouteData(data)
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
