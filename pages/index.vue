<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo">
        <img
          slot="cover"
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style="width: 60px; height: 60px"
        >
        <span>歌单</span>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="content-header">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>
            <nuxt-link to="/song">
              歌单
            </nuxt-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="cotent-search">
          <div>
            <a-select
              :default-value="selectionDefaultValue"
              style="width: 120px"
              @change="handleChange"
            >
              <a-select-option value="all">
                全部语言
              </a-select-option>
              <a-select-option value="zh">
                中文
              </a-select-option>
              <a-select-option value="en">
                英语
              </a-select-option>
              <a-select-option value="ko" disabled>
                韩语
              </a-select-option>
              <a-select-option value="ja">
                日语
              </a-select-option>
            </a-select>
          </div>
          <a-input-search
            v-model="inputVal"
            placeholder="请输入歌名"
            style="width: 200px"
            @search="onSearch"
          />
        </div>
      </div>
      <div class="layout-content">
        <a-config-provider :locale="locale">
          <nuxt-child keep-alive :datalist="searchList" to="/song" />
        </a-config-provider>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      ©2023 Created by VTB-LIVE
    </a-layout-footer>
  </a-layout>
</template>

<script>
import csvToJson from 'csvtojson'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

const testDataList = []
for (let i = 0; i < 100; i++) {
  testDataList.push({
    key: i.toString(),
    songName: `歌名 ${i}`,
    language: '中文',
    artist: `歌手 ${i}`
  })
}

export default {
  name: 'IndexPage',
  data () {
    return {
      locale: zhCN,
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
    if (this.checkIfSupportLocalstorage()) {
      this.handleData()
    }
  },
  beforeMount () {},
  methods: {
    checkIfSupportLocalstorage () {
      try {
        localStorage.setItem('test', 'test')
        const test = localStorage.getItem('test')
        if (test === 'test') {
          return true
        }
      } catch (error) {
        alert('您的浏览器可能不受支持，请更换浏览器后再试', error)
      }
    },
    handleData () {
      if (
        localStorage.getItem('songList') === null ||
        localStorage.getItem('lastUpdate') === null
      ) {
        this.getData()
      } else if (this.checkIfExpired()) {
        this.getData()
      } else {
        this.dataList = JSON.parse(localStorage.getItem('songList'))
      }
    },
    checkIfExpired () {
      const lastUpate = localStorage.getItem('lastUpdate')
      const currentTime = Date.parse(new Date()) / 1000
      if (currentTime - lastUpate > -1) {
        return true
      }
      return false
    },
    async getData () {
      const res = await this.$indexApi.getSongListData()
      const json = await csvToJson().fromString(res)
      this.songListData = json
      const currentTime = Date.parse(new Date()) / 1000
      localStorage.setItem('lastUpdate', currentTime)
      localStorage.setItem('songList', JSON.stringify(json))
      this.dataList = JSON.parse(localStorage.getItem('songList'))
    },
    handleChange (value) {
      console.log(value)
    },
    onSearch (value) {
      console.log('Value:', value)
    }
  }
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
  min-width: 375px;
  min-height: 100%;
}

.ant-layout-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(250, 220, 246);
  box-shadow: 0 0 10px gainsboro;
  padding: 0 10%;
}

.logo {
  height: 100px;
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

.ant-layout-content {
  height: calc(100vh - 100px - 69px);
  padding: 0 10% !important;
  background: #fff;
  overflow: auto;
}

.layout-content {
  // padding: 24px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cotent-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
