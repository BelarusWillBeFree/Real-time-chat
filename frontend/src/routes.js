const apiPath = '/api/v1';

const path = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  pages: {
    login: '/login',
    signup: '/signup',
    home: '/',
    notFound: '*',
  },
};

export default path;
