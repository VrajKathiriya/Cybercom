export const environment = {
  baseUrl: 'http://localhost:1337/',

  login: 'api/auth/local',
  register: 'api/auth/local/register',

  // product:
  //   'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&filters[product_name][$containsi][0]=man&filters[category][id][$eqi][1]=1',

  product:
    'api/products?pagination[page]=1&pagination[pageSize]=100&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url',

  category: 'api/categories',

  user_cart: 'api/carts',

  order: 'api/orders',

  address: 'api/user-addresses',

  user_details:
    'api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
};
