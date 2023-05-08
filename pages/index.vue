<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo">
        <img
          slot="cover"
          alt="example"
          src="@/static/images/iRapid.png"
          style="width: 120px; height: 60px"
        >
        <span style="color: white">IRapid Admin Management System</span>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="layout-content">
        <div class="layout-content-header" />
        <div class="layout-conten-main">
          <client-only>
            <nuxt-child />
          </client-only>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      @IRapid 2023
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: 'DashboardPage',
  data () {
    return {
      selectionDefaultValue: 'all',
      inputVal: '',
      songListData: [],
      dataList: []
    }
  },
  computed: {
    searchList: function () {
      if (!this.inputVal) {
        return this.dataList
      }
      return this.dataList.filter((v) => {
        return v.songName.includes(this.inputVal)
      })
    }
  },
  created () {},
  mounted () {
    console.log('nmsl' + process.env.API_URL)
  },
  beforeMount () {},
  methods: {}
}
</script>

<style lang="less" scoped>
html,
body,
#root {
  width: 100%;
  height: 100%;
}

.ant-layout {
  display: flex;
  min-height: 100%;
}

.ant-layout-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(135, 225, 195);
  box-shadow: 0 0 10px gainsboro;
  padding: 0 10%;
}

.logo {
  max-height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > img {
    margin: 10px;
  }
  > span {
    font-weight: normal;
    font-family: 'Proxima Soft';
    font-size: 21px;
  }
}

.layout-content {
  height: calc(100vh - 80px - 69px);
  padding: 0 0% !important;
  // background: #fff;
  overflow: auto;
}
</style>
