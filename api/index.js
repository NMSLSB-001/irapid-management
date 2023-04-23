export default ($axios) => {
  return {
    getSongListData: () =>
      $axios.get('/SongList-GBK.csv', {
        headers: {
          'Content-Type': 'text/csv'
        }
      }),
    // 有参数的情况
    postData: data => $axios.post('/api/get_index_data', data),
    getData: params => $axios.get('/api/get_index_data', { params })
    // ...your other api function
  }
}
