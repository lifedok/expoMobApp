
const EPathRoute = {
  AUTH: '/screens/(auth)',
  DRAWER: '/screens/(drawer)',
  TABS: '/screens/(drawer)/(tabs)',
};

export const EPathRouteScreen = {
  START: '/screens/start',
  LOGIN: `${EPathRoute.AUTH}/login`,
  REGISTER: `${EPathRoute.AUTH}/register`,
  FORGOT: `${EPathRoute.AUTH}/forgot`,

  HOME: `${EPathRoute.TABS}/home`,
  LIST: `${EPathRoute.TABS}/list`,
  DETAILS: `${EPathRoute.TABS}/home/details`,
};

export enum ApiRoute {
  LOGIN = '/login',
  LOGOUT = '/logout',
  HOTELS = '/hotels',
  FAVORITES = '/favorite',
  COMMENTS = '/comments',
}

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
