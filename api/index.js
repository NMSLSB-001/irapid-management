export default ($axios) => {
  return {
    getBustopList: () =>
      $axios.get('/admin/getbustoplist', {
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    // 有参数的情况
    postData: data => $axios.post('/api/get_index_data', data),
    getData: params => $axios.get('/api/get_index_data', { params })
    // ...your other api function
  }
}
