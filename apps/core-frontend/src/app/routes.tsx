const AUTH_PATHS = {
  BASE: '/auth',
  LOGIN: 'login',
  SIGNUP: 'signup',
  VERIFY_EMAIL: 'verify-email',
  FORGOT_PASSWORD: 'forgot-password',
};

/**
 * Add all the nested routes here
 */
export const _ROUTER_NESTED_PATHS = {
  AUTH: {
    BASE: AUTH_PATHS.BASE,
    LOGIN: AUTH_PATHS.LOGIN,
    SIGNUP: AUTH_PATHS.SIGNUP,
    VERIFY_EMAIL: AUTH_PATHS.VERIFY_EMAIL,
    FORGOT_PASSWORD: AUTH_PATHS.FORGOT_PASSWORD,
  },
};

const createFullRoutes = () => {
  return {
    HOME: '/',
    BASE_AUTH: AUTH_PATHS.BASE,
    LOGIN: `${AUTH_PATHS.BASE}/${AUTH_PATHS.LOGIN}`,
    SIGNUP: `${AUTH_PATHS.BASE}/${AUTH_PATHS.SIGNUP}`,
    DASHBOARD: '/dashboard',
    VERIFY_EMAIL: `${AUTH_PATHS.BASE}/${AUTH_PATHS.VERIFY_EMAIL}`,
    FORGOT_PASSWORD: `${AUTH_PATHS.BASE}/${AUTH_PATHS.FORGOT_PASSWORD}`,
    RESET_PASSWORD: '/reset-password',
  };
};

/**
 * use this to perform navigations
 */
export const _FULL_ROUTES = createFullRoutes();
