<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo">
        <img
          slot="cover"
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style="width: 45px; height: 45px"
        >
        <span>歌单</span>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="content-header">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
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
            placeholder="input search text"
            style="width: 200px"
            @search="onSearch"
          />
        </div>
      </div>
      <div class="layout-content">
        <nuxt to="/song" />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      ©2023 Created by VTB-LIVE
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      selectionDefaultValue: 'all'
    }
  },
  methods: {
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
html, body {
  min-height: 100%;
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

.layout-content {
  background: #fff;
  padding: 24px;
  min-height: 100%;
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

<style lang="less" scoped>
.ant-layout-header {
  padding: 0 10%;
}
.ant-layout-content {
  padding: 0 10% !important;
}
</style>

<style>
.layout {
  min-height: 100% !important;
}
</style>
