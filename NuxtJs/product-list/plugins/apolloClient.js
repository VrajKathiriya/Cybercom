export default ({ app }, inject) => {
  const apolloClient = app.apolloProvider.defaultClient
  inject('apolloClient', apolloClient)
}
