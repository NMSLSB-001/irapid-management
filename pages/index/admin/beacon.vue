<template>
  <div>
    <div>
      <a-row :gutter="16" type="flex" justify="start">
        <a-col
          v-for="(item, index) in busRouteList"
          :key="index"
          v-model="busRouteList"
          :span="8"
        >
          <a-card :title="'Bus Route: Line ' + item">
            <p
              style="
                fontsize: 14px;
                color: rgba(0, 0, 0, 0.85);
                marginbottom: 16px;
                fontweight: 500;
              "
            />
            <a-row
              v-for="(subItem, subIndex) in beaconData[item]"
              :key="subIndex"
              v-model="beaconData"
              :gutter="16"
            >
              <a-card :title="'Beacon Address: ' + subItem['bleAddress']">
                <a slot="extra"><a-icon
                  type="delete"
                  @click="deleteBeaconCard(subItem['bleAddress'])"
                /></a>
                <p>{{ 'Bus Carplate: ' + subItem['busCarplate'] }}</p>
                <p>{{ 'Bus Status: ' + subItem['busStatus'] }}</p>
              </a-card>
              <br>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-button type="primary" @click="showAddBeaconDialog">
        <a-icon type="plus" /> New Beacon
      </a-button>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="beaconForm">
          <el-form-item label="Beacon UUID" :label-width="formLabelWidth">
            <el-input v-model="beaconForm.bleAddress" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Bus Carplate" :label-width="formLabelWidth">
            <el-input v-model="beaconForm.busCarplate" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Bus Status" :label-width="formLabelWidth">
            <el-select
              v-model="beaconForm.busStatus"
              placeholder="Please select current status"
            >
              <el-option label="Normal" value="normal" />
              <el-option label="Out of Service" value="outOfService" />
            </el-select>
          </el-form-item>
          <el-form-item label="Bus Route" :label-width="formLabelWidth">
            <el-select
              v-model="beaconForm.routes"
              placeholder="Please select current status"
            >
              <el-option
                v-for="item in busRouteList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="submitDialogForm()">
            Confirm
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconPage',
  data () {
    return {
      busRouteList: [],
      beaconData: [],
      dialogFormVisible: false,
      dialogTitle: 'Add a new beacon',
      dialogActivity: 'add',
      beaconForm: {
        bleAddress: '',
        busCarplate: '',
        busStatus: '',
        routes: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.currentPath = this.$route.path
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.busRouteList = await this.getBusRouteList()
      this.beaconData = await this.getBeaconData()
      this.sleep(500)
      this.loading = false
    },
    async update () {
      this.busRouteList = []
      this.beaconData = []
      this.busRouteList = await this.getBusRouteList()
      this.beaconData = await this.getBeaconData()
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async getBusRouteList () {
      const res = await this.$indexApi.getBusRouteList()
      if (res.body !== null) {
        const items = res.body
        console.log('items' + JSON.stringify(items))
        return items
      }
    },
    async getBeaconData () {
      const res = await this.$indexApi.getBeaconData()
      if (res.body !== null) {
        const items = res.body
        console.log('items' + JSON.stringify(items))
        return items
      }
    },
    async updateBeacon (data) {
      const res = await this.$indexApi.updateBeacon(data)
      console.log(res)
      this.update()
    },
    async deleteBeacon (bleAddress) {
      const data = {
        key: {
          bleAddress
        }
      }
      const res = await this.$indexApi.deleteBeacon(data)
      console.log(res)
      this.update()
    },
    deleteBeaconCard (item) {
      console.log(item)
      this.deleteBeacon(item)
    },
    showAddBeaconDialog () {
      this.dialogTitle = 'Add a new beacon'
      this.dialogActivity = 'add'
      this.dialogFormVisible = true
    },
    submitDialogForm () {
      console.log(this.beaconForm)
      const data = {
        operation: this.dialogActivity,
        item: this.beaconForm
      }
      this.updateBeacon(data)
      this.beaconForm = {
        bleAddress: '',
        busCarplate: '',
        busStatus: '',
        routes: ''
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="less" scoped></style>
