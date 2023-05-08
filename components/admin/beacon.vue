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
            >
              Group title
            </p>
            <a-row
              v-for="(subItem, subIndex) in beaconData[item]"
              :key="subIndex"
              v-model="beaconData"
              :gutter="16"
            >
              <a-card :title="'Beacon Address: ' + subItem['bleAddress']">
                <a slot="extra" href="#">More</a>
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
      dialogVisible: false
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
    showAddBeaconDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped></style>
