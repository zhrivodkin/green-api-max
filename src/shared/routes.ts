const routes = {
  root: '/',
  auth: 'auth',
  messaging: '/messaging',
  chatRoute: '/messaging/:id',
  chat: (id: string) => `/messaging/${id}`,
};

export default routes;
