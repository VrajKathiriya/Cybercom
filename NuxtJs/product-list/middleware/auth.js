export default function ({ store, redirect }) {
  // console.log('auth middleware called')
  if (!store.state.auth.loggedIn) {
    return redirect('/login')
  }
}
