<template>
  <a-layout>
    <a-layout-content>
      <div>
        <a-button type="primary" @click="openNotification('bottomRight')" />
        <span>nms;l</span>
      </div>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: []
    }
  },
  mounted () {},
  methods: {
    openNotification (songName) {
      const placement = 'bottomRight'
      this.$notification.success({
        message: ` ${songName}`,
        description: '已复制',
        placement,
        duration: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-layout-content {
  background-color: #fff;
  padding: 0 0 !important;
}

.ant-layout-footer {
  background-color: #fff;
  padding: 0 0 !important;
}
</style>
