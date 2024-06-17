import Vue from 'vue'

Vue.filter('currency', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
})
