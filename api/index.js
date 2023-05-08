export default ($axios) => {
  return {
    getBusRouteList: () =>
      $axios.get('/admin/getbusroutelist', {
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    getBusRouteData: () =>
      $axios.get('/admin/getbusroutedata', {
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    updateBusRoute: data => $axios.post('/admin/updatebusroute', data),
    deleteBusRoute: data => $axios.post('/admin/deletebusroute', data),
    getBeaconData: () =>
      $axios.get('/admin/getbeacondata', {
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    updateBeacon: data => $axios.post('/admin/updatebeacon', data),
    deleteBeacon: data => $axios.post('/admin/deletebeacon', data),
    // 有参数的情况
    postData: data => $axios.post('/api/get_index_data', data),
    getData: params => $axios.get('/api/get_index_data', { params })
    // ...your other api function
  }
}
