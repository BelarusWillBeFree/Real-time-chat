const apiPath = '/api/v1';

const path = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  pages: {
    login: '/login',
    home: '/',

  },
};

export default path;
