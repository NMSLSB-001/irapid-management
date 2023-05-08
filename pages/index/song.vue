<template>
  <a-layout>
    <a-layout-content>
      <div>
        <a-table
          :columns="columns"
          :data-source="datalist"
          :pagination="pagination"
          :custom-row="rowClick"
          :row-key="
            (record, index) => {
              return index
            }
          "
        >
          <a-slot />
        </a-table>
      </div>
    </a-layout-content>
    <a-layout-footer />
  </a-layout>
</template>

<script>
export default {
  props: {
    datalist: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      pagination: {
        onChange: page => this.onPageChange(page),
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        // showTotal: total => `共 ${total} 首歌曲`,
        onShowSizeChange: (current, pageSize) =>
          this.onSizeChange(current, pageSize),
        style: {
          textAlign: 'center !important',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center !important'
        }
      },
      columns: [
        {
          title: '歌名',
          dataIndex: 'songName',
          key: 'songName',
          scopedSlots: { customRender: 'songName' },
          width: '60%'
        },
        {
          title: '原唱',
          dataIndex: 'artist',
          key: 'artist',
          width: '30%'
        },
        {
          title: '语言',
          dataIndex: 'language',
          key: 'language',
          width: '10%'
        }
      ]
    }
  },
  mounted () {
    const currentPageSize = localStorage.getItem('pageSize')
    if (currentPageSize !== null) {
      this.pagination.pageSize = parseInt(currentPageSize)
    }
  },
  methods: {
    onPageChange (current) {},
    onSizeChange (current, pageSize) {
      localStorage.setItem('pageSize', pageSize.toString())
    },
    rowClick (record, index) {
      return {
        on: {
          click: () => {
            this.$copyText('点歌 ' + record.songName).then(() => {
              this.openNotification(record.songName)
            })
          }
        }
      }
    },
    openNotification (songName) {
      const placement = 'bottomLeft'
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
.ant-layout {
  min-width: 320px;
}

.ant-layout-content {
  height: 75%;
  background-color: #fff;
  padding: 0 0 !important;
}

.a-table {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ant-layout-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 9px !important;
}
</style>
