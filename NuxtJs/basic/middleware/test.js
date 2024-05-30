export default function (context) {
  // console.log(context)
  // console.log('i am middleware')

  return context.$axios
    .$post(`https://reqres.in/api/login`, {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    })
    .then((res) => {
      if (res.token != 'a') {
        context.redirect('/')
      }
    })
}
