export default ({ $axios, store, redirect }) => {
  if (!store.state.user.userTatus) {
    redirect('/song')
  }
}
