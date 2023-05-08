<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="['1']"
        :selected-keys="selectedPath"
        @click="handelMenuClick"
      >
        <a-menu-item key="/busroute">
          <a-icon type="car" />
          <span>Bus Routes</span>
        </a-menu-item>
        <a-menu-item key="/beacon">
          <a-icon type="video-camera" />
          <span>Beacon List</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <nuxt-link :to="targetPath" />
        <nuxt-child />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      collapsed: false,
      currentPath: '/dashboard/admin',
      targetPath: '',
      selectedPath: []
    }
  },
  created () {
    this.selectedPath.push(this.$route.path.substr(this.currentPath.length))
  },
  mounted () {
    // this.currentPath = this.$route.path
  },
  methods: {
    handelMenuClick (item) {
      console.log(item)
      console.log(this.$route.path)
      const path = this.currentPath + item.key
      if (path !== this.$route.path) {
        this.selectedPath = []
        this.selectedPath.push(item.key)
        this.targetPath = path
        this.$router.push(this.targetPath)
      }
      // const routePath = this.$route.path + item.key
      // if (routePath !== this.$route.path) {
      //   console.log(this.$route.path)
      //   this.$router.push(routePath)
      // }
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
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-layout-sider {
  height: calc(100vh - 150px);
  // background-color: #fff;
  overflow: auto;
}
</style>
